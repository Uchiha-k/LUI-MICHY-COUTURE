import { PrismaClient } from '@prisma/client';
import { PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

// M-Pesa STK Push implementation
// This is a placeholder - in production, integrate with Safaricom's M-Pesa API

export async function POST(request: Request) {
  try {
    const { orderId, phone, amount } = await request.json();

    if (!orderId || !phone || !amount) {
      return Response.json(
        { error: 'Order ID, phone, and amount required' },
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

    // In production, call Safaricom M-Pesa API here
    // const response = await fetch('https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     BusinessShortCode: BUSINESS_SHORT_CODE,
    //     Password: password,
    //     Timestamp: timestamp,
    //     TransactionType: 'CustomerPayBillOnline',
    //     Amount: amount,
    //     PartyA: phone,
    //     PartyB: BUSINESS_SHORT_CODE,
    //     PhoneNumber: phone,
    //     CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/mpesa/callback`,
    //     AccountReference: orderId,
    //     TransactionDesc: 'Order Payment',
    //   }),
    // });

    // Mock response
    const mockCheckoutRequestId = `ws_CO_${Math.random().toString(36).substring(2, 20)}`;

    return Response.json({
      checkoutRequestId: mockCheckoutRequestId,
      orderId,
      phone,
      amount,
      message: 'STK push sent. Please enter your M-Pesa PIN.',
    });
  } catch (error) {
    console.error('Failed to initiate M-Pesa payment:', error);
    return Response.json(
      { error: 'Failed to initiate M-Pesa payment' },
      { status: 500 }
    );
  }
}

// Callback from M-Pesa
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { orderId, checkoutRequestId, resultCode, resultDesc } = body;

    if (!orderId) {
      return Response.json({ error: 'Order ID required' }, { status: 400 });
    }

    let paymentStatus = PaymentStatus.PENDING;
    if (resultCode === '0') {
      paymentStatus = PaymentStatus.COMPLETED;
    } else if (resultCode === '1' || resultCode === '1032') {
      // User cancelled or other errors
      paymentStatus = PaymentStatus.FAILED;
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus,
        paymentId: checkoutRequestId,
      },
    });

    return Response.json({
      ResultCode: 0,
      ResultDesc: 'The service request has been accepted successfully',
      order,
    });
  } catch (error) {
    console.error('Failed to process M-Pesa callback:', error);
    return Response.json(
      { ResultCode: 1, ResultDesc: 'Failed to process callback' },
      { status: 500 }
    );
  }
}
