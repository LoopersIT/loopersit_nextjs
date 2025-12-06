import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/project-summary - Get all project summaries
export async function GET(request: NextRequest) {
    try {
        const summaries = await prisma.projectSummary.findMany({
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(summaries);
    } catch (error) {
        console.error('Error fetching project summaries:', error);
        return NextResponse.json({ error: 'Failed to fetch project summaries' }, { status: 500 });
    }
}

// POST /api/project-summary - Create a new project summary
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { figure, detail, order } = body;

        if (!figure || !detail) {
            return NextResponse.json({ error: 'Figure and detail are required' }, { status: 400 });
        }

        const summary = await prisma.projectSummary.create({
            data: {
                figure,
                detail,
                order: order || 1,
            },
        });

        return NextResponse.json(summary, { status: 201 });
    } catch (error) {
        console.error('Error creating project summary:', error);
        return NextResponse.json({ error: 'Failed to create project summary' }, { status: 500 });
    }
}
