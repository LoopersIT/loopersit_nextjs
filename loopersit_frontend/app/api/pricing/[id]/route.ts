import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/pricing/[id] - Get single pricing plan
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const pricing = await prisma.pricing.findUnique({
            where: { id: parseInt(id) },
            include: {
                features: {
                    orderBy: { order: 'asc' },
                },
            },
        });

        if (!pricing) {
            return NextResponse.json({ error: 'Pricing not found' }, { status: 404 });
        }

        return NextResponse.json(pricing);
    } catch (error) {
        console.error('Error fetching pricing:', error);
        return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 });
    }
}

// PUT /api/pricing/[id] - Update pricing plan
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
        const { name, priceRange, order } = body;

        const pricing = await prisma.pricing.update({
            where: { id: parseInt(id) },
            data: {
                name,
                priceRange,
                order,
            },
        });

        return NextResponse.json(pricing);
    } catch (error) {
        console.error('Error updating pricing:', error);
        return NextResponse.json({ error: 'Failed to update pricing' }, { status: 500 });
    }
}

// DELETE /api/pricing/[id] - Delete pricing plan
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
        await prisma.pricing.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: 'Pricing deleted successfully' });
    } catch (error) {
        console.error('Error deleting pricing:', error);
        return NextResponse.json({ error: 'Failed to delete pricing' }, { status: 500 });
    }
}
