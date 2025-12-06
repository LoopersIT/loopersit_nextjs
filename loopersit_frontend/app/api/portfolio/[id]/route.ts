import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/portfolio/[id] - Get single portfolio
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const portfolio = await prisma.portfolio.findUnique({
            where: { id: parseInt(id) },
        });

        if (!portfolio) {
            return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
        }

        return NextResponse.json(portfolio);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
    }
}

// PUT /api/portfolio/[id] - Update portfolio
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
        const { title, image, duration, detail, link, order } = body;

        const portfolio = await prisma.portfolio.update({
            where: { id: parseInt(id) },
            data: {
                title,
                image,
                duration,
                detail,
                link,
                order,
            },
        });

        return NextResponse.json(portfolio);
    } catch (error) {
        console.error('Error updating portfolio:', error);
        return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
    }
}

// DELETE /api/portfolio/[id] - Delete portfolio
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
        await prisma.portfolio.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: 'Portfolio deleted successfully' });
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        return NextResponse.json({ error: 'Failed to delete portfolio' }, { status: 500 });
    }
}
