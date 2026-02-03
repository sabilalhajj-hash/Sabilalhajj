import { NextRequest, NextResponse } from 'next/server';
import { getPackageById, updatePackage, deletePackage } from '@/lib/db/packages';
import { requireAdmin } from '@/lib/auth/require-admin';
import { z } from 'zod';

const updatePackageSchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  image: z.string().optional(),
  umrahType: z.enum(['collective', 'personalized']).optional(),
  country: z.string().optional(),
  description: z.string().optional(),
  duration: z.string().optional(),
  departure: z.string().optional(),
  returnDate: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  includes: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  programs: z.any().optional(),
  rooms: z.any().optional(),
  visas: z.any().optional(),
  itinerary: z.any().optional(),
  isActive: z.boolean().optional(),
  isPremium: z.boolean().optional(),
  badge: z.string().optional(),
});

// GET - Get single package (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const package_ = await getPackageById(id);

    if (!package_) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ package: package_ });
  } catch (error) {
    console.error('Error fetching package:', error);
    return NextResponse.json(
      { error: 'Failed to fetch package' },
      { status: 500 }
    );
  }
}

// PUT - Update package (admin only)
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
    const validatedData = updatePackageSchema.parse(body);

    const updatedPackage = await updatePackage(id, validatedData);
    return NextResponse.json({ package: updatedPackage });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error updating package:', error);
    return NextResponse.json(
      { error: 'Failed to update package' },
      { status: 500 }
    );
  }
}

// DELETE - Delete package (admin only)
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
    await deletePackage(id);
    return NextResponse.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json(
      { error: 'Failed to delete package' },
      { status: 500 }
    );
  }
}
