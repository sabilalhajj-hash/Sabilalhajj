import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { getBookingStats, getUmrahBookingsByPackage } from '@/lib/db/bookings';
import { listUsers } from '@/lib/db/users';
import { getAllPackages } from '@/lib/db/packages';
import { db } from '@/lib/db';
import { bookings } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

// GET - Get admin dashboard stats (admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    // Get booking stats
    const bookingStats = await getBookingStats();

    // Get user stats
    const allUsers = await listUsers();
    const activeUsers = allUsers.length;
    const totalUsers = allUsers.length;

    // Get package stats
    const allPackages = await getAllPackages(undefined, true);
    const totalPackages = allPackages.length;

    // Umrah bookings grouped by package (for chart)
    const umrahBookingsByPackage = await getUmrahBookingsByPackage();

    // Bookings by status (for pending chart: pending, approved, completed, cancelled)
    const [statusRows] = await db
      .select({
        pending: sql<number>`count(*) filter (where ${bookings.status} = 'pending')::int`,
        approved: sql<number>`count(*) filter (where ${bookings.status} = 'approved')::int`,
        completed: sql<number>`count(*) filter (where ${bookings.status} = 'completed')::int`,
        cancelled: sql<number>`count(*) filter (where ${bookings.status} = 'cancelled')::int`,
      })
      .from(bookings);

    const stats = {
      totalUsers,
      activeUsers,
      totalBookings: bookingStats.totalBookings || 0,
      pendingBookings: bookingStats.pendingBookings || 0,
      totalRevenue: bookingStats.totalRevenue || 0,
      cancelledBookings: bookingStats.cancelledBookings || 0,
      totalPackages,
      umrahBookingsByPackage,
      bookingsByStatus: statusRows
        ? {
            pending: statusRows.pending ?? 0,
            approved: statusRows.approved ?? 0,
            completed: statusRows.completed ?? 0,
            cancelled: statusRows.cancelled ?? 0,
          }
        : { pending: 0, approved: 0, completed: 0, cancelled: 0 },
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
