import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/portfolio - Get all portfolios
export async function GET(request: NextRequest) {
    try {
        const portfolios = await prisma.portfolio.findMany({
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(portfolios);
    } catch (error) {
        console.error('Error fetching portfolios:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
    }
}

// POST /api/portfolio - Create a new portfolio
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, image, duration, detail, link, order } = body;

        if (!title || !duration || !detail) {
            return NextResponse.json({ error: 'Title, duration, and detail are required' }, { status: 400 });
        }

        const portfolio = await prisma.portfolio.create({
            data: {
                title,
                image: image || null,
                duration,
                detail,
                link: link || null,
                order: order || 1,
            },
        });

        return NextResponse.json(portfolio, { status: 201 });
    } catch (error) {
        console.error('Error creating portfolio:', error);
        return NextResponse.json({ error: 'Failed to create portfolio' }, { status: 500 });
    }
}
