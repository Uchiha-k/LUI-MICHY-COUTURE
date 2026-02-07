import { NextResponse, type NextRequest } from "next/server";

// Basic in-memory rate limiting map
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute for sensitive routes

function isRateLimited(ip: string, path: string) {
    const key = `${ip}:${path}`;
    const now = Date.now();
    const limitData = rateLimitMap.get(key);

    if (!limitData || (now - limitData.lastReset) > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(key, { count: 1, lastReset: now });
        return false;
    }

    if (limitData.count >= MAX_REQUESTS) {
        return true;
    }

    limitData.count++;
    return false;
}

export default async function authMiddleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isAdminRoute = pathname.startsWith("/admin");
    const isAdminApiRoute = pathname.startsWith("/api/admin");
    const isAuthApiRoute = pathname.startsWith("/api/auth");

    // --- RATE LIMITING ---
    if (isAuthApiRoute && (request.method === "POST" || request.method === "PUT")) {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "anonymous";
        if (isRateLimited(ip, pathname)) {
            return new NextResponse("Too many requests", { status: 429 });
        }
    }

    let response = NextResponse.next();

    if (isAdminRoute || isAdminApiRoute) {
        // Use standard fetch to check session
        const authResponse = await fetch(
            new URL("/api/auth/get-session", request.url),
            {
                headers: {
                    cookie: request.headers.get("cookie") || "",
                },
            }
        );

        const session = authResponse.ok ? await authResponse.json() : null;

        if (!session) {
            response = NextResponse.redirect(new URL("/auth/login", request.url));
        } else if (!session.user?.isAdmin) {
            response = NextResponse.redirect(new URL("/", request.url));
        }
    }

    // --- SECURITY HEADERS ---
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com;
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data: res.cloudinary.com;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        frame-src https://js.stripe.com;
        connect-src 'self' https://api.stripe.com;
        upgrade-insecure-requests;
    `.replace(/\s{2,}/g, " ").trim();

    response.headers.set("Content-Security-Policy", cspHeader);
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

    return response;
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};


