import { writeFile, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { NextResponse } from 'next/server';
import { checkIsAdmin } from '@/lib/admin';
import { AllowedImageTypes, MaxFileSize } from '@/lib/schemas';
import { crypto } from 'better-auth/utils';

export async function POST(request: Request) {
    try {
        if (!(await checkIsAdmin())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // --- SECURITY: Type Check ---
        if (!AllowedImageTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, WebP and GIF allowed.' }, { status: 400 });
        }

        // --- SECURITY: Size Check ---
        if (file.size > MaxFileSize) {
            return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (err) {
            // Ignore if exists
        }

        // --- SECURITY: Filename Hardening ---
        // Use a random UUID instead of the original filename to prevent malicious injections or traversal
        const fileExtension = extname(file.name) || '.jpg';
        const safeFilename = `${crypto.randomUUID()}${fileExtension}`;
        const path = join(uploadDir, safeFilename);

        await writeFile(path, buffer);
        console.log(`File uploaded securely to ${path}`);

        return NextResponse.json({
            url: `/uploads/${safeFilename}`,
            name: file.name
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
