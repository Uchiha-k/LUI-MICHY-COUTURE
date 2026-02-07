export interface RateLimitResult {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
}

const cache = new Map<string, { count: number; expires: number }>();

export function rateLimit(identifier: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const item = cache.get(identifier);

    if (!item || item.expires < now) {
        const expires = now + windowMs;
        cache.set(identifier, { count: 1, expires });
        return { success: true, limit, remaining: limit - 1, reset: expires };
    }

    item.count++;
    const remaining = limit - item.count;

    if (remaining < 0) {
        return { success: false, limit, remaining: 0, reset: item.expires };
    }

    return { success: true, limit, remaining, reset: item.expires };
}
