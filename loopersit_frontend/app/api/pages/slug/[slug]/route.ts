import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/pages/slug/[slug] - Get page by slug (for public display)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const page = await prisma.page.findUnique({
            where: { slug },
        });

        if (!page) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        console.error('Error fetching page by slug:', error);
        return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
    }
}
