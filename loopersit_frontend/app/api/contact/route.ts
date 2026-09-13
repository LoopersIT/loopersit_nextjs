import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------------------------------------------------------------------
// Layer 2: In-memory rate limiter — max 3 submissions per IP per hour.
// Simple Map is fine for a low-traffic portfolio on Vercel serverless.
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        // First request or window expired — reset
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (entry.count >= RATE_LIMIT_MAX) {
        return true;
    }

    entry.count += 1;
    return false;
}

// ---------------------------------------------------------------------------
// Layer 1: Cloudflare Turnstile token verification
// ---------------------------------------------------------------------------
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
        console.error('TURNSTILE_SECRET_KEY is not set');
        return false;
    }

    const formData = new URLSearchParams();
    formData.append('secret', secret);
    formData.append('response', token);
    formData.append('remoteip', ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();
    return data.success === true;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message, website, cfTurnstileToken } = body;

        // -----------------------------------------------------------------------
        // Layer 3: Honeypot — bots fill hidden fields, humans don't
        // Return 200 to confuse bots (don't reveal we rejected them)
        // -----------------------------------------------------------------------
        if (website) {
            console.warn('Honeypot triggered — bot submission rejected');
            return NextResponse.json({ success: true });
        }

        // -----------------------------------------------------------------------
        // Layer 2: Rate limiting
        // -----------------------------------------------------------------------
        const ip =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // -----------------------------------------------------------------------
        // Layer 1: Cloudflare Turnstile verification
        // -----------------------------------------------------------------------
        if (!cfTurnstileToken) {
            return NextResponse.json({ error: 'CAPTCHA token missing.' }, { status: 403 });
        }

        const turnstileValid = await verifyTurnstile(cfTurnstileToken, ip);
        if (!turnstileValid) {
            return NextResponse.json({ error: 'CAPTCHA verification failed.' }, { status: 403 });
        }

        // -----------------------------------------------------------------------
        // Basic field validation
        // -----------------------------------------------------------------------
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // -----------------------------------------------------------------------
        // 1. Send notification to Admin (LoopersIT)
        // -----------------------------------------------------------------------
        const { data: adminData, error: adminError } = await resend.emails.send({
            from: 'LoopersIT Website <support@loopersit.com>',
            to: ['loopersit@gmail.com'],
            replyTo: email,
            subject: `[Contact Form] ${subject || 'New Message'}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2A1D51;">New Contact Form Submission</h2>
                    <p><strong>From:</strong> ${name} (${email})</p>
                    <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
                        <p style="margin-top: 0;"><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
            `
        });

        if (adminError) {
            console.error('Resend Admin Error:', adminError);
            return NextResponse.json({ error: adminError.message }, { status: 400 });
        }

        // -----------------------------------------------------------------------
        // 2. Send confirmation to User
        // -----------------------------------------------------------------------
        try {
            await resend.emails.send({
                from: 'LoopersIT <support@loopersit.com>',
                to: [email],
                subject: 'We received your message - LoopersIT',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #2A1D51;">Thanks for contacting us!</h2>
                        <p>Hi ${name},</p>
                        <p>We have received your message regarding "<strong>${subject || 'your inquiry'}</strong>" and will get back to you as soon as possible.</p>
                        <br>
                        <p>Best regards,</p>
                        <p><strong>The LoopersIT Team</strong></p>
                        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;">
                        <p style="font-size: 12px; color: #888;">This is an automated confirmation. Please do not reply to this email.</p>
                    </div>
                `
            });
        } catch (confirmError) {
            console.error('Confirmation email failed:', confirmError);
            // Continue even if confirmation fails — admin already got the message
        }

        return NextResponse.json({ success: true, id: adminData?.id });

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
