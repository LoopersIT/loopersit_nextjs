import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/pricing - Get all pricing plans
export async function GET(request: NextRequest) {
    try {
        const pricing = await prisma.pricing.findMany({
            include: {
                features: {
                    orderBy: { order: 'asc' },
                },
            },
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(pricing);
    } catch (error) {
        console.error('Error fetching pricing:', error);
        return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 });
    }
}

// POST /api/pricing - Create a new pricing plan
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, priceRange, order } = body;

        if (!name || !priceRange) {
            return NextResponse.json({ error: 'Name and price range are required' }, { status: 400 });
        }

        const pricing = await prisma.pricing.create({
            data: {
                name,
                priceRange,
                order: order || 1,
            },
        });

        return NextResponse.json(pricing, { status: 201 });
    } catch (error) {
        console.error('Error creating pricing:', error);
        return NextResponse.json({ error: 'Failed to create pricing' }, { status: 500 });
    }
}
