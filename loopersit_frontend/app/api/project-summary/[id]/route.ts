import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/project-summary/[id] - Get single project summary
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const summary = await prisma.projectSummary.findUnique({
            where: { id: parseInt(id) },
        });

        if (!summary) {
            return NextResponse.json({ error: 'Project summary not found' }, { status: 404 });
        }

        return NextResponse.json(summary);
    } catch (error) {
        console.error('Error fetching project summary:', error);
        return NextResponse.json({ error: 'Failed to fetch project summary' }, { status: 500 });
    }
}

// PUT /api/project-summary/[id] - Update project summary
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
        const { figure, detail, order } = body;

        const summary = await prisma.projectSummary.update({
            where: { id: parseInt(id) },
            data: {
                figure,
                detail,
                order,
            },
        });

        return NextResponse.json(summary);
    } catch (error) {
        console.error('Error updating project summary:', error);
        return NextResponse.json({ error: 'Failed to update project summary' }, { status: 500 });
    }
}

// DELETE /api/project-summary/[id] - Delete project summary
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
        await prisma.projectSummary.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: 'Project summary deleted successfully' });
    } catch (error) {
        console.error('Error deleting project summary:', error);
        return NextResponse.json({ error: 'Failed to delete project summary' }, { status: 500 });
    }
}
