import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from '@/lib/session';

// GET /api/members/[id] - Get single member
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const member = await prisma.member.findUnique({
            where: { id: parseInt(id) },
        });

        if (!member) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }

        return NextResponse.json(member);
    } catch (error) {
        console.error('Error fetching member:', error);
        return NextResponse.json({ error: 'Failed to fetch member' }, { status: 500 });
    }
}

// PUT /api/members/[id] - Update member
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
        const { role, name, image, designation, linkedin, github, facebook, order } = body;

        const member = await prisma.member.update({
            where: { id: parseInt(id) },
            data: {
                role,
                name,
                image,
                designation,
                linkedin,
                github,
                facebook,
                order,
            },
        });

        return NextResponse.json(member);
    } catch (error) {
        console.error('Error updating member:', error);
        return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
    }
}

// DELETE /api/members/[id] - Delete member
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
        await prisma.member.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: 'Member deleted successfully' });
    } catch (error) {
        console.error('Error deleting member:', error);
        return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
    }
}
