import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';
import slugify from 'slugify';

// GET /api/services/[id]/subservices - Get subservices for a service
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const subservices = await prisma.subService.findMany({
            where: { serviceId: parseInt(id) },
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(subservices);
    } catch (error) {
        console.error('Error fetching subservices:', error);
        return NextResponse.json({ error: 'Failed to fetch subservices' }, { status: 500 });
    }
}

// POST /api/services/[id]/subservices - Create subservice for a service
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
        const { name, description, image, order } = body;

        if (!name || !description) {
            return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
        }

        const slug = slugify(name, { lower: true, strict: true });

        const subservice = await prisma.subService.create({
            data: {
                serviceId: parseInt(id),
                name,
                slug,
                description,
                image: image || null,
                order: order || 1,
            },
        });

        return NextResponse.json(subservice, { status: 201 });
    } catch (error) {
        console.error('Error creating subservice:', error);
        return NextResponse.json({ error: 'Failed to create subservice' }, { status: 500 });
    }
}
