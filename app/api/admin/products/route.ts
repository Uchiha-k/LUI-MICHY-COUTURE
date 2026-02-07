import { PrismaClient } from '@prisma/client';
import { checkIsAdmin } from '@/lib/admin';

const prisma = new PrismaClient();

async function checkAdmin() {
  return await checkIsAdmin();
}

export async function GET(request: Request) {
  try {
    if (!(await checkAdmin())) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const search = searchParams.get('search') || '';

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
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

export async function POST(request: Request) {
  try {
    if (!(await checkAdmin())) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, priceUSD, sku, category, images, stock, published, featured } = body;

    if (!name || !price || !sku || !category) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        priceUSD,
        sku,
        category,
        images: images || [],
        stock: stock || 0,
        published: published || false,
        featured: featured || false,
      },
    });

    return Response.json(product, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return Response.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await checkAdmin())) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return Response.json({ error: 'Product ID required' }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return Response.json(product);
  } catch (error) {
    console.error('Failed to update product:', error);
    return Response.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await checkAdmin())) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Product ID required' }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return Response.json({ deleted: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return Response.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
