CREATE TYPE "public"."connection_status" AS ENUM('connected', 'disconnected');--> statement-breakpoint
CREATE TABLE "connections" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"name" text NOT NULL,
	"provider" text NOT NULL,
	"settings" jsonb DEFAULT '{}'::jsonb,
	"status" "connection_status" DEFAULT 'disconnected' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"created_by_id" text NOT NULL,
	"updated_by_id" text
);
--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_created_by_id_member_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_updated_by_id_member_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;