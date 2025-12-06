import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/services/[id]/offers - Get offers for a service
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const offers = await prisma.serviceOffer.findMany({
            where: { serviceId: parseInt(id) },
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(offers);
    } catch (error) {
        console.error('Error fetching offers:', error);
        return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
    }
}

// POST /api/services/[id]/offers - Create offer for a service
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
        const { offer, order } = body;

        if (!offer) {
            return NextResponse.json({ error: 'Offer text is required' }, { status: 400 });
        }

        const serviceOffer = await prisma.serviceOffer.create({
            data: {
                serviceId: parseInt(id),
                offer,
                order: order || 1,
            },
        });

        return NextResponse.json(serviceOffer, { status: 201 });
    } catch (error) {
        console.error('Error creating offer:', error);
        return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 });
    }
}
