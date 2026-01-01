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

        // Generate base slug
        let slug = slugify(name, { lower: true, strict: true });

        // Check if slug already exists and make it unique if needed
        const existingService = await prisma.service.findUnique({
            where: { slug },
        });

        if (existingService) {
            // Add a timestamp to make the slug unique
            slug = `${slug}-${Date.now()}`;
        }

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
    } catch (error: any) {
        console.error('Error creating service:', error);

        // Check for Prisma unique constraint error
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'A service with this name already exists' }, { status: 409 });
        }

        // Check for database connection errors
        if (error.code === 'P1001' || error.code === 'P1002') {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
        }

        return NextResponse.json({ error: 'Failed to create service: ' + (error.message || 'Unknown error') }, { status: 500 });
    }
}
