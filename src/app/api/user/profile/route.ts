import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth/require-auth';
import { updateUser } from '@/lib/db/users';

const updateProfileSchema = z.object({
  name: z.string().max(255).optional(),
  lastName: z.string().max(255).optional(),
  phone: z.string().max(50).optional(),
  avatar: z.string().max(500).optional(),
});

/** PATCH: Update current user profile (name, lastName, phone, avatar). */
export async function PATCH(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, lastName, phone, avatar } = parsed.data;
    const updates: { name?: string | null; lastName?: string | null; phone?: string | null; avatar?: string | null } = {};
    if (name !== undefined) updates.name = name || null;
    if (lastName !== undefined) updates.lastName = lastName || null;
    if (phone !== undefined) updates.phone = phone || null;
    if (avatar !== undefined) updates.avatar = avatar || null;

    const user = await updateUser(auth.payload.sub, updates);
    const { password: _, ...safe } = user;
    return NextResponse.json({ user: safe });
  } catch (e) {
    console.error('Profile update error:', e);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
