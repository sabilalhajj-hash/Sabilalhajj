import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './next-i18next.config';
import { rateLimit, getClientIP } from './src/lib/rateLimit';

// Rate limiting configuration
const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per window
};

// API rate limiting (stricter)
const apiRateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 20, // 20 requests per window
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const clientIP = getClientIP(request);
    const limitResult = rateLimit(`api:${clientIP}`, apiRateLimitConfig);
    
    if (!limitResult.success) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((limitResult.resetTime - Date.now()) / 1000)
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((limitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': apiRateLimitConfig.maxRequests.toString(),
            'X-RateLimit-Remaining': limitResult.remaining.toString(),
            'X-RateLimit-Reset': limitResult.resetTime.toString(),
          },
        }
      );
    }
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', apiRateLimitConfig.maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', limitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', limitResult.resetTime.toString());
  }

  // General rate limiting
  const clientIP = getClientIP(request);
  const limitResult = rateLimit(`general:${clientIP}`, rateLimitConfig);
  
  if (!limitResult.success) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((limitResult.resetTime - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // CSRF Protection: Add CSRF token header for POST/PUT/DELETE requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const csrfToken = request.headers.get('x-csrf-token');
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    
    // Allow same-origin requests
    if (origin && referer) {
      try {
        const originHost = new URL(origin).host;
        const refererHost = new URL(referer).host;
        
        if (originHost !== refererHost) {
          return new NextResponse(
            JSON.stringify({ error: 'CSRF token validation failed' }),
            {
              status: 403,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
      } catch (e) {
        // Invalid URL, reject request
        return new NextResponse(
          JSON.stringify({ error: 'Invalid request origin' }),
          {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }
  }

  // Check if the pathname starts with a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return response;
  }

  // Redirect if there is no locale
  const locale = i18n.defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|_static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)',
  ],
};
