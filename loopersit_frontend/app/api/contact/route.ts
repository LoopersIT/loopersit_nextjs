import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validations
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Send notification to Admin (LoopersIT)
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

        // 2. Send confirmation to User
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
            // Continue even if confirmation fails - admin already got the message
        }

        return NextResponse.json({ success: true, id: adminData?.id });

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
