import { NextRequest, NextResponse } from 'next/server';
import { getHajjReservationById, updateHajjReservation, deleteHajjReservation } from '@/lib/db/hajj-reservations';
import { requireAdmin } from '@/lib/auth/require-admin';
import { z } from 'zod';

const updateHajjReservationSchema = z.object({
  userId: z.string().nullable().optional(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).optional(),
  name: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  passportNumber: z.string().optional(),
  passportExpiry: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  travelDate: z.string().nullable().optional(),
  returnDate: z.string().nullable().optional(),
  notes: z.string().optional(),
});

// GET - Get single Hajj reservation (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = await params;
    const reservation = await getHajjReservationById(id);

    if (!reservation) {
      return NextResponse.json(
        { error: 'Hajj reservation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ reservation });
  } catch (error) {
    console.error('Error fetching Hajj reservation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Hajj reservation' },
      { status: 500 }
    );
  }
}

// PUT - Update Hajj reservation (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = await params;
    const body = await request.json();
    const validated = updateHajjReservationSchema.parse(body);
    const { travelDate: td, returnDate: rd, ...rest } = validated;

    const reservation = await updateHajjReservation(id, {
      ...rest,
      userId: rest.userId ?? undefined,
      travelDate: td != null && td ? new Date(td) : undefined,
      returnDate: rd != null && rd ? new Date(rd) : undefined,
    });
    return NextResponse.json({ reservation });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error updating Hajj reservation:', error);
    return NextResponse.json(
      { error: 'Failed to update Hajj reservation' },
      { status: 500 }
    );
  }
}

// DELETE - Delete Hajj reservation (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = await params;
    await deleteHajjReservation(id);
    return NextResponse.json({ message: 'Hajj reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting Hajj reservation:', error);
    return NextResponse.json(
      { error: 'Failed to delete Hajj reservation' },
      { status: 500 }
    );
  }
}
