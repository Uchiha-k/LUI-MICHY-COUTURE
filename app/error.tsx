'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to error tracking service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Oops!</h1>
                    <h2 className="text-2xl text-muted-foreground">
                        Something went wrong
                    </h2>
                </div>

                <p className="text-muted-foreground">
                    We apologize for the inconvenience. An unexpected error has occurred.
                </p>

                {process.env.NODE_ENV === 'development' && (
                    <div className="p-4 border rounded-lg bg-muted text-left">
                        <p className="text-sm font-mono text-destructive">
                            {error.message}
                        </p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={reset}
                        size="lg"
                    >
                        Try Again
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => window.location.href = '/'}
                    >
                        Return Home
                    </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                    If this problem persists, please contact our support team.
                </p>
            </div>
        </div>
    );
}
