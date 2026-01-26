import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit, getClientIP } from './src/lib/rateLimit';
import { getAuthCookie, verifyToken } from './src/lib/auth/jwt';

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Auth protection for /admin and /user
  if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
    const token = getAuthCookie(request);
    const payload = token ? await verifyToken(token) : null;

    if (pathname.startsWith('/admin')) {
      if (!payload || payload.role !== 'admin') {
        const redirect = new URL('/auth', request.url);
        redirect.searchParams.set('redirect', '/admin');
        return NextResponse.redirect(redirect);
      }
    } else {
      // /user
      if (!payload) {
        const redirect = new URL('/auth', request.url);
        redirect.searchParams.set('redirect', '/user');
        return NextResponse.redirect(redirect);
      }
    }
  }

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

  // Return response without locale redirect
  // Locale detection is handled client-side by i18next-browser-languagedetector
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), static files, and API routes
    '/((?!_next|_static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|css|js)|api|locales).*)',
  ],
};
