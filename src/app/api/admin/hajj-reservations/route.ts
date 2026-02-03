import { NextRequest, NextResponse } from 'next/server';
import { getAllHajjReservations, createHajjReservation } from '@/lib/db/hajj-reservations';
import { requireAdmin } from '@/lib/auth/require-admin';
import { z } from 'zod';

const createHajjReservationSchema = z.object({
  userId: z.string().nullable().optional(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).optional(),
  name: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  passportNumber: z.string().optional(),
  passportExpiry: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  travelDate: z.string().optional(),
  returnDate: z.string().optional(),
  notes: z.string().optional(),
});

// GET - List all Hajj reservations (admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const reservations = await getAllHajjReservations();
    return NextResponse.json({ reservations });
  } catch (error) {
    console.error('Error fetching Hajj reservations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Hajj reservations' },
      { status: 500 }
    );
  }
}

// POST - Create Hajj reservation (admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const body = await request.json();
    const validated = createHajjReservationSchema.parse(body);

    const reservation = await createHajjReservation({
      userId: validated.userId ?? null,
      status: validated.status ?? 'pending',
      name: validated.name,
      lastName: validated.lastName,
      email: validated.email,
      phone: validated.phone ?? undefined,
      nationality: validated.nationality ?? undefined,
      passportNumber: validated.passportNumber ?? undefined,
      passportExpiry: validated.passportExpiry ?? undefined,
      dateOfBirth: validated.dateOfBirth ?? undefined,
      gender: validated.gender ?? undefined,
      travelDate: validated.travelDate ? new Date(validated.travelDate) : undefined,
      returnDate: validated.returnDate ? new Date(validated.returnDate) : undefined,
      notes: validated.notes ?? undefined,
    });

    return NextResponse.json({ reservation }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error creating Hajj reservation:', error);
    return NextResponse.json(
      { error: 'Failed to create Hajj reservation' },
      { status: 500 }
    );
  }
}
