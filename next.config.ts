import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  // Security headers
  async headers() {
    // More permissive CSP for development to allow network access
    // In development, we allow http connections for local network testing
    const cspDirectives = isDevelopment
      ? [
          "default-src 'self' http: ws:",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://wa.me http:",
          "style-src 'self' 'unsafe-inline' http:",
          "img-src 'self' data: https: http: blob:",
          "font-src 'self' data: http:",
          "connect-src 'self' https://wa.me https://api.emailjs.com http: ws:",
          "frame-src 'self' https://wa.me http:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self' http:",
          "frame-ancestors 'self' http:"
        ]
      : [
          "default-src 'self'",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://wa.me",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https: blob:",
          "font-src 'self' data:",
          "connect-src 'self' https://wa.me https://api.emailjs.com",
          "frame-src 'self' https://wa.me",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'self'",
          "upgrade-insecure-requests"
        ];

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          ...(isDevelopment ? [] : [
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=63072000; includeSubDomains; preload'
            }
          ]),
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: cspDirectives.join('; ')
          }
        ]
      }
    ];
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Image optimization settings
    // Local images in public folder work with relative paths, so they should work fine
  },

  // Compress responses
  compress: true,

  // React strict mode
  reactStrictMode: true,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'swiper'],
  },
};

export default nextConfig;