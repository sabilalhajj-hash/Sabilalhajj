import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { listUsers } from '@/lib/db/users';

/**
 * GET /api/admin/users
 * Returns all users (id, email, name, lastName, role, createdAt).
 * Admin only.
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const users = await listUsers();
    return NextResponse.json({ users }, { status: 200 });
  } catch (e) {
    console.error('Admin users list error:', e);
    return NextResponse.json(
      { error: 'Failed to list users' },
      { status: 500 }
    );
  }
}
