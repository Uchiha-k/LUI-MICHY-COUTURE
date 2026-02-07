import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return Response.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
