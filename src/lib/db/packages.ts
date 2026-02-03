import { eq, and, or, desc, isNull } from 'drizzle-orm';
import { db } from './index';
import { umrahPackages, type UmrahPackage, type NewUmrahPackage } from './schema';

export async function getAllPackages(
  country?: string,
  includeInactive = false,
  umrahType?: 'collective' | 'personalized'
): Promise<UmrahPackage[]> {
  const conditions = [];
  if (!includeInactive) {
    conditions.push(eq(umrahPackages.isActive, true));
  }
  if (country) {
    conditions.push(eq(umrahPackages.country, country));
  }
  if (umrahType === 'collective') {
    conditions.push(or(eq(umrahPackages.umrahType, 'collective'), isNull(umrahPackages.umrahType))!);
  } else if (umrahType === 'personalized') {
    conditions.push(eq(umrahPackages.umrahType, 'personalized'));
  }

  if (conditions.length > 0) {
    return await db
      .select()
      .from(umrahPackages)
      .where(and(...conditions))
      .orderBy(desc(umrahPackages.createdAt));
  }
  return await db
    .select()
    .from(umrahPackages)
    .orderBy(desc(umrahPackages.createdAt));
}

export async function getPackageById(id: string): Promise<UmrahPackage | null> {
  const [package_] = await db
    .select()
    .from(umrahPackages)
    .where(eq(umrahPackages.id, id))
    .limit(1);
  return package_ || null;
}

export async function getPackageBySlug(slug: string): Promise<UmrahPackage | null> {
  const [package_] = await db
    .select()
    .from(umrahPackages)
    .where(eq(umrahPackages.slug, slug))
    .limit(1);
  return package_ || null;
}

export async function createPackage(packageData: NewUmrahPackage): Promise<UmrahPackage> {
  const [newPackage] = await db
    .insert(umrahPackages)
    .values({
      ...packageData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  return newPackage;
}

export async function updatePackage(id: string, packageData: Partial<Omit<NewUmrahPackage, 'id' | 'createdAt'>>): Promise<UmrahPackage> {
  const [updatedPackage] = await db
    .update(umrahPackages)
    .set({
      ...packageData,
      updatedAt: new Date(),
    })
    .where(eq(umrahPackages.id, id))
    .returning();
  return updatedPackage;
}

export async function deletePackage(id: string): Promise<void> {
  await db.delete(umrahPackages).where(eq(umrahPackages.id, id));
}
