// Simple in-memory rate limiter
// For production, consider using Redis or a dedicated service

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions = { windowMs: 60000, maxRequests: 10 }
): RateLimitResult {
  const now = Date.now();
  const key = identifier;
  
  // Clean up expired entries
  Object.keys(store).forEach((k) => {
    if (store[k].resetTime < now) {
      delete store[k];
    }
  });
  
  // Get or create entry
  let entry = store[key];
  
  if (!entry || entry.resetTime < now) {
    // Create new window
    entry = {
      count: 1,
      resetTime: now + options.windowMs,
    };
    store[key] = entry;
    
    return {
      success: true,
      remaining: options.maxRequests - 1,
      resetTime: entry.resetTime,
    };
  }
  
  // Increment count
  entry.count++;
  
  if (entry.count > options.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }
  
  return {
    success: true,
    remaining: options.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

// Get client IP from request
export function getClientIP(request: Request | { headers: { get: (name: string) => string | null } }): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}
