import { NextRequest, NextResponse } from 'next/server';
import { updateUser, getUserByEmail } from '@/lib/db/users';
import { z } from 'zod';

const schema = z.object({
  secret: z.string().min(1),
  email: z.string().email(),
});

/**
 * Promote a user to admin. Requires ADMIN_PROMOTE_SECRET in env.
 * POST /api/auth/promote-admin
 * Body: { secret: string, email: string }
 */
export async function POST(request: NextRequest) {
  const expected = process.env.ADMIN_PROMOTE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: 'Promote admin is not configured' },
      { status: 501 }
    );
  }

  try {
    const body = await request.json();
    const { secret, email } = schema.parse(body);

    if (secret !== expected) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 403 });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await updateUser(user.id, { role: 'admin' });
    return NextResponse.json(
      { message: `User ${email} promoted to admin` },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: e.issues },
        { status: 400 }
      );
    }
    console.error('Promote admin error:', e);
    return NextResponse.json(
      { error: 'Failed to promote user' },
      { status: 500 }
    );
  }
}
