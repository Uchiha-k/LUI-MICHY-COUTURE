import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (category && category !== 'All') {
      where.category = category;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.product.count({ where });

    return Response.json({
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
