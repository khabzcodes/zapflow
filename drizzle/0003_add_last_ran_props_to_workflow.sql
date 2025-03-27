ALTER TABLE "workflows" ADD COLUMN "last_run_id" text;--> statement-breakpoint
ALTER TABLE "workflows" ADD COLUMN "last_run_at" timestamp;--> statement-breakpoint
ALTER TABLE "workflows" ADD COLUMN "last_run_status" text;