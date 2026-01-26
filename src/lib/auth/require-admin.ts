import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthCookie, verifyToken, type TokenPayload } from './jwt';

/**
 * Verify the request has a valid JWT and the user has role 'admin'.
 * Returns { payload } on success, or a NextResponse (401/403) to return.
 */
export async function requireAdmin(request: NextRequest): Promise<
  | { payload: TokenPayload }
  | NextResponse
> {
  const token = getAuthCookie(request);
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
  }

  if (payload.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  return { payload };
}
