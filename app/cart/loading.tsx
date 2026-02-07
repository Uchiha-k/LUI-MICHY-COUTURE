export default function CartLoading() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items Skeleton */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6" />

                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 p-4 border rounded-lg">
                            <div className="w-24 h-24 bg-muted animate-pulse rounded" />
                            <div className="flex-1 space-y-3">
                                <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
                                <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
                                <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary Skeleton */}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 space-y-4 sticky top-4">
                        <div className="h-6 w-32 bg-muted animate-pulse rounded mb-4" />
                        <div className="space-y-3">
                            <div className="h-4 bg-muted animate-pulse rounded" />
                            <div className="h-4 bg-muted animate-pulse rounded" />
                            <div className="h-6 bg-muted animate-pulse rounded mt-4" />
                        </div>
                        <div className="h-12 bg-muted animate-pulse rounded mt-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}
