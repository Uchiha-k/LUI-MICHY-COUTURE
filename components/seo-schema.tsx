import React from 'react';

interface ProductSchemaProps {
    product: {
        name: string;
        description: string;
        image: string;
        price: number;
        sku: string;
        category: string;
    };
}

export function ProductSchema({ product }: ProductSchemaProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image,
        description: product.description,
        sku: product.sku,
        brand: {
            '@type': 'Brand',
            name: 'LUI MICHY COUTURE'
        },
        offers: {
            '@type': 'Offer',
            url: `https://luimichy.com/products/${product.sku}`,
            priceCurrency: 'KES',
            price: product.price,
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition'
        },
        category: product.category
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export function BrandSchema() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'LUI MICHY COUTURE',
        url: 'https://luimichy.com',
        logo: 'https://luimichy.com/logo.png',
        sameAs: [
            'https://instagram.com/luimichy',
            'https://facebook.com/luimichy'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+254700000000',
            contactType: 'Sales',
            areaServed: 'Global',
            availableLanguage: ['English', 'Swahili']
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
