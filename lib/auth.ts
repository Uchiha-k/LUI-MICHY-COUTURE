import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        // Password requirements: min 8 chars, 1 uppercase, 1 number
        requireEmailVerification: false, // Set to true when email verification is set up
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // Update session every 24 hours
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5, // 5 minutes
        },
    },
    user: {
        additionalFields: {
            isAdmin: {
                type: "boolean",
                required: false,
                defaultValue: false,
            },
        },
    },
    // Advanced security options
    advanced: {
        cookieOptions: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        },
        crossSubDomainCookies: {
            enabled: false,
        },
        useSecureCookies: process.env.NODE_ENV === 'production',
    },
    // Trust host in production (required for Vercel)
    trustedOrigins: process.env.NODE_ENV === 'production'
        ? [process.env.BETTER_AUTH_URL || '']
        : [],
});

