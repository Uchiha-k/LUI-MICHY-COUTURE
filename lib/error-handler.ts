import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * Centralized error logging utility
 * In production, this should integrate with error tracking services like Sentry
 */
export function logError(error: Error | unknown, context?: Record<string, unknown>) {
    const errorInfo = {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        context,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
    };

    if (process.env.NODE_ENV === 'production') {
        // In production, send to error tracking service
        // TODO: Integrate with Sentry or similar
        console.error('Production Error:', JSON.stringify(errorInfo));
    } else {
        // In development, log full error details
        console.error('Development Error:', error);
        if (context) {
            console.error('Context:', context);
        }
    }
}

/**
 * Create a safe error response for API routes
 * Sanitizes error messages in production to avoid information leakage
 */
export function createErrorResponse(
    error: Error | unknown,
    context?: Record<string, unknown>
): NextResponse {
    // Log the error
    logError(error, context);

    // Handle Zod validation errors
    if (error instanceof ZodError) {
        return NextResponse.json(
            {
                error: 'Validation failed',
                details: error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                })),
            },
            { status: 400 }
        );
    }

    // Handle known error types
    if (error instanceof Error) {
        // In production, don't leak internal error details
        if (process.env.NODE_ENV === 'production') {
            // Check if it's a client error (4xx) vs server error (5xx)
            const isClientError =
                error.message.includes('not found') ||
                error.message.includes('required') ||
                error.message.includes('invalid') ||
                error.message.includes('unauthorized');

            if (isClientError) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }

            // For server errors, return generic message
            return NextResponse.json(
                { error: 'An internal error occurred. Please try again later.' },
                { status: 500 }
            );
        }

        // In development, return full error message
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    // Unknown error type
    return NextResponse.json(
        {
            error: process.env.NODE_ENV === 'production'
                ? 'An unexpected error occurred'
                : String(error)
        },
        { status: 500 }
    );
}

/**
 * Async error handler wrapper for API routes
 */
export function withErrorHandler<T>(
    handler: (...args: T[]) => Promise<NextResponse>
) {
    return async (...args: T[]): Promise<NextResponse> => {
        try {
            return await handler(...args);
        } catch (error) {
            return createErrorResponse(error);
        }
    };
}
