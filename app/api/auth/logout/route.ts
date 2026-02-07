import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('userId');

    return Response.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return Response.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
