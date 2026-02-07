import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS = [
  {
    name: 'Bridal Masterpiece',
    description: 'Exquisite hand-beaded wedding gown with intricate African-inspired embellishments',
    price: 285000,
    sku: 'BRIDAL-001',
    category: 'Bridal',
    images: ['/images/bridal-collection.jpg'],
    stock: 5,
    published: true,
    featured: true,
  },
  {
    name: 'Bespoke Evening Gown',
    description: 'Custom-tailored evening wear with flowing fabrics and elegant draping',
    price: 95000,
    sku: 'COUTURE-001',
    category: 'Bespoke Couture',
    images: ['/images/bespoke-couture.jpg'],
    stock: 3,
    published: true,
    featured: true,
  },
  {
    name: 'Luxury Event Dress',
    description: 'Sophisticated floor-length gown in jewel tones with designer tailoring',
    price: 65000,
    sku: 'EVENT-001',
    category: 'Event Wear',
    images: ['/images/event-wear.jpg'],
    stock: 8,
    published: true,
    featured: false,
  },
  {
    name: 'Limited Edition Fabric',
    description: 'Hand-embroidered artisan textile with intricate African patterns',
    price: 25000,
    sku: 'LIMITED-001',
    category: 'Limited Editions',
    images: ['/images/limited-edition.jpg'],
    stock: 2,
    published: true,
    featured: true,
  },
  {
    name: 'Silk Blend Blouse',
    description: 'Premium silk blend with premium finishing and elegant design',
    price: 12500,
    sku: 'SHIRT-001',
    category: 'Ready-to-Wear',
    images: ['/images/collection-tshirts.jpg'],
    stock: 12,
    published: true,
    featured: false,
  },
  {
    name: 'Minimalist Shift Dress',
    description: 'Understated elegance in luxurious linen fabric',
    price: 14500,
    sku: 'DRESS-001',
    category: 'Ready-to-Wear',
    images: ['/images/collection-dresses.jpg'],
    stock: 10,
    published: true,
    featured: false,
  },
  {
    name: 'Oversized Linen Jacket',
    description: 'Statement outerwear in premium European linen',
    price: 28000,
    sku: 'JACKET-001',
    category: 'Outerwear',
    images: ['/images/collection-outerwear.jpg'],
    stock: 6,
    published: true,
    featured: false,
  },
  {
    name: 'Gold Statement Belt',
    description: 'Handcrafted accessory with luxury finishing',
    price: 8500,
    sku: 'ACC-001',
    category: 'Accessories',
    images: ['/images/collection-accessories.jpg'],
    stock: 15,
    published: true,
    featured: false,
  },
  {
    name: 'Beaded Collar Necklace',
    description: 'Statement necklace with African-inspired beadwork',
    price: 12500,
    sku: 'ACC-002',
    category: 'Accessories',
    images: ['/images/collection-accessories.jpg'],
    stock: 7,
    published: true,
    featured: false,
  },
  {
    name: 'Couture Jacket',
    description: 'Tailored jacket with premium fabric and perfect fit',
    price: 35000,
    sku: 'JACKET-002',
    category: 'Outerwear',
    images: ['/images/collection-outerwear.jpg'],
    stock: 4,
    published: true,
    featured: false,
  },
  {
    name: 'Customizable Dress',
    description: 'Bespoke dress available in multiple fabrics and colors',
    price: 45000,
    sku: 'CUSTOM-001',
    category: 'Bespoke Couture',
    images: ['/images/bespoke-couture.jpg'],
    stock: 2,
    published: true,
    featured: false,
  },
  {
    name: 'Heritage Beaded Dress',
    description: 'Special occasion wear featuring traditional Kenyan beadwork',
    price: 75000,
    sku: 'SPECIAL-001',
    category: 'Event Wear',
    images: ['/images/event-wear.jpg'],
    stock: 3,
    published: true,
    featured: true,
  },
];

async function main() {
  console.log('Start seeding ...');

  for (const product of PRODUCTS) {
    const p = await prisma.product.upsert({
      where: { sku: product.sku },
      update: product,
      create: product,
    });
    console.log(`Upserted product with sku: ${p.sku} (id: ${p.id})`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
