import { NextRequest, NextResponse } from 'next/server';
import { getAllPackages, createPackage } from '@/lib/db/packages';
import { requireAdmin } from '@/lib/auth/require-admin';
import { z } from 'zod';

const packageSchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1),
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
  programs: z.any().optional(), // JSON
  rooms: z.any().optional(), // JSON
  visas: z.any().optional(), // JSON
  itinerary: z.any().optional(), // JSON
  isActive: z.boolean().optional(),
  isPremium: z.boolean().optional(),
  badge: z.string().optional(),
});

// GET - List all packages (public, filtered by country if provided)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || undefined;
    const includeInactive = searchParams.get('includeInactive') === 'true';
    const type = searchParams.get('type') as 'collective' | 'personalized' | null;
    const umrahType = type === 'collective' || type === 'personalized' ? type : undefined;

    // Check if user is admin for includeInactive
    let isAdmin = false;
    if (includeInactive) {
      const authResult = await requireAdmin(request);
      if (authResult instanceof NextResponse) {
        return authResult; // Not admin or not authenticated
      }
      isAdmin = true;
    }

    const packages = await getAllPackages(country, isAdmin && includeInactive, umrahType);
    return NextResponse.json({ packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}

// POST - Create new package (admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult; // Error response
    }

    const body = await request.json();
    const validatedData = packageSchema.parse(body);

    // Auto-generate slug from name if not provided
    const slug =
      validatedData.slug ||
      validatedData.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

    const newPackage = await createPackage({
      ...validatedData,
      slug,
      umrahType: validatedData.umrahType ?? undefined,
    });
    return NextResponse.json({ package: newPackage }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error creating package:', error);
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    );
  }
}
