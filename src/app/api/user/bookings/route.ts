import { NextRequest, NextResponse } from 'next/server';
import { getBookingsByUserId } from '@/lib/db/bookings';
import { requireAuth } from '@/lib/auth/require-auth';

// GET - List current user's bookings
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { payload } = authResult;
    const userId = payload.sub;

    const bookings = await getBookingsByUserId(userId);
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
