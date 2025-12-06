import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';
import slugify from 'slugify';

// GET /api/services/[id] - Get single service
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const service = await prisma.service.findUnique({
            where: { id: parseInt(id) },
            include: {
                offers: {
                    orderBy: { order: 'asc' },
                },
                subservices: {
                    orderBy: { order: 'asc' },
                },
            },
        });

        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
    }
}

// PUT /api/services/[id] - Update service
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
        const { name, description, image, homeIcon, order } = body;

        const updateData: any = {
            description,
            image,
            homeIcon,
            order,
        };

        if (name) {
            updateData.name = name;
            updateData.slug = slugify(name, { lower: true, strict: true });
        }

        const service = await prisma.service.update({
            where: { id: parseInt(id) },
            data: updateData,
        });

        return NextResponse.json(service);
    } catch (error) {
        console.error('Error updating service:', error);
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

// DELETE /api/services/[id] - Delete service
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
        await prisma.service.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
