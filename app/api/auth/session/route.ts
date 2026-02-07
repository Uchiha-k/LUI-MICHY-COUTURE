import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return Response.json({ user: null }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isAdmin: true,
      },
    });

    if (!user) {
      return Response.json({ user: null }, { status: 401 });
    }

    return Response.json({ user });
  } catch (error) {
    console.error('Session error:', error);
    return Response.json({ user: null }, { status: 401 });
  }
}
