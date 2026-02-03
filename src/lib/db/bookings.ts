import { eq, and, desc, or, like, sql } from 'drizzle-orm';
import { db } from './index';
import { bookings, type Booking, type NewBooking } from './schema';
import { users, umrahPackages } from './schema';

export type UmrahBookingsByPackageRow = { packageSlug: string; packageName: string | null; count: number };

/** Umrah bookings grouped by package (packageSlug + package name from umrah_packages). */
export async function getUmrahBookingsByPackage(): Promise<UmrahBookingsByPackageRow[]> {
  const rows = await db
    .select({
      packageSlug: bookings.packageSlug,
      packageName: umrahPackages.name,
      count: sql<number>`count(*)::int`,
    })
    .from(bookings)
    .leftJoin(umrahPackages, eq(bookings.packageSlug, umrahPackages.slug))
    .where(eq(bookings.packageType, 'umrah'))
    .groupBy(bookings.packageSlug, umrahPackages.name);

  return rows
    .filter((r) => r.packageSlug != null)
    .map((r) => ({
      packageSlug: r.packageSlug!,
      packageName: r.packageName ?? null,
      count: r.count,
    }));
}

export async function getAllBookings(filters?: {
  status?: string;
  search?: string;
  limit?: number;
}): Promise<(Booking & { userName?: string; userEmail?: string; userFirstName?: string; userLastName?: string; userPhone?: string; packageName?: string })[]> {
  let query = db
    .select({
      booking: bookings,
      userName: users.name,
      userEmail: users.email,
      userFirstName: users.name,
      userLastName: users.lastName,
      userPhone: users.phone,
      packageName: umrahPackages.name,
    })
    .from(bookings)
    .leftJoin(users, eq(bookings.userId, users.id))
    .leftJoin(umrahPackages, eq(bookings.packageSlug, umrahPackages.slug));

  const conditions = [];
  if (filters?.status) {
    conditions.push(eq(bookings.status, filters.status));
  }
  if (filters?.search) {
    const searchPattern = `%${filters.search}%`;
    conditions.push(
      or(
        like(bookings.packageType, searchPattern),
        like(users.email, searchPattern),
        like(users.name, searchPattern),
        sql`(${bookings.userData}::text ilike ${searchPattern})`
      )!
    );
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  const results = await query.orderBy(desc(bookings.bookingDate)).limit(filters?.limit || 100);

  return results.map((r) => {
    const booking = r.booking;
    let userName = r.userName ?? undefined;
    let userEmail = r.userEmail ?? undefined;
    let userFirstName = r.userFirstName ?? undefined;
    let userLastName = r.userLastName ?? undefined;
    let userPhone = r.userPhone ?? undefined;
    if (!userEmail && booking.userData) {
      const data = Array.isArray(booking.userData) ? (booking.userData as { name?: string; lastName?: string; email?: string; phone?: string }[])[0] : (booking.userData as { name?: string; lastName?: string; email?: string; phone?: string });
      if (data) {
        userFirstName = data.name ?? undefined;
        userLastName = data.lastName ?? undefined;
        userEmail = data.email ?? undefined;
        userPhone = data.phone ?? undefined;
        userName = [data.name, data.lastName].filter(Boolean).join(' ') || undefined;
      }
    }
    return {
      ...booking,
      userName,
      userEmail,
      userFirstName,
      userLastName,
      userPhone,
      packageName: r.packageName ?? undefined,
    };
  });
}

export async function getBookingById(id: string): Promise<(Booking & { userName?: string; userEmail?: string; userFirstName?: string; userLastName?: string; userPhone?: string; packageName?: string }) | null> {
  const [result] = await db
    .select({
      booking: bookings,
      userName: users.name,
      userEmail: users.email,
      userFirstName: users.name,
      userLastName: users.lastName,
      userPhone: users.phone,
      packageName: umrahPackages.name,
    })
    .from(bookings)
    .leftJoin(users, eq(bookings.userId, users.id))
    .leftJoin(umrahPackages, eq(bookings.packageSlug, umrahPackages.slug))
    .where(eq(bookings.id, id))
    .limit(1);

  if (!result) return null;

  const booking = result.booking;
  let userName = result.userName ?? undefined;
  let userEmail = result.userEmail ?? undefined;
  let userFirstName = result.userFirstName ?? undefined;
  let userLastName = result.userLastName ?? undefined;
  let userPhone = result.userPhone ?? undefined;
  if (!userEmail && booking.userData) {
    const data = Array.isArray(booking.userData) ? (booking.userData as { name?: string; lastName?: string; email?: string; phone?: string }[])[0] : (booking.userData as { name?: string; lastName?: string; email?: string; phone?: string });
    if (data) {
      userFirstName = data.name ?? undefined;
      userLastName = data.lastName ?? undefined;
      userEmail = data.email ?? undefined;
      userPhone = data.phone ?? undefined;
      userName = [data.name, data.lastName].filter(Boolean).join(' ') || undefined;
    }
  }
  return {
    ...booking,
    userName,
    userEmail,
    userFirstName,
    userLastName,
    userPhone,
    packageName: result.packageName ?? undefined,
  };
}

export async function createBooking(bookingData: NewBooking): Promise<Booking> {
  const [newBooking] = await db
    .insert(bookings)
    .values({
      ...bookingData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  return newBooking;
}

export async function updateBooking(id: string, bookingData: Partial<Omit<NewBooking, 'id' | 'createdAt'>>): Promise<Booking> {
  const [updatedBooking] = await db
    .update(bookings)
    .set({
      ...bookingData,
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, id))
    .returning();
  return updatedBooking;
}

export async function deleteBooking(id: string): Promise<void> {
  await db.delete(bookings).where(eq(bookings.id, id));
}

export async function getBookingsByUserId(userId: string): Promise<Booking[]> {
  return await db
    .select()
    .from(bookings)
    .where(eq(bookings.userId, userId))
    .orderBy(desc(bookings.bookingDate));
}

export async function getBookingStats() {
  const [stats] = await db
    .select({
      totalBookings: sql<number>`count(*)::int`,
      pendingBookings: sql<number>`count(*) filter (where ${bookings.status} = 'pending')::int`,
      approvedBookings: sql<number>`count(*) filter (where ${bookings.status} = 'approved')::int`,
      completedBookings: sql<number>`count(*) filter (where ${bookings.status} = 'completed')::int`,
      cancelledBookings: sql<number>`count(*) filter (where ${bookings.status} = 'cancelled')::int`,
      totalRevenue: sql<number>`coalesce(sum(cast(replace(${bookings.amount}, '$', '') as numeric)), 0)::int`,
    })
    .from(bookings);

  return stats;
}
