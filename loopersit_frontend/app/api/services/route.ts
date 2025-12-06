import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';
import slugify from 'slugify';

// GET /api/services - Get all services
export async function GET(request: NextRequest) {
    try {
        const services = await prisma.service.findMany({
            include: {
                offers: {
                    orderBy: { order: 'asc' },
                },
                subservices: {
                    orderBy: { order: 'asc' },
                },
            },
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, description, image, homeIcon, order } = body;

        if (!name || !description) {
            return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
        }

        const slug = slugify(name, { lower: true, strict: true });

        const service = await prisma.service.create({
            data: {
                name,
                slug,
                description,
                image: image || null,
                homeIcon: homeIcon || null,
                order: order || 1,
            },
        });

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
