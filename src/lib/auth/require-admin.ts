import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthCookie, verifyToken, type TokenPayload } from './jwt';
import { getUserById } from '@/lib/db/users';

/**
 * Verify the request has a valid JWT and the user has role 'admin'.
 * Checks the current role in the database so promoting a user to admin
 * in the DB takes effect immediately (no re-login required).
 * Returns { payload, user } on success, or a NextResponse (401/403) to return.
 */
export async function requireAdmin(request: NextRequest): Promise<
  | { payload: TokenPayload; user: Awaited<ReturnType<typeof getUserById>> }
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

  // Check current role in DB so DB promotions (e.g. first admin) apply without re-login
  const user = await getUserById(payload.sub);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  return { payload, user };
}
