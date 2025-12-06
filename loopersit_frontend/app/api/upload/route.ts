import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getServerSession } from '@/lib/session';

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Create upload directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, '-');
        const filename = `${timestamp}-${originalName}`;
        const filepath = path.join(uploadDir, filename);

        // Write file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Return the URL
        const fileUrl = `/uploads/${filename}`;
        return NextResponse.json({ url: fileUrl }, { status: 200 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
