import { NextResponse } from 'next/server';
import { buildClearAuthCookie } from '@/lib/auth/jwt';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' }, { status: 200 });
  res.headers.set('Set-Cookie', buildClearAuthCookie());
  return res;
}
