import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/faqs/[id] - Get single FAQ
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const faq = await prisma.fAQ.findUnique({
            where: { id: parseInt(id) },
        });

        if (!faq) {
            return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
        }

        return NextResponse.json(faq);
    } catch (error) {
        console.error('Error fetching FAQ:', error);
        return NextResponse.json({ error: 'Failed to fetch FAQ' }, { status: 500 });
    }
}

// PUT /api/faqs/[id] - Update FAQ
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { question, answer, order } = body;

        const faq = await prisma.fAQ.update({
            where: { id: parseInt(id) },
            data: {
                question,
                answer,
                order,
            },
        });

        return NextResponse.json(faq);
    } catch (error) {
        console.error('Error updating FAQ:', error);
        return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
    }
}

// DELETE /api/faqs/[id] - Delete FAQ
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await prisma.fAQ.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
    }
}
