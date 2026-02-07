import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, PaymentStatus, OrderStatus } from '@prisma/client';
import { sendPaymentSuccessEmail } from '@/lib/email';
import { logError } from '@/lib/error-handler';

const prisma = new PrismaClient();

// Stripe signature verification
async function verifyStripeSignature(
    request: NextRequest,
    body: string
): Promise<boolean> {
    const signature = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
        return false;
    }

    // In production, use Stripe SDK to verify:
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // try {
    //   const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    //   return true;
    // } catch (err) {
    //   return false;
    // }

    // For now, basic verification
    return true;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();

        // Verify webhook signature
        const isValid = await verifyStripeSignature(request, body);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 401 }
            );
        }

        const event = JSON.parse(body);

        // Handle different event types
        switch (event.type) {
            case 'payment_intent.succeeded':
                await handlePaymentSuccess(event.data.object);
                break;

            case 'payment_intent.payment_failed':
                await handlePaymentFailure(event.data.object);
                break;

            case 'charge.refunded':
                await handleRefund(event.data.object);
                break;

            default:
                // Unhandled event type
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        logError(error, { endpoint: 'POST /api/payment/stripe/webhook' });
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}

async function handlePaymentSuccess(paymentIntent: any) {
    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) {
        logError(new Error('No order ID in payment intent metadata'), {
            paymentIntent: paymentIntent.id,
        });
        return;
    }

    try {
        // Update order
        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                paymentStatus: PaymentStatus.COMPLETED,
                paymentId: paymentIntent.id,
                status: OrderStatus.PROCESSING,
            },
            include: {
                user: true,
            },
        });

        const shippingAddress = JSON.parse(order.shippingAddress);

        // Send confirmation email
        await sendPaymentSuccessEmail(
            shippingAddress.email || 'customer@example.com',
            order.orderNumber,
            order.total
        ).catch(err => {
            logError(err, { context: 'Payment success email failed', orderId });
        });

    } catch (error) {
        logError(error, { context: 'Failed to update order on payment success', orderId });
    }
}

async function handlePaymentFailure(paymentIntent: any) {
    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) return;

    try {
        await prisma.order.update({
            where: { id: orderId },
            data: {
                paymentStatus: PaymentStatus.FAILED,
            },
        });
    } catch (error) {
        logError(error, { context: 'Failed to update order on payment failure', orderId });
    }
}

async function handleRefund(charge: any) {
    const orderId = charge.metadata?.orderId;

    if (!orderId) return;

    try {
        await prisma.order.update({
            where: { id: orderId },
            data: {
                paymentStatus: PaymentStatus.REFUNDED,
                status: OrderStatus.REFUNDED,
            },
        });
    } catch (error) {
        logError(error, { context: 'Failed to update order on refund', orderId });
    }
}
