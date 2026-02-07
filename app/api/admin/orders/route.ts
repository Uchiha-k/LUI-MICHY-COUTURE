import { PrismaClient } from '@prisma/client';
import { OrderStatus } from '@prisma/client';
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
    const status = searchParams.get('status');
    const search = searchParams.get('search') || '';

    const where: any = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: { product: true },
        },
        user: {
          select: { email: true, firstName: true, lastName: true },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.order.count({ where });

    return Response.json({
      orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return Response.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await checkAdmin())) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return Response.json(
        { error: 'Order ID and status required' },
        { status: 400 }
      );
    }

    // Validate status
    if (!Object.values(OrderStatus).includes(status)) {
      return Response.json({ error: 'Invalid status' }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    return Response.json(order);
  } catch (error) {
    console.error('Failed to update order:', error);
    return Response.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
