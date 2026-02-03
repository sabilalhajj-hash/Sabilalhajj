import { eq, desc } from 'drizzle-orm';
import { db } from './index';
import { hajjReservations, type HajjReservation, type NewHajjReservation } from './schema';
import { users } from './schema';

export type HajjReservationWithUser = HajjReservation & {
  userEmail?: string | null;
  userName?: string | null;
  userLastName?: string | null;
};

export async function getAllHajjReservations(): Promise<HajjReservationWithUser[]> {
  const results = await db
    .select({
      reservation: hajjReservations,
      userEmail: users.email,
      userName: users.name,
      userLastName: users.lastName,
    })
    .from(hajjReservations)
    .leftJoin(users, eq(hajjReservations.userId, users.id))
    .orderBy(desc(hajjReservations.createdAt));

  return results.map((r) => ({
    ...r.reservation,
    userEmail: r.userEmail ?? undefined,
    userName: r.userName ?? undefined,
    userLastName: r.userLastName ?? undefined,
  }));
}

export async function getHajjReservationById(id: string): Promise<HajjReservationWithUser | null> {
  const [result] = await db
    .select({
      reservation: hajjReservations,
      userEmail: users.email,
      userName: users.name,
      userLastName: users.lastName,
    })
    .from(hajjReservations)
    .leftJoin(users, eq(hajjReservations.userId, users.id))
    .where(eq(hajjReservations.id, id))
    .limit(1);

  if (!result) return null;
  return {
    ...result.reservation,
    userEmail: result.userEmail ?? undefined,
    userName: result.userName ?? undefined,
    userLastName: result.userLastName ?? undefined,
  };
}

export async function createHajjReservation(data: NewHajjReservation): Promise<HajjReservation> {
  const [row] = await db
    .insert(hajjReservations)
    .values({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  return row;
}

export async function updateHajjReservation(
  id: string,
  data: Partial<Omit<NewHajjReservation, 'id' | 'createdAt'>>
): Promise<HajjReservation> {
  const [row] = await db
    .update(hajjReservations)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(hajjReservations.id, id))
    .returning();
  return row;
}

export async function deleteHajjReservation(id: string): Promise<void> {
  await db.delete(hajjReservations).where(eq(hajjReservations.id, id));
}
