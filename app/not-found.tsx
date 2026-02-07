import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-6xl font-bold tracking-tight">404</h1>
                    <h2 className="text-2xl text-muted-foreground">
                        Page Not Found
                    </h2>
                </div>

                <p className="text-muted-foreground">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild size="lg">
                        <Link href="/">
                            Return Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/products">
                            Browse Products
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
