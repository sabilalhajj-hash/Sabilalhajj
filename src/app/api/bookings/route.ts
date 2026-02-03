import { NextRequest, NextResponse } from 'next/server';
import { createBooking } from '@/lib/db/bookings';
import { requireAuth } from '@/lib/auth/require-auth';
import { appendBookingToSheet } from '@/lib/googleSheet';
import { z } from 'zod';

const createBookingSchema = z.object({
  packageId: z.string().optional(),
  packageType: z.string().optional(),
  packageSlug: z.string().optional(),
  umrahType: z.enum(['collective', 'personalized']).optional(),
  amount: z.string().optional(),
  travelDate: z.string().optional(),
  returnDate: z.string().optional(),
  userData: z.any().optional(),
  program: z.any().optional(),
  room: z.any().optional(),
  visa: z.any().optional(),
});

function isGuestUserDataValid(userData: unknown): boolean {
  if (!userData) return false;
  const arr = Array.isArray(userData) ? userData : [userData];
  const first = arr[0];
  if (!first || typeof first !== 'object') return false;
  const o = first as Record<string, unknown>;
  return !!(o?.name || o?.email) && !!(o?.phone || o?.email);
}

// POST - Create booking (authenticated user or guest with userData)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createBookingSchema.parse(body);

    let userId: string | null = null;
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      if (!isGuestUserDataValid(validatedData.userData)) {
        return NextResponse.json(
          { error: 'Sign in or provide contact details (name, email, phone) to book as guest' },
          { status: 401 }
        );
      }
      userId = null;
    } else {
      userId = authResult.payload.sub;
    }

    const newBooking = await createBooking({
      ...(userId != null ? { userId } : {}),
      status: 'pending',
      packageId: validatedData.packageId,
      packageType: validatedData.packageType,
      packageSlug: validatedData.packageSlug,
      umrahType: validatedData.umrahType ?? undefined,
      amount: validatedData.amount,
      travelDate: validatedData.travelDate ? new Date(validatedData.travelDate) : undefined,
      returnDate: validatedData.returnDate ? new Date(validatedData.returnDate) : undefined,
      userData: validatedData.userData,
      program: validatedData.program,
      room: validatedData.room,
      visa: validatedData.visa,
    });

    // Append to Google Sheet (online spreadsheet) if configured
    const passengers = Array.isArray(validatedData.userData)
      ? validatedData.userData
      : validatedData.userData
        ? [validatedData.userData]
        : [];
    const passengerRows = passengers.map((p: Record<string, unknown>) => ({
      name: String(p?.name ?? ''),
      lastName: String(p?.lastName ?? ''),
      email: String(p?.email ?? ''),
      phone: String(p?.phone ?? ''),
      healthCondition: String(p?.healthCondition ?? ''),
    }));
    await appendBookingToSheet({
      bookingId: newBooking.id,
      bookingDate: new Date(newBooking.bookingDate).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }),
      packageSlug: validatedData.packageSlug ?? '',
      programName: (validatedData.program as { name?: string } | undefined)?.name ?? '',
      roomName: (validatedData.room as { name?: string } | undefined)?.name ?? '',
      visaName: (validatedData.visa as { name?: string } | undefined)?.name ?? '',
      passengers: passengerRows,
    });

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
