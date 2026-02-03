// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { rateLimit, getClientIP } from './src/lib/rateLimit';
// import { getAuthCookie, verifyToken } from './src/lib/auth/jwt';

// // Rate limiting configuration
// const rateLimitConfig = {
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   maxRequests: 100, // 100 requests per window
// };

// // API rate limiting (stricter)
// const apiRateLimitConfig = {
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   maxRequests: 20, // 20 requests per window
// };

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const response = NextResponse.next();

//   // Guest users must not see admin or user dashboard; redirect them away (never show the page).
//   if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
//     let payload: { role?: string } | null = null;
//     try {
//       const token = getAuthCookie(request);
//       payload = token ? await verifyToken(token) : null;
//     } catch {
//       // If JWT verification fails (e.g. bad secret in Edge), treat as guest
//     }

//     if (pathname.startsWith('/admin')) {
//       // Not logged in → redirect to sign-in page (never show admin)
//       if (!payload) {
//         const authUrl = new URL('/auth', request.url);
//         authUrl.searchParams.set('redirect', pathname);
//         return NextResponse.redirect(authUrl, 302);
//       }
//       // Logged in but not admin → redirect to home
//       if (payload.role !== 'admin') {
//         return NextResponse.redirect(new URL('/', request.url), 302);
//       }
//     } else {
//       // /user – only logged-in users; redirect guests to sign-in page
//       if (!payload) {
//         const authUrl = new URL('/auth', request.url);
//         authUrl.searchParams.set('redirect', pathname);
//         return NextResponse.redirect(authUrl, 302);
//       }
//     }
//   }

//   // Rate limiting for API routes
//   if (pathname.startsWith('/api/')) {
//     const clientIP = getClientIP(request);
//     const limitResult = rateLimit(`api:${clientIP}`, apiRateLimitConfig);
    
//     if (!limitResult.success) {
//       return new NextResponse(
//         JSON.stringify({ 
//           error: 'Too many requests. Please try again later.',
//           retryAfter: Math.ceil((limitResult.resetTime - Date.now()) / 1000)
//         }),
//         {
//           status: 429,
//           headers: {
//             'Content-Type': 'application/json',
//             'Retry-After': Math.ceil((limitResult.resetTime - Date.now()) / 1000).toString(),
//             'X-RateLimit-Limit': apiRateLimitConfig.maxRequests.toString(),
//             'X-RateLimit-Remaining': limitResult.remaining.toString(),
//             'X-RateLimit-Reset': limitResult.resetTime.toString(),
//           },
//         }
//       );
//     }
    
//     // Add rate limit headers
//     response.headers.set('X-RateLimit-Limit', apiRateLimitConfig.maxRequests.toString());
//     response.headers.set('X-RateLimit-Remaining', limitResult.remaining.toString());
//     response.headers.set('X-RateLimit-Reset', limitResult.resetTime.toString());
//   }

//   // General rate limiting
//   const clientIP = getClientIP(request);
//   const limitResult = rateLimit(`general:${clientIP}`, rateLimitConfig);
  
//   if (!limitResult.success) {
//     return new NextResponse(
//       JSON.stringify({ error: 'Too many requests. Please try again later.' }),
//       {
//         status: 429,
//         headers: {
//           'Content-Type': 'application/json',
//           'Retry-After': Math.ceil((limitResult.resetTime - Date.now()) / 1000).toString(),
//         },
//       }
//     );
//   }

//   // CSRF Protection: Add CSRF token header for POST/PUT/DELETE requests
//   if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
//     const origin = request.headers.get('origin');
//     const referer = request.headers.get('referer');
    
//     // Allow same-origin requests
//     if (origin && referer) {
//       try {
//         const originHost = new URL(origin).host;
//         const refererHost = new URL(referer).host;
        
//         if (originHost !== refererHost) {
//           return new NextResponse(
//             JSON.stringify({ error: 'CSRF token validation failed' }),
//             {
//               status: 403,
//               headers: { 'Content-Type': 'application/json' },
//             }
//           );
//         }
//       } catch (e) {
//         // Invalid URL, reject request
//         return new NextResponse(
//           JSON.stringify({ error: 'Invalid request origin' }),
//           {
//             status: 403,
//             headers: { 'Content-Type': 'application/json' },
//           }
//         );
//       }
//     }
//   }

//   // Return response without locale redirect
//   // Locale detection is handled client-side by i18next-browser-languagedetector
//   return response;
// }

// export const config = {
//   matcher: [
//     // Always run for /admin and /user so guest redirect is applied
//     '/admin',
//     '/admin/:path*',
//     '/user',
//     '/user/:path*',
//     // Rest of site (skip _next, static files, api, locales)
//     '/((?!_next|_static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|css|js)|api|locales).*)',
//   ],
// };



import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit, getClientIP } from './src/lib/rateLimit';
import { getAuthCookie, verifyToken } from './src/lib/auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. AUTHENTICATION SHIELD FIRST – so guests never see /admin or /user
  const isProtectedRoute = pathname.startsWith('/admin') || pathname.startsWith('/user');

  if (isProtectedRoute) {
    const token = getAuthCookie(request);
    let payload: { role?: string } | null = null;

    if (token) {
      try {
        payload = await verifyToken(token);
      } catch {
        // Invalid/expired token → treat as guest
      }
    }

    // Guest (no token or invalid) → redirect to sign-in, never show protected page
    if (!payload) {
      const loginUrl = new URL('/auth', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const res = NextResponse.redirect(loginUrl, 302);
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
      return res;
    }

    // Logged in but not admin on /admin → redirect to home
    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      const res = NextResponse.redirect(new URL('/', request.url), 302);
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
      return res;
    }
  }

  // 2. RATE LIMITING (Global & API)
  const clientIP = getClientIP(request);
  const isApiRoute = pathname.startsWith('/api/');
  const limitConfig = isApiRoute 
    ? { windowMs: 15 * 60 * 1000, maxRequests: 20 } 
    : { windowMs: 15 * 60 * 1000, maxRequests: 100 };

  const limitResult = rateLimit(`${isApiRoute ? 'api' : 'gen'}:${clientIP}`, limitConfig);
  
  if (!limitResult.success) {
    return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 3. CSRF PROTECTION (Mutation methods only)
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    if (origin && !origin.includes(host as string)) {
      return new NextResponse(JSON.stringify({ error: 'CSRF Validation Failed' }), { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Must run for /admin and /user so guests are always redirected to sign-in
    '/admin',
    '/admin/:path*',
    '/user',
    '/user/:path*',
    // Rest of site (skip _next, static assets, api)
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};