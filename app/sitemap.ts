import { MetadataRoute } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://luimichy.com';

    // Static pages
    const routes = [
        '',
        '/about',
        '/products',
        '/collections',
        '/trending',
        '/bespoke',
        '/contact',
        '/journey',
        '/booking',
        '/policies/privacy',
        '/policies/returns',
        '/policies/shipping',
        '/policies/payments',
        '/policies/custom-orders',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Fetch all published products
    try {
        const products = await prisma.product.findMany({
            where: { published: true },
            select: { id: true, updatedAt: true },
        });

        const productRoutes = products.map((product) => ({
            url: `${baseUrl}/products/${product.id}`,
            lastModified: product.updatedAt,
            changeFrequency: 'daily' as const,
            priority: 0.9,
        }));

        return [...routes, ...productRoutes];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        // Return static routes if database query fails
        return routes;
    }
}
