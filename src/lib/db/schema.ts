import { pgTable, text, timestamp, boolean, varchar, index } from 'drizzle-orm/pg-core';
import { randomUUID } from 'crypto';

export const users = pgTable(
  'users',
  {
    id: text('id').primaryKey().$defaultFn(() => randomUUID()),
    email: varchar('email', { length: 255 }).notNull().unique(),
    username: varchar('username', { length: 255 }).unique(),
    password: text('password').notNull(), // Will be hashed
    name: varchar('name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    phone: varchar('phone', { length: 50 }),
    role: varchar('role', { length: 50 }).default('user').notNull(), // 'user' or 'admin'
    emailVerified: boolean('email_verified').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index('email_idx').on(table.email),
    usernameIdx: index('username_idx').on(table.username),
    roleIdx: index('role_idx').on(table.role),
  })
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
