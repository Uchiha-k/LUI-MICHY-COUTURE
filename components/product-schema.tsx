import { Product } from '@prisma/client';

interface ProductSchemaProps {
    product: Product;
}

export function ProductSchema({ product }: ProductSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description || `${product.name} from LUI MICHY`,
        image: product.images.length > 0 ? product.images : undefined,
        sku: product.sku,
        brand: {
            '@type': 'Brand',
            name: 'LUI MICHY',
        },
        offers: {
            '@type': 'Offer',
            url: `${process.env.NEXT_PUBLIC_APP_URL}/products/${product.id}`,
            priceCurrency: 'KES',
            price: product.price.toString(),
            priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
            availability: product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            reviewCount: '1', // Update when review system is implemented
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Organization Schema for homepage
export function OrganizationSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'LUI MICHY',
        description: 'Luxury Fashion & Lifestyle Brand in Kenya',
        url: process.env.NEXT_PUBLIC_APP_URL,
        logo: `${process.env.NEXT_PUBLIC_APP_URL}/icon.svg`,
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            email: 'info@luimichy.com',
        },
        sameAs: [
            // Add social media links here
            'https://instagram.com/luimichy',
            'https://facebook.com/luimichy',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Breadcrumb Schema
interface BreadcrumbItem {
    name: string;
    url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
