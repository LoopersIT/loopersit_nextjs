import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/reviews/[id] - Get single review
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const review = await prisma.review.findUnique({
            where: { id: parseInt(id) },
        });

        if (!review) {
            return NextResponse.json({ error: 'Review not found' }, { status: 404 });
        }

        return NextResponse.json(review);
    } catch (error) {
        console.error('Error fetching review:', error);
        return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 });
    }
}

// PUT /api/reviews/[id] - Update review
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
        const { name, designation, image, review, order } = body;

        const updatedReview = await prisma.review.update({
            where: { id: parseInt(id) },
            data: {
                name,
                designation,
                image,
                review,
                order,
            },
        });

        return NextResponse.json(updatedReview);
    } catch (error) {
        console.error('Error updating review:', error);
        return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
    }
}

// DELETE /api/reviews/[id] - Delete review
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
        await prisma.review.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
}
