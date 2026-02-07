import { z } from 'zod';

// --- Authentication Schemas ---

export const RegisterSchema = z.object({
    email: z.string().email("Invalid email address").toLowerCase(),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password must be less than 128 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    name: z.string().min(1, "Name is required").max(100),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address").toLowerCase(),
    password: z.string().min(1, "Password is required"),
});

// --- Product Schemas ---

export const ProductSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    description: z.string().optional(),
    price: z.number().positive("Price must be positive"),
    priceUSD: z.number().positive("Price USD must be positive").optional(),
    sku: z.string().min(3, "SKU must be at least 3 characters").max(20),
    category: z.string().min(1, "Category is required"),
    images: z.array(z.string().url()).default([]),
    stock: z.number().int().nonnegative().default(0),
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
});

export const ProductUpdateSchema = ProductSchema.partial().extend({
    id: z.string().cuid("Invalid product ID"),
});

// --- Cart Schemas ---

export const AddToCartSchema = z.object({
    productId: z.string().cuid("Invalid product ID"),
    quantity: z.number().int().positive("Quantity must be positive").max(100, "Quantity too large"),
});

export const UpdateCartSchema = z.object({
    cartItemId: z.string().cuid("Invalid cart item ID"),
    quantity: z.number().int().nonnegative("Quantity must be non-negative").max(100, "Quantity too large"),
});

// --- Order Schemas ---

export const ShippingAddressSchema = z.object({
    fullName: z.string().min(1, "Full name is required").max(100),
    street: z.string().min(1, "Street address is required").max(200),
    city: z.string().min(1, "City is required").max(100),
    state: z.string().max(100).optional(),
    postalCode: z.string().min(1, "Postal code is required").max(20),
    country: z.string().min(1, "Country is required").max(100),
    phone: z.string().min(1, "Phone number is required").max(20),
});

export const CreateOrderSchema = z.object({
    shippingAddress: ShippingAddressSchema,
    paymentMethod: z.enum(['STRIPE', 'MPESA'], {
        errorMap: () => ({ message: "Invalid payment method" })
    }),
    currency: z.enum(['KES', 'USD']).default('KES'),
    notes: z.string().max(500).optional(),
});

export const OrderStatusSchema = z.enum([
    'PENDING',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'REFUNDED'
]);

export const OrderUpdateSchema = z.object({
    orderId: z.string().cuid("Invalid order ID"),
    status: OrderStatusSchema,
});

// --- Payment Schemas ---

export const CreatePaymentIntentSchema = z.object({
    orderId: z.string().cuid("Invalid order ID"),
    amount: z.number().positive("Amount must be positive"),
    currency: z.enum(['KES', 'USD']).default('KES'),
});

export const UpdatePaymentStatusSchema = z.object({
    orderId: z.string().cuid("Invalid order ID"),
    paymentIntentId: z.string().min(1, "Payment intent ID is required"),
    status: z.enum(['succeeded', 'failed', 'pending']),
});

// --- Contact/Newsletter Schemas ---

export const ContactFormSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required").max(200),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

export const NewsletterSchema = z.object({
    email: z.string().email("Invalid email address").toLowerCase(),
});

// --- Upload Schemas ---

export const AllowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const MaxFileSize = 5 * 1024 * 1024; // 5MB

export const ImageUploadSchema = z.object({
    file: z.any()
        .refine((file) => file?.size <= MaxFileSize, `Max file size is 5MB.`)
        .refine(
            (file) => AllowedImageTypes.includes(file?.type),
            "Only .jpg, .png, .webp and .gif formats are supported."
        ),
});

