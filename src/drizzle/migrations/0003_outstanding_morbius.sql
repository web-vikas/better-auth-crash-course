ALTER TABLE "organization" ADD COLUMN "website" text;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "owner_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "organization_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "mail_address" text;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_organization_email_unique" UNIQUE("organization_email");