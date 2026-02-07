import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        // In a real app, you'd check for admin session here
        const subscribers = await prisma.subscriber.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ success: true, subscribers });
    } catch (error) {
        console.error('Failed to fetch subscribers:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
