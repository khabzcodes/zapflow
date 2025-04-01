CREATE TYPE "public"."hear_about_us" AS ENUM('social_media', 'search_engine', 'other');--> statement-breakpoint
CREATE TABLE "wait_list" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"is_organization" boolean DEFAULT false NOT NULL,
	"organization" text,
	"hear_about_us" "hear_about_us" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
