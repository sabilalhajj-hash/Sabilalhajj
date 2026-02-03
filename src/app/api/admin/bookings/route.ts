import { NextRequest, NextResponse } from 'next/server';
import { getAllBookings, createBooking, getBookingStats } from '@/lib/db/bookings';
import { requireAdmin } from '@/lib/auth/require-admin';
import { z } from 'zod';

const bookingSchema = z.object({
  userId: z.string().min(1),
  packageId: z.string().optional(),
  packageType: z.string().optional(),
  packageSlug: z.string().optional(),
  umrahType: z.enum(['collective', 'personalized']).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'completed', 'cancelled']).optional(),
  amount: z.string().optional(),
  travelDate: z.string().optional(),
  returnDate: z.string().optional(),
  userData: z.any().optional(),
  program: z.any().optional(),
  room: z.any().optional(),
  visa: z.any().optional(),
  notes: z.string().optional(),
});

// GET - List all bookings (admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    const bookings = await getAllBookings({ status, search, limit });
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST - Create new booking (admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    const bookingData = {
      ...validatedData,
      travelDate: validatedData.travelDate ? new Date(validatedData.travelDate) : undefined,
      returnDate: validatedData.returnDate ? new Date(validatedData.returnDate) : undefined,
    };
    const newBooking = await createBooking(bookingData);
    return NextResponse.json({ booking: newBooking }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
