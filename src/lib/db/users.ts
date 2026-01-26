import { eq, or, desc } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { db } from './index';
import { users, type User, type NewUser } from './schema';
import { hashPassword, verifyPassword } from '../auth/password';

export async function createUser(userData: Omit<NewUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const hashedPassword = await hashPassword(userData.password);
  
  const [user] = await db
    .insert(users)
    .values({
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return user;
}

export async function createOAuthUser(userData: Omit<NewUser, 'id' | 'password' | 'createdAt' | 'updatedAt'>): Promise<User> {
  // Generate a random password for OAuth users (they won't use it)
  const randomPassword = randomUUID() + randomUUID();
  const hashedPassword = await hashPassword(randomPassword);
  
  const [user] = await db
    .insert(users)
    .values({
      ...userData,
      password: hashedPassword,
      emailVerified: true, // OAuth emails are verified
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return user || null;
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
  return user || null;
}

export async function getUserByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(or(eq(users.email, emailOrUsername), eq(users.username, emailOrUsername)))
    .limit(1);
  return user || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user || null;
}

export async function verifyUserPassword(emailOrUsername: string, password: string): Promise<User | null> {
  const user = await getUserByEmailOrUsername(emailOrUsername);
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return null;
  }

  return user;
}

export async function updateUser(id: string, userData: Partial<Omit<NewUser, 'id' | 'createdAt'>>): Promise<User> {
  const [updatedUser] = await db
    .update(users)
    .set({
      ...userData,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning();

  return updatedUser;
}

export async function deleteUser(id: string): Promise<void> {
  await db.delete(users).where(eq(users.id, id));
}

export type UserListItem = Pick<User, 'id' | 'email' | 'name' | 'lastName' | 'role' | 'createdAt'>;

export async function listUsers(): Promise<UserListItem[]> {
  const rows = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      lastName: users.lastName,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt));
  return rows;
}
