import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// Get user ID from session (will be implemented with auth)
async function getUserId() {
  // TODO: Get from session/auth
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  return userId || 'anonymous';
}

export async function GET(request: Request) {
  try {
    const userId = await getUserId();

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });

    return Response.json(cartItems);
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return Response.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    const { productId, quantity } = await request.json();

    if (!productId || !quantity || quantity < 1) {
      return Response.json(
        { error: 'Invalid product ID or quantity' },
        { status: 400 }
      );
    }

    // Check if product exists and has stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    // Add or update cart item
    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId,
        productId,
        quantity,
      },
      include: { product: true },
    });

    return Response.json(cartItem);
  } catch (error) {
    console.error('Failed to add to cart:', error);
    return Response.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = await getUserId();
    const { cartItemId, quantity } = await request.json();

    if (!cartItemId || quantity < 0) {
      return Response.json(
        { error: 'Invalid cart item ID or quantity' },
        { status: 400 }
      );
    }

    if (quantity === 0) {
      // Delete cart item
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
      return Response.json({ deleted: true });
    }

    const cartItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: { quantity },
      include: { product: true },
    });

    return Response.json(cartItem);
  } catch (error) {
    console.error('Failed to update cart:', error);
    return Response.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = await getUserId();
    const { searchParams } = new URL(request.url);
    const cartItemId = searchParams.get('id');

    if (!cartItemId) {
      return Response.json({ error: 'Cart item ID required' }, { status: 400 });
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return Response.json({ deleted: true });
  } catch (error) {
    console.error('Failed to delete cart item:', error);
    return Response.json({ error: 'Failed to delete cart item' }, { status: 500 });
  }
}
