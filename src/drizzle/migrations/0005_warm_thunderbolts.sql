CREATE TABLE "services_usage" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text,
	"service_name" text NOT NULL,
	"usage" text NOT NULL,
	"unit" text NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "services_usage" ADD CONSTRAINT "services_usage_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;