import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/pricing/[id]/features - Get features for a pricing plan
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const features = await prisma.priceFeature.findMany({
            where: { pricingId: parseInt(id) },
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(features);
    } catch (error) {
        console.error('Error fetching features:', error);
        return NextResponse.json({ error: 'Failed to fetch features' }, { status: 500 });
    }
}

export async function POST(
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
        const { feature, order } = body;

        if (!feature) {
            return NextResponse.json({ error: 'Feature text is required' }, { status: 400 });
        }

        const priceFeature = await prisma.priceFeature.create({
            data: {
                pricingId: parseInt(id),
                feature,
                order: order || 1,
            },
        });

        return NextResponse.json(priceFeature, { status: 201 });
    } catch (error) {
        console.error('Error creating feature:', error);
        return NextResponse.json({ error: 'Failed to create feature' }, { status: 500 });
    }
}
