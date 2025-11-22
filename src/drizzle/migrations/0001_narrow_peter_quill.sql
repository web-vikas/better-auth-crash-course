ALTER TABLE "subscription" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "subscription" CASCADE;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "stripe_customer_id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "favorite_number";