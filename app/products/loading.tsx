export default function ProductsLoading() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="space-y-8">
                {/* Header Skeleton */}
                <div className="space-y-3">
                    <div className="h-10 w-64 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-96 bg-muted animate-pulse rounded" />
                </div>

                {/* Filter Skeleton */}
                <div className="flex gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 w-24 bg-muted animate-pulse rounded" />
                    ))}
                </div>

                {/* Product Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="space-y-4">
                            <div className="aspect-square bg-muted animate-pulse rounded-lg" />
                            <div className="space-y-2">
                                <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
                                <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
