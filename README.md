# LUXE - Minimalist Luxury E-Commerce Platform

A production-ready e-commerce platform built with Next.js 16, PostgreSQL, Prisma, and featuring dual payment integration (Stripe + M-Pesa). Designed specifically for the Kenya market with international shipping capabilities.

## Features

### Customer Features
- **Product Catalog**: Browse curated products with filtering by category
- **Product Details**: High-quality product pages with image galleries and pricing in KES/USD
- **Shopping Cart**: Add/remove items, manage quantities, persistent cart storage
- **Checkout Flow**: Multi-step checkout with shipping address collection
- **Payment Options**:
  - **Stripe**: International card payments
  - **M-Pesa**: Mobile money payments for Kenya market
- **Order Management**: View order history and track status
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Admin Features
- **Dashboard**: Overview of products, orders, revenue, and pending orders
- **Product Management**: Add, edit, delete products with inventory tracking
- **Order Management**: View all orders, update shipping status, track payments
- **Search & Filtering**: Find products and orders quickly
- **Pagination**: Efficient data loading for large catalogs

### Technical Features
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Secure user registration and login with bcrypt
- **Payment Integration**: 
  - Stripe payment processing
  - M-Pesa STK push implementation
- **Responsive UI**: Tailwind CSS with shadcn/ui components
- **API-First**: RESTful API with proper error handling

## Project Structure

```
/app
  /api
    /auth              - Authentication endpoints (register, login, logout, session)
    /products          - Product listing and details
    /cart              - Shopping cart management
    /orders            - Order creation and retrieval
    /payment
      /stripe          - Stripe payment processing
      /mpesa           - M-Pesa payment processing
    /admin
      /products        - Admin product management
      /orders          - Admin order management
  /admin               - Admin dashboard pages
    /products          - Products management UI
    /orders            - Orders management UI
  /auth                - Auth pages (login, register)
  /products            - Product catalog pages
  /cart                - Shopping cart page
  /checkout            - Checkout page
  /payment             - Payment pages (Stripe, M-Pesa)
  /order-confirmation  - Order confirmation page
  /globals.css         - Global styles with design tokens
  /layout.tsx          - Root layout
  /page.tsx            - Homepage

/components
  /ui                  - shadcn/ui components
  /product-card.tsx    - Product card component
  /product-grid.tsx    - Product grid component

/prisma
  /schema.prisma       - Database schema

/lib
  /utils.ts            - Utility functions
```

## Database Schema

### Core Tables
- **User**: Customer and admin accounts
- **Product**: Product catalog with images, pricing, inventory
- **Category**: Product categories
- **CartItem**: Shopping cart items
- **Address**: Customer shipping addresses
- **Order**: Customer orders
- **OrderItem**: Items within orders

### Key Features
- Enum for OrderStatus (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED)
- Enum for PaymentMethod (STRIPE, MPESA)
- Enum for PaymentStatus (PENDING, COMPLETED, FAILED, REFUNDED)
- Support for multiple currencies (KES, USD)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/session` - Get current session

### Products
- `GET /api/products` - List products with filters
- `GET /api/products/[id]` - Get product details
- `POST /api/admin/products` - Create product (admin)
- `PUT /api/admin/products` - Update product (admin)
- `DELETE /api/admin/products?id=[id]` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item
- `DELETE /api/cart?id=[id]` - Remove from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `PUT /api/orders` - Update order status (admin)
- `GET /api/admin/orders` - List all orders (admin)

### Payments
- `POST /api/payment/stripe` - Create Stripe payment intent
- `PUT /api/payment/stripe` - Update payment status
- `POST /api/payment/mpesa` - Initiate M-Pesa STK push
- `PUT /api/payment/mpesa` - Process M-Pesa callback

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd luxe-ecommerce
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/luxe"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Set up the database
```bash
npx prisma migrate dev
```

5. Start the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Configuration

### Database
Update `.env.local` with your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://username:password@host:port/database"
```

### Payment Providers

#### Stripe Setup
1. Get API keys from Stripe Dashboard
2. Add to environment variables:
```env
STRIPE_SECRET_KEY="sk_..."
STRIPE_PUBLISHABLE_KEY="pk_..."
```

#### M-Pesa Setup
1. Register with Safaricom for Daraja API
2. Get credentials and add to environment:
```env
MPESA_CONSUMER_KEY="your_key"
MPESA_CONSUMER_SECRET="your_secret"
MPESA_BUSINESS_SHORT_CODE="your_code"
MPESA_PASSKEY="your_passkey"
```

## Security Considerations

### Authentication
- Passwords are hashed using bcrypt
- Session cookies are HTTP-only and secure
- User authentication required for cart and orders

### Payments
- Sensitive payment data never stored on server
- Stripe and M-Pesa handles PCI compliance
- All payment intents are validated server-side

### Database
- SQL injection prevention through Prisma parameterized queries
- Input validation on all endpoints
- Admin operations require authentication

## Testing

### Test Credentials

#### Stripe Test Card
- Card Number: 4242 4242 4242 4242
- Expiry: Any future date
- CVC: Any 3 digits

#### Sample Products
Use the admin dashboard to create test products:
1. Go to `/admin/products`
2. Click "Add Product"
3. Fill in product details

## Performance Optimization

- Product images optimized with Next.js Image component
- Pagination limits database queries
- Client-side caching with SWR hooks
- Tailwind CSS for optimized CSS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms
Ensure Node.js 18+ and set all required environment variables.

## Development Tips

### Adding Products
1. Use `/admin/products` UI or API
2. Upload product images
3. Set pricing in KES (primary) and USD (optional)
4. Publish when ready

### Managing Orders
1. View all orders in `/admin/orders`
2. Update order status as items ship
3. Track payment status automatically

### Customizing Design
- Edit design tokens in `/app/globals.css`
- Modify Tailwind config in theme section
- Update colors in CSS custom properties

## Known Limitations

- Payment processing is simulated (requires real integration)
- M-Pesa callbacks require webhook setup
- Admin access currently accessible (implement proper role-based access)
- Email notifications not implemented (requires email service)

## Future Enhancements

- [ ] Email order confirmations
- [ ] SMS notifications for M-Pesa
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Advanced filtering and search
- [ ] Inventory alerts
- [ ] Multi-language support
- [ ] Accounting integration
- [ ] Shipping rate calculation
- [ ] Discount codes and coupons

## Support

For issues or questions, please create an issue in the repository.

## License

MIT License - see LICENSE file for details

## Deployment Checklist

Before going to production:
- [ ] Set all environment variables
- [ ] Configure real Stripe keys
- [ ] Configure real M-Pesa credentials
- [ ] Set up PostgreSQL production database
- [ ] Enable HTTPS
- [ ] Configure CORS appropriately
- [ ] Set up backup strategy
- [ ] Configure monitoring and logging
- [ ] Test payment flows end-to-end
- [ ] Set up customer support channels
