-- Add profile avatar URL to users table
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "avatar" varchar(500);
