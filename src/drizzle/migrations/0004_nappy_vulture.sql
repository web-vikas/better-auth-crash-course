ALTER TABLE "organization" DROP CONSTRAINT "organization_organization_email_unique";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "website";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "owner_name";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "organization_email";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "mail_address";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "phone";