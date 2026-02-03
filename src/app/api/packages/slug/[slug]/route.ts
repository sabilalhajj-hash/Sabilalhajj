import { NextRequest, NextResponse } from 'next/server';
import { getPackageBySlug } from '@/lib/db/packages';

// GET - Get package by slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const package_ = await getPackageBySlug(slug);

    if (!package_) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ package: package_ });
  } catch (error) {
    console.error('Error fetching package by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch package' },
      { status: 500 }
    );
  }
}
