CREATE TABLE "bookings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"package_id" text,
	"package_type" varchar(255),
	"package_slug" varchar(255),
	"umrah_type" varchar(50),
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"amount" varchar(100),
	"booking_date" timestamp DEFAULT now() NOT NULL,
	"travel_date" timestamp,
	"return_date" timestamp,
	"user_data" jsonb,
	"program" jsonb,
	"room" jsonb,
	"visa" jsonb,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hajj_reservations" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"nationality" varchar(100),
	"passport_number" varchar(100),
	"passport_expiry" varchar(20),
	"date_of_birth" varchar(20),
	"gender" varchar(20),
	"travel_date" timestamp,
	"return_date" timestamp,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "umrah_packages" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" varchar(500),
	"country" varchar(255),
	"description" text,
	"duration" varchar(100),
	"departure" varchar(100),
	"return_date" varchar(100),
	"from" varchar(255),
	"to" varchar(255),
	"highlights" jsonb,
	"includes" jsonb,
	"features" jsonb,
	"programs" jsonb,
	"rooms" jsonb,
	"visas" jsonb,
	"itinerary" jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_premium" boolean DEFAULT false NOT NULL,
	"umrah_type" varchar(50),
	"badge" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "umrah_packages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"username" varchar(255),
	"password" text NOT NULL,
	"name" varchar(255),
	"last_name" varchar(255),
	"phone" varchar(50),
	"role" varchar(50) DEFAULT 'user' NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE INDEX "booking_user_id_idx" ON "bookings" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "booking_package_id_idx" ON "bookings" USING btree ("package_id");--> statement-breakpoint
CREATE INDEX "booking_status_idx" ON "bookings" USING btree ("status");--> statement-breakpoint
CREATE INDEX "booking_date_idx" ON "bookings" USING btree ("booking_date");--> statement-breakpoint
CREATE INDEX "hajj_reservation_user_id_idx" ON "hajj_reservations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "hajj_reservation_status_idx" ON "hajj_reservations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "hajj_reservation_created_at_idx" ON "hajj_reservations" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "slug_idx" ON "umrah_packages" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "country_idx" ON "umrah_packages" USING btree ("country");--> statement-breakpoint
CREATE INDEX "is_active_idx" ON "umrah_packages" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "role_idx" ON "users" USING btree ("role");