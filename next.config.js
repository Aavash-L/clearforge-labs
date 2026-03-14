/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Vercel / build ────────────────────────────────────
  output: 'standalone',          // smaller Vercel deployment bundle
  poweredByHeader: false,        // hide "X-Powered-By: Next.js" header
  compress: true,                // enable gzip/brotli compression

  // ── Images ────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },

  // ── Security + performance headers ───────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Allow Google Calendar iframe to load
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://prod.spline.design",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "frame-src https://calendar.google.com https://prod.spline.design https://www.dominuscapitalofficial.com https://www.wingsciticafe.com https://www.urmithreadingsalon.com",
              "connect-src 'self' https://prod.spline.design https://formspree.io",
              "worker-src blob:",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/(_next/static|favicon.ico|robots.txt)(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // ── Experimental perf ─────────────────────────────────
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
    ],
  },
}

module.exports = nextConfig
