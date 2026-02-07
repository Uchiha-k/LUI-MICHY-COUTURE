import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { PaymentMethod, OrderStatus, PaymentStatus } from '@prisma/client';
import { CreateOrderSchema } from '@/lib/schemas';
import { createErrorResponse, logError } from '@/lib/error-handler';
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from '@/lib/email';

const prisma = new PrismaClient();

// Get user ID from session (will be implemented with auth)
async function getUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  return userId || 'anonymous';
}

// Generate order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export async function GET(request: Request) {
  try {
    const userId = await getUserId();
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (orderId) {
      // Get specific order
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      if (!order || order.userId !== userId) {
        return Response.json({ error: 'Order not found' }, { status: 404 });
      }

      return Response.json(order);
    }

    // Get user's orders
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return Response.json(orders);
  } catch (error) {
    return createErrorResponse(error, { endpoint: 'GET /api/orders' });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    const body = await request.json();

    // Validate cart items exist
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return Response.json(
        { error: 'Cart items are required' },
        { status: 400 }
      );
    }

    // Validate shipping address and payment method
    const validation = CreateOrderSchema.safeParse({
      shippingAddress: {
        fullName: body.fullName || `${body.firstName || ''} ${body.lastName || ''}`.trim(),
        street: body.street,
        city: body.city,
        state: body.state,
        postalCode: body.postalCode,
        country: body.country || 'Kenya',
        phone: body.phone,
      },
      paymentMethod: body.paymentMethod,
      currency: body.currency || 'KES',
      notes: body.notes,
    });

    if (!validation.success) {
      return Response.json(
        {
          error: 'Validation failed',
          details: validation.error.errors
        },
        { status: 400 }
      );
    }

    const { shippingAddress, paymentMethod, currency, notes } = validation.data;

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of body.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return Response.json(
          { error: `Product not found: ${item.productId}` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return Response.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        priceAtTime: product.price,
        subtotal: itemSubtotal,
        productName: product.name, // for email
      });
    }

    const shippingCost = body.shippingCost || 0;
    const tax = body.tax || 0;
    const total = subtotal + shippingCost + tax;

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        orderNumber: generateOrderNumber(),
        status: OrderStatus.PENDING,
        paymentMethod: paymentMethod,
        paymentStatus: PaymentStatus.PENDING,
        currency: currency,
        subtotal,
        shippingCost,
        tax,
        total,
        shippingAddress: JSON.stringify(shippingAddress),
        notes: notes || null,
        items: {
          create: orderItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtTime: item.priceAtTime,
            subtotal: item.subtotal,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    // Update product stock
    for (const item of orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Clear cart
    if (userId !== 'anonymous') {
      await prisma.cartItem.deleteMany({
        where: { userId },
      });
    }

    // Send confirmation emails (don't block on this)
    const emailData = {
      orderNumber: order.orderNumber,
      customerName: shippingAddress.fullName,
      customerEmail: body.email || 'customer@example.com',
      items: orderItems.map(item => ({
        name: item.productName,
        quantity: item.quantity,
        price: item.priceAtTime,
      })),
      subtotal,
      shippingCost,
      total,
      shippingAddress,
    };

    // Send emails asynchronously
    Promise.all([
      sendOrderConfirmationEmail(emailData),
      sendAdminOrderNotification(emailData),
    ]).catch(error => {
      logError(error, { context: 'Email notification failed', orderId: order.id });
    });

    return Response.json(order, { status: 201 });
  } catch (error) {
    return createErrorResponse(error, { endpoint: 'POST /api/orders' });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status, paymentStatus, paymentId } = body;

    if (!orderId) {
      return Response.json({ error: 'Order ID required' }, { status: 400 });
    }

    const updateData: Partial<{
      status: OrderStatus;
      paymentStatus: PaymentStatus;
      paymentId: string;
    }> = {};

    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (paymentId) updateData.paymentId = paymentId;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    return Response.json(order);
  } catch (error) {
    return createErrorResponse(error, { endpoint: 'PUT /api/orders' });
  }
}

