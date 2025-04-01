CREATE TYPE "public"."hear_about_us" AS ENUM('social_media', 'search_engine', 'other');--> statement-breakpoint
ALTER TABLE "wait_list" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "wait_list" ADD COLUMN "organization" text;--> statement-breakpoint
ALTER TABLE "wait_list" ADD COLUMN "hear_about_us" "hear_about_us" NOT NULL;