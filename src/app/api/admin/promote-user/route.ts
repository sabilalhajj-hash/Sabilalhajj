import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/require-admin';
import { updateUser, getUserById, getUserByEmail } from '@/lib/db/users';

const schema = z.object({
  userId: z.string().uuid().optional(),
  email: z.string().email().optional(),
}).refine((d) => d.userId ?? d.email, { message: 'Provide userId or email' });

/**
 * POST /api/admin/promote-user
 * Body: { userId?: string, email?: string }
 * Promotes the user to admin. Admin only.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { userId, email } = parsed.data;
    let targetId: string | null = null;

    if (userId) {
      const u = await getUserById(userId);
      targetId = u?.id ?? null;
    } else if (email) {
      const u = await getUserByEmail(email);
      targetId = u?.id ?? null;
    }

    if (!targetId) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    await updateUser(targetId, { role: 'admin' });
    return NextResponse.json(
      { message: 'User promoted to admin' },
      { status: 200 }
    );
  } catch (e) {
    console.error('Admin promote-user error:', e);
    return NextResponse.json(
      { error: 'Failed to promote user' },
      { status: 500 }
    );
  }
}
