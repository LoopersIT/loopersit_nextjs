import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/members - Get all members
export async function GET(request: NextRequest) {
    try {
        const members = await prisma.member.findMany({
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
    }
}

// POST /api/members - Create a new member
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { role, name, image, designation, linkedin, github, facebook, order } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const member = await prisma.member.create({
            data: {
                role: role || 'member',
                name,
                image: image || null,
                designation: designation || null,
                linkedin: linkedin || null,
                github: github || null,
                facebook: facebook || null,
                order: order || 1,
            },
        });

        return NextResponse.json(member, { status: 201 });
    } catch (error) {
        console.error('Error creating member:', error);
        return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
    }
}
