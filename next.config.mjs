/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove ignoreBuildErrors for production safety
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Enable image optimization
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Environment variable validation
  async headers() {
    // Validate critical environment variables
    const requiredEnvVars = [
      'DATABASE_URL',
      'BETTER_AUTH_SECRET',
      'BETTER_AUTH_URL',
    ];

    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}\n` +
        'Please check your .env.local file against .env.example'
      );
    }

    return [];
  },

  // Performance optimizations
  swcMinify: true,
  
  // Production optimizations
  compress: true,
  
  // Strict mode for better error catching
  reactStrictMode: true,

  // Output configuration for Vercel
  output: 'standalone',
}

export default nextConfig
