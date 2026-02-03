import { pgTable, text, timestamp, boolean, varchar, index, jsonb } from 'drizzle-orm/pg-core';
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
    avatar: varchar('avatar', { length: 500 }),
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

// Umrah collective packages (admin can add via dashboard)
export const umrahPackages = pgTable(
  'umrah_packages',
  {
    id: text('id').primaryKey().$defaultFn(() => randomUUID()),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    image: varchar('image', { length: 500 }),
    country: varchar('country', { length: 255 }),
    description: text('description'),
    duration: varchar('duration', { length: 100 }),
    departure: varchar('departure', { length: 100 }),
    returnDate: varchar('return_date', { length: 100 }),
    from: varchar('from', { length: 255 }),
    to: varchar('to', { length: 255 }),
    highlights: jsonb('highlights'),
    includes: jsonb('includes'),
    features: jsonb('features'),
    programs: jsonb('programs'),
    rooms: jsonb('rooms'),
    visas: jsonb('visas'),
    itinerary: jsonb('itinerary'),
    isActive: boolean('is_active').default(true).notNull(),
    isPremium: boolean('is_premium').default(false).notNull(),
    umrahType: varchar('umrah_type', { length: 50 }), // 'collective' | 'personalized'
    badge: varchar('badge', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index('slug_idx').on(table.slug),
    countryIdx: index('country_idx').on(table.country),
    isActiveIdx: index('is_active_idx').on(table.isActive),
  })
);

export type UmrahPackage = typeof umrahPackages.$inferSelect;
export type NewUmrahPackage = typeof umrahPackages.$inferInsert;

// Bookings (user selections - admin can validate; userId null = guest booking)
export const bookings = pgTable(
  'bookings',
  {
    id: text('id').primaryKey().$defaultFn(() => randomUUID()),
    userId: text('user_id'), // null = guest (non-user) booking
    packageId: text('package_id'),
    packageType: varchar('package_type', { length: 255 }),
    packageSlug: varchar('package_slug', { length: 255 }),
    umrahType: varchar('umrah_type', { length: 50 }), // 'collective' | 'personalized' for Umrah bookings
    status: varchar('status', { length: 50 }).default('pending').notNull(),
    amount: varchar('amount', { length: 100 }),
    bookingDate: timestamp('booking_date').defaultNow().notNull(),
    travelDate: timestamp('travel_date'),
    returnDate: timestamp('return_date'),
    userData: jsonb('user_data'),
    program: jsonb('program'),
    room: jsonb('room'),
    visa: jsonb('visa'),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('booking_user_id_idx').on(table.userId),
    packageIdIdx: index('booking_package_id_idx').on(table.packageId),
    statusIdx: index('booking_status_idx').on(table.status),
    bookingDateIdx: index('booking_date_idx').on(table.bookingDate),
  })
);

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

// Hajj reservations (admin adds manually for Nusuk booking; guest or linked user)
export const hajjReservations = pgTable(
  'hajj_reservations',
  {
    id: text('id').primaryKey().$defaultFn(() => randomUUID()),
    userId: text('user_id'), // null = guest
    status: varchar('status', { length: 50 }).default('pending').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 50 }),
    nationality: varchar('nationality', { length: 100 }),
    passportNumber: varchar('passport_number', { length: 100 }),
    passportExpiry: varchar('passport_expiry', { length: 20 }),
    dateOfBirth: varchar('date_of_birth', { length: 20 }),
    gender: varchar('gender', { length: 20 }),
    travelDate: timestamp('travel_date'),
    returnDate: timestamp('return_date'),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('hajj_reservation_user_id_idx').on(table.userId),
    statusIdx: index('hajj_reservation_status_idx').on(table.status),
    createdAtIdx: index('hajj_reservation_created_at_idx').on(table.createdAt),
  })
);

export type HajjReservation = typeof hajjReservations.$inferSelect;
export type NewHajjReservation = typeof hajjReservations.$inferInsert;

// Site-wide settings (e.g. WhatsApp number for contact) – editable from admin dashboard
export const siteSettings = pgTable('site_settings', {
  key: varchar('key', { length: 100 }).primaryKey(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewSiteSetting = typeof siteSettings.$inferInsert;
