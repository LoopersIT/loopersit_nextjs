import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';
import slugify from 'slugify';

// GET /api/pages - Get all pages
export async function GET(request: NextRequest) {
    try {
        const pages = await prisma.page.findMany({
            orderBy: { title: 'asc' },
        });

        return NextResponse.json(pages);
    } catch (error) {
        console.error('Error fetching pages:', error);
        return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
    }
}

// POST /api/pages - Create a new page
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, content, linkOnFooter } = body;

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
        }

        const slug = slugify(title, { lower: true, strict: true });

        const page = await prisma.page.create({
            data: {
                title,
                slug,
                content,
                linkOnFooter: linkOnFooter || false,
            },
        });

        return NextResponse.json(page, { status: 201 });
    } catch (error) {
        console.error('Error creating page:', error);
        return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
    }
}
