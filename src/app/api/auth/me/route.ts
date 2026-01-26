import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookie, verifyToken } from '@/lib/auth/jwt';
import { getUserById } from '@/lib/db/users';

export async function GET(request: NextRequest) {
  try {
    const token = getAuthCookie(request);
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    const user = await getUserById(payload.sub);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (e) {
    console.error('Auth me error:', e);
    return NextResponse.json({ error: 'Failed to get session' }, { status: 500 });
  }
}
