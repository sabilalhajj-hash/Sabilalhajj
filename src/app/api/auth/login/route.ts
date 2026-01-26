import { NextRequest, NextResponse } from 'next/server';
import { verifyUserPassword } from '@/lib/db/users';
import { signToken, buildSetAuthCookie } from '@/lib/auth/jwt';
import { z } from 'zod';

const loginSchema = z.object({
  emailOrUsername: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    const user = await verifyUserPassword(validatedData.emailOrUsername, validatedData.password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email/username or password' },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = await signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const res = NextResponse.json(
      { user: userWithoutPassword, message: 'Login successful' },
      { status: 200 }
    );
    res.headers.set('Set-Cookie', buildSetAuthCookie(token));
    return res;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
}
