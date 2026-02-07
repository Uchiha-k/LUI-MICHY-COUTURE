import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: firstName || '',
        lastName: lastName || '',
      },
    });

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return Response.json(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
