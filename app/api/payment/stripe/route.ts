import { PrismaClient } from '@prisma/client';
import { PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

// This is a placeholder for Stripe integration
// In production, you would use the Stripe SDK

export async function POST(request: Request) {
  try {
    const { orderId, amount, currency } = await request.json();

    if (!orderId || !amount) {
      return Response.json(
        { error: 'Order ID and amount required' },
        { status: 400 }
      );
    }

    // Get the order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return Response.json({ error: 'Order not found' }, { status: 404 });
    }

    // In production, create a Stripe payment intent here
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount * 100, // Convert to cents
    //   currency: currency || 'kes',
    //   metadata: { orderId },
    // });

    // For now, return a mock client secret
    const clientSecret = `pi_${Math.random().toString(36).substring(2, 15)}_secret_${Math.random().toString(36).substring(2, 15)}`;

    return Response.json({
      clientSecret,
      orderId,
      amount,
      currency: currency || 'kes',
    });
  } catch (error) {
    console.error('Failed to create payment intent:', error);
    return Response.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { orderId, paymentIntentId, status } = await request.json();

    if (!orderId || !paymentIntentId) {
      return Response.json(
        { error: 'Order ID and payment intent ID required' },
        { status: 400 }
      );
    }

    let paymentStatus = PaymentStatus.PENDING;
    if (status === 'succeeded') {
      paymentStatus = PaymentStatus.COMPLETED;
    } else if (status === 'failed') {
      paymentStatus = PaymentStatus.FAILED;
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus,
        paymentId: paymentIntentId,
      },
    });

    return Response.json(order);
  } catch (error) {
    console.error('Failed to update payment status:', error);
    return Response.json(
      { error: 'Failed to update payment status' },
      { status: 500 }
    );
  }
}
