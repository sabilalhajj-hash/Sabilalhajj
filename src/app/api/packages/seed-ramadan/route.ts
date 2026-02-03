import { NextRequest, NextResponse } from 'next/server';
import { getPackageBySlug, createPackage, updatePackage } from '@/lib/db/packages';
import { requireAdmin } from '@/lib/auth/require-admin';

const RAMADAN_SLUG = 'ramadan-umrah-2026';

// Static Ramadan Umrah package data (from CollectivePlanClient / en locale)
const RAMADAN_SEED = {
  slug: RAMADAN_SLUG,
  name: 'Ramadan Umrah Package',
  description: 'Experience the blessed month of Ramadan in the holy cities. Spiritual journey with programs, accommodation, and visa options.',
  image: '/hajj1.jpg',
  umrahType: 'collective' as const,
  isActive: true,
  programs: [
    {
      id: 'ramadan-journey',
      name: 'Ramadan Journey',
      ApproximateDuration: '15 Days',
      departure: 'March 1, 2024',
      return: 'March 15, 2024',
      from: 'Casablanca',
      to: 'Mecca & Medina',
      description: 'Experience the blessed month of Ramadan in the holy cities. Join us for a spiritual journey filled with Taraweeh prayers, Iftar gatherings, and blessed moments in the Haram.',
      highlights: ['Taraweeh Prayers in Haram', 'Iftar in Holy Sites', 'Ramadan Nights Activities', 'Spiritual Guidance'],
      includes: ['Flights', 'Accommodation', 'Meals', 'Transportation', 'Guide', 'Visa'],
    },
    {
      id: 'ramadan-last-ten',
      name: 'Ramadan Last Ten',
      ApproximateDuration: '12 Days',
      departure: 'April 1, 2024',
      return: 'April 12, 2024',
      from: 'Casablanca',
      to: 'Mecca & Medina',
      description: 'Experience the most blessed nights of Ramadan in the holy cities. Join the worshippers during Laylatul Qadr and the last ten days of Ramadan.',
      highlights: ['Laylatul Qadr Nights', 'Last Ten Days of Ramadan', 'Special Iftar Programs', 'Night Prayers'],
      includes: ['Flights', 'Accommodation', 'Meals', 'Transportation', 'Guide', 'Visa'],
    },
    {
      id: 'long-stay',
      name: 'Long Stay Umrah',
      ApproximateDuration: '30 Days',
      departure: 'May 1, 2024',
      return: 'May 30, 2024',
      from: 'Casablanca',
      to: 'Mecca & Medina',
      description: 'Extended stay program for those wishing to spend more time in worship and learning in the holy cities. Perfect for deep spiritual reflection.',
      highlights: ['Extended Worship Time', 'Islamic Studies', 'Community Activities', 'Spiritual Retreat'],
      includes: ['Flights', 'Accommodation', 'Meals', 'Transportation', 'Guide', 'Visa', 'Study Materials'],
    },
  ],
  rooms: [
    {
      id: 'twin',
      name: 'Twin Room',
      size: '25 sqm',
      description: 'Comfortable twin room perfect for two pilgrims sharing accommodation.',
      features: ['Air Conditioning', 'Private Bathroom', 'WiFi', 'Mini Fridge'],
      capacity: '2 Persons',
      view: 'City View',
      amenities: ['Prayer Mat', 'Quran', 'Hot Water', 'Room Service'],
    },
    {
      id: 'triple',
      name: 'Triple Room',
      size: '35 sqm',
      description: 'Spacious triple room ideal for three pilgrims traveling together.',
      features: ['Air Conditioning', 'Private Bathroom', 'WiFi', 'Mini Fridge', 'Extra Bed'],
      capacity: '3 Persons',
      view: 'City View',
      amenities: ['Prayer Mats', 'Quran', 'Hot Water', 'Room Service', 'Extra Towels'],
    },
    {
      id: 'quad',
      name: 'Quad Room',
      size: '45 sqm',
      description: 'Spacious quad room perfect for four pilgrims sharing accommodation.',
      features: ['Air Conditioning', 'Private Bathroom', 'WiFi', 'Mini Fridge', 'Sitting Area'],
      capacity: '4 Persons',
      view: 'City View',
      amenities: ['Prayer Mats', 'Quran', 'Hot Water', 'Room Service', 'Extra Towels', 'Coffee Table'],
    },
    {
      id: 'penta',
      name: 'Penta Room',
      size: '55 sqm',
      description: 'Luxurious penta room ideal for five pilgrims with extra comfort and space.',
      features: ['Air Conditioning', 'Private Bathroom', 'WiFi', 'Mini Fridge', 'Sitting Area', 'Balcony'],
      capacity: '5 Persons',
      view: 'City View',
      amenities: ['Prayer Mats', 'Quran', 'Hot Water', 'Room Service', 'Extra Towels', 'Coffee Table', 'Balcony Access'],
    },
  ],
  visas: [
    {
      id: 'umrah',
      name: 'Umrah Visa',
      detail: 'Dedicated visa for religious pilgrimage',
      description: 'Official Umrah visa for performing religious rituals in Mecca and Medina.',
      validity: '90 Days',
      stay_duration: '30 Days',
      processing_time: '3-5 Business Days',
      requirements: ['Valid Passport', 'Application Form', 'Medical Certificate', 'Hotel Booking', 'Flight Tickets'],
      benefits: ['Religious Activities', 'Extended Stay', 'Group Activities', 'Guided Tours'],
    },
    {
      id: 'tourist',
      name: 'Tourist Visa',
      detail: 'General purpose tourist visa',
      description: 'Standard tourist visa for visiting Saudi Arabia with flexible travel options.',
      validity: '90 Days',
      stay_duration: '15 Days',
      processing_time: '2-3 Business Days',
      requirements: ['Valid Passport', 'Application Form', 'Hotel Booking', 'Bank Statements', 'Employment Letter'],
      benefits: ['Flexible Travel', 'Sightseeing', 'Cultural Experience', 'Modern Amenities'],
    },
  ],
};

// POST - Seed or update Ramadan Umrah package (admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const existing = await getPackageBySlug(RAMADAN_SLUG);

    if (existing) {
      const updated = await updatePackage(existing.id, {
        name: RAMADAN_SEED.name,
        description: RAMADAN_SEED.description,
        image: RAMADAN_SEED.image,
        umrahType: RAMADAN_SEED.umrahType,
        isActive: RAMADAN_SEED.isActive,
        programs: RAMADAN_SEED.programs,
        rooms: RAMADAN_SEED.rooms,
        visas: RAMADAN_SEED.visas,
      });
      return NextResponse.json({
        message: 'Ramadan Umrah package updated with seed data',
        package: updated,
      });
    }

    const created = await createPackage({
      slug: RAMADAN_SEED.slug,
      name: RAMADAN_SEED.name,
      description: RAMADAN_SEED.description,
      image: RAMADAN_SEED.image,
      umrahType: RAMADAN_SEED.umrahType,
      isActive: RAMADAN_SEED.isActive,
      programs: RAMADAN_SEED.programs,
      rooms: RAMADAN_SEED.rooms,
      visas: RAMADAN_SEED.visas,
    });
    return NextResponse.json(
      {
        message: 'Ramadan Umrah package created with seed data',
        package: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error seeding Ramadan package:', error);
    return NextResponse.json(
      { error: 'Failed to seed Ramadan Umrah package' },
      { status: 500 }
    );
  }
}
