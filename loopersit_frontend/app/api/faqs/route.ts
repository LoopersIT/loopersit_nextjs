import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/faqs - Get all FAQs
export async function GET(request: NextRequest) {
    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(faqs);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}

// POST /api/faqs - Create a new FAQ
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { question, answer, order } = body;

        if (!question || !answer) {
            return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
        }

        const faq = await prisma.fAQ.create({
            data: {
                question,
                answer,
                order: order || 1,
            },
        });

        return NextResponse.json(faq, { status: 201 });
    } catch (error) {
        console.error('Error creating FAQ:', error);
        return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
    }
}
