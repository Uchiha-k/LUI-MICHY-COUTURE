import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        const subscriber = await prisma.subscriber.upsert({
            where: { email },
            update: {},
            create: { email },
        });

        return NextResponse.json({ success: true, subscriber });
    } catch (error) {
        console.error('Newsletter error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
