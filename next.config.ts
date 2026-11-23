import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
      // Allow the owner's portfolio to preview public marketing pages.
      // Other routes retain the same-origin-only policy above.
      ...['/', '/sitetally', '/privacy', '/terms'].map((source) => ({
        source,
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://aavash-lamichhane-portfolio.lami-venture-1521.chatgpt.site",
          },
        ],
      })),
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
