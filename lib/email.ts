import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@luimichy.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@luimichy.com';

export interface OrderEmailData {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    subtotal: number;
    shippingCost: number;
    total: number;
    shippingAddress: any;
}

/**
 * Send order confirmation email to customer
 */
export async function sendOrderConfirmationEmail(data: OrderEmailData) {
    try {
        const { data: emailData, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: data.customerEmail,
            subject: `Order Confirmation #${data.orderNumber} - LUI MICHY`,
            html: generateOrderConfirmationHTML(data),
        });

        if (error) {
            console.error('Error sending order confirmation email:', error);
            throw error;
        }

        return emailData;
    } catch (error) {
        console.error('Failed to send order confirmation email:', error);
        throw error;
    }
}

/**
 * Send order notification to admin
 */
export async function sendAdminOrderNotification(data: OrderEmailData) {
    try {
        const { data: emailData, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `New Order #${data.orderNumber}`,
            html: generateAdminOrderNotificationHTML(data),
        });

        if (error) {
            console.error('Error sending admin notification:', error);
            throw error;
        }

        return emailData;
    } catch (error) {
        console.error('Failed to send admin notification:', error);
        throw error;
    }
}

/**
 * Send payment success email
 */
export async function sendPaymentSuccessEmail(
    customerEmail: string,
    orderNumber: string,
    amount: number
) {
    try {
        const { data: emailData, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: customerEmail,
            subject: `Payment Received - Order #${orderNumber}`,
            html: generatePaymentSuccessHTML(orderNumber, amount),
        });

        if (error) {
            console.error('Error sending payment success email:', error);
            throw error;
        }

        return emailData;
    } catch (error) {
        console.error('Failed to send payment success email:', error);
        throw error;
    }
}

/**
 * Send shipping update email
 */
export async function sendShippingUpdateEmail(
    customerEmail: string,
    orderNumber: string,
    status: string,
    trackingNumber?: string
) {
    try {
        const { data: emailData, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: customerEmail,
            subject: `Shipping Update - Order #${orderNumber}`,
            html: generateShippingUpdateHTML(orderNumber, status, trackingNumber),
        });

        if (error) {
            console.error('Error sending shipping update email:', error);
            throw error;
        }

        return emailData;
    } catch (error) {
        console.error('Failed to send shipping update email:', error);
        throw error;
    }
}

// HTML Email Templates

function generateOrderConfirmationHTML(data: OrderEmailData): string {
    const itemsHTML = data.items
        .map(
            (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">KES ${item.price.toLocaleString()}</td>
    </tr>
  `
        )
        .join('');

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #000; color: #fff; padding: 30px; text-align: center;">
    <h1 style="margin: 0; font-size: 28px; letter-spacing: 2px;">LUI MICHY</h1>
  </div>
  
  <div style="background: #fff; padding: 40px 30px;">
    <h2 style="color: #000; margin-bottom: 10px;">Thank You for Your Order!</h2>
    <p style="color: #666; margin-bottom: 30px;">
      Hi ${data.customerName}, we've received your order and will get it ready for shipping. 
      You'll receive another email when your order has shipped.
    </p>
    
    <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
      <h3 style="margin: 0 0 10px 0; color: #000;">Order Details</h3>
      <p style="margin: 5px 0; color: #666;"><strong>Order Number:</strong> #${data.orderNumber}</p>
    </div>
    
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
      <thead>
        <tr style="background: #f9fafb;">
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Item</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Qty</th>
          <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" style="padding: 12px; text-align: right; font-weight: 600;">Subtotal:</td>
          <td style="padding: 12px; text-align: right;">KES ${data.subtotal.toLocaleString()}</td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 12px; text-align: right; font-weight: 600;">Shipping:</td>
          <td style="padding: 12px; text-align: right;">KES ${data.shippingCost.toLocaleString()}</td>
        </tr>
        <tr style="background: #f9fafb;">
          <td colspan="2" style="padding: 12px; text-align: right; font-weight: 700; font-size: 18px;">Total:</td>
          <td style="padding: 12px; text-align: right; font-weight: 700; font-size: 18px;">KES ${data.total.toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>
    
    <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
      <h3 style="margin: 0 0 10px 0; color: #000;">Shipping Address</h3>
      <p style="margin: 5px 0; color: #666;">
        ${data.shippingAddress.fullName}<br>
        ${data.shippingAddress.street}<br>
        ${data.shippingAddress.city}, ${data.shippingAddress.postalCode}<br>
        ${data.shippingAddress.country}
      </p>
    </div>
    
    <p style="color: #666; margin-top: 30px;">
      If you have any questions, please contact us at <a href="mailto:info@luimichy.com" style="color: #000;">info@luimichy.com</a>
    </p>
  </div>
  
  <div style="background: #f9fafb; padding: 20px; text-align: center; color: #666; font-size: 12px;">
    <p>&copy; ${new Date().getFullYear()} LUI MICHY. All rights reserved.</p>
  </div>
</body>
</html>
  `;
}

function generateAdminOrderNotificationHTML(data: OrderEmailData): string {
    return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h2>New Order Received: #${data.orderNumber}</h2>
  <p><strong>Customer:</strong> ${data.customerName} (${data.customerEmail})</p>
  <p><strong>Total:</strong> KES ${data.total.toLocaleString()}</p>
  <p><strong>Items:</strong> ${data.items.length}</p>
  <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/orders" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; display: inline-block; margin-top: 10px;">View Order</a></p>
</body>
</html>
  `;
}

function generatePaymentSuccessHTML(orderNumber: string, amount: number): string {
    return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <div style="background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px;">
    <h2>Payment Received!</h2>
  </div>
  <div style="padding: 30px 20px;">
    <p>Your payment of <strong>KES ${amount.toLocaleString()}</strong> for order <strong>#${orderNumber}</strong> has been successfully processed.</p>
    <p>We'll start preparing your order for shipment right away.</p>
    <p style="margin-top: 30px;">Thank you for shopping with LUI MICHY!</p>
  </div>
</body>
</html>
  `;
}

function generateShippingUpdateHTML(
    orderNumber: string,
    status: string,
    trackingNumber?: string
): string {
    return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2>Shipping Update - Order #${orderNumber}</h2>
  <p>Your order status has been updated to: <strong>${status}</strong></p>
  ${trackingNumber ? `<p>Tracking Number: <strong>${trackingNumber}</strong></p>` : ''}
  <p style="margin-top: 30px;">Thank you for your patience!</p>
</body>
</html>
  `;
}
