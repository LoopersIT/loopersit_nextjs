import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';
import slugify from 'slugify';

// GET /api/pages/[id] - Get single page
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const page = await prisma.page.findUnique({
            where: { id: parseInt(id) },
        });

        if (!page) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        console.error('Error fetching page:', error);
        return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
    }
}

// PUT /api/pages/[id] - Update page
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
        const { title, content, linkOnFooter } = body;

        const updateData: any = {
            content,
            linkOnFooter,
        };

        if (title) {
            updateData.title = title;
            updateData.slug = slugify(title, { lower: true, strict: true });
        }

        const page = await prisma.page.update({
            where: { id: parseInt(id) },
            data: updateData,
        });

        return NextResponse.json(page);
    } catch (error) {
        console.error('Error updating page:', error);
        return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
    }
}

// DELETE /api/pages/[id] - Delete page
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
        await prisma.page.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: 'Page deleted successfully' });
    } catch (error) {
        console.error('Error deleting page:', error);
        return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
    }
}
