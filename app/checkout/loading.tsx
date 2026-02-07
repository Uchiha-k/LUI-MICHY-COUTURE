export default function CheckoutLoading() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="h-8 w-48 bg-muted animate-pulse rounded mb-8" />

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Shipping Form Skeleton */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                                <div className="h-10 bg-muted animate-pulse rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary Skeleton */}
                <div className="space-y-4">
                    <div className="h-6 w-40 bg-muted animate-pulse rounded mb-4" />
                    <div className="border rounded-lg p-6 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-4 bg-muted animate-pulse rounded" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
