import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/reviews - Get all reviews
export async function GET(request: NextRequest) {
    try {
        const reviews = await prisma.review.findMany({
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, designation, image, review, order } = body;

        if (!name || !review) {
            return NextResponse.json({ error: 'Name and review are required' }, { status: 400 });
        }

        const newReview = await prisma.review.create({
            data: {
                name,
                designation: designation || null,
                image: image || null,
                review,
                order: order || 1,
            },
        });

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error('Error creating review:', error);
        return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
    }
}
