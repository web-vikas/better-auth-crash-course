CREATE TABLE "role_play_prompt_variable" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" serial NOT NULL,
	"description" text,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "role_play_prompt_variable_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "role_play_prompt_block" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"prompt_text" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_play_prompt_block_to_role_play_prompt" (
	"block_id" text NOT NULL,
	"prompt_id" text NOT NULL,
	CONSTRAINT "role_play_prompt_block_to_role_play_prompt_block_id_prompt_id_pk" PRIMARY KEY("block_id","prompt_id")
);
--> statement-breakpoint
CREATE TABLE "role_play_prompt_block_to_role_play_prompt_variable" (
	"block_id" text NOT NULL,
	"variable_id" text NOT NULL,
	CONSTRAINT "role_play_prompt_block_to_role_play_prompt_variable_block_id_variable_id_pk" PRIMARY KEY("block_id","variable_id")
);
--> statement-breakpoint
CREATE TABLE "role_play_prompt_variable_option" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"value" text DEFAULT '' NOT NULL,
	"role_play_prompt_variable_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "system_prompt" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"prompt_code" text NOT NULL,
	"prompt_text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "system_prompt_prompt_code_unique" UNIQUE("prompt_code")
);
--> statement-breakpoint
CREATE TABLE "avatar" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"display_name" text NOT NULL,
	"provider" text NOT NULL,
	"provider_id" text NOT NULL,
	"variant_name" text NOT NULL,
	"gender" text DEFAULT 'male' NOT NULL,
	"image_url" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_play_prompt" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"cover_image" text,
	"cover_image_alt_text" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_play_prompt_to_organizations" (
	"role_play_prompt_id" text NOT NULL,
	"organization_id" text NOT NULL,
	CONSTRAINT "role_play_prompt_to_organizations_role_play_prompt_id_organization_id_pk" PRIMARY KEY("role_play_prompt_id","organization_id")
);
--> statement-breakpoint
CREATE TABLE "prompt_knowledge_base" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"file_url" text NOT NULL,
	"file_format" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voice" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"provider" text NOT NULL,
	"provider_id" text NOT NULL,
	"variant_name" text NOT NULL,
	"sample_url" text,
	"gender" text DEFAULT 'male' NOT NULL,
	"language" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assessment_criteria" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assessment_criteria_to_organizations" (
	"assessment_criteria_id" text NOT NULL,
	"organization_id" text NOT NULL,
	CONSTRAINT "assessment_criteria_to_organizations_assessment_criteria_id_organization_id_pk" PRIMARY KEY("assessment_criteria_id","organization_id")
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_contact" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"organization_id" text NOT NULL,
	"phone_number" text,
	"email" text,
	"address" text,
	"remarks" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "role_play_prompt_block_to_role_play_prompt" ADD CONSTRAINT "role_play_prompt_block_to_role_play_prompt_block_id_role_play_prompt_block_id_fk" FOREIGN KEY ("block_id") REFERENCES "public"."role_play_prompt_block"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_play_prompt_block_to_role_play_prompt" ADD CONSTRAINT "role_play_prompt_block_to_role_play_prompt_prompt_id_role_play_prompt_id_fk" FOREIGN KEY ("prompt_id") REFERENCES "public"."role_play_prompt"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_play_prompt_block_to_role_play_prompt_variable" ADD CONSTRAINT "role_play_prompt_block_to_role_play_prompt_variable_block_id_role_play_prompt_block_id_fk" FOREIGN KEY ("block_id") REFERENCES "public"."role_play_prompt_block"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_play_prompt_block_to_role_play_prompt_variable" ADD CONSTRAINT "role_play_prompt_block_to_role_play_prompt_variable_variable_id_role_play_prompt_variable_id_fk" FOREIGN KEY ("variable_id") REFERENCES "public"."role_play_prompt_variable"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_play_prompt_variable_option" ADD CONSTRAINT "role_play_prompt_variable_option_role_play_prompt_variable_id_role_play_prompt_variable_id_fk" FOREIGN KEY ("role_play_prompt_variable_id") REFERENCES "public"."role_play_prompt_variable"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_play_prompt_to_organizations" ADD CONSTRAINT "role_play_prompt_to_organizations_role_play_prompt_id_role_play_prompt_id_fk" FOREIGN KEY ("role_play_prompt_id") REFERENCES "public"."role_play_prompt"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_play_prompt_to_organizations" ADD CONSTRAINT "role_play_prompt_to_organizations_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessment_criteria_to_organizations" ADD CONSTRAINT "assessment_criteria_to_organizations_assessment_criteria_id_assessment_criteria_id_fk" FOREIGN KEY ("assessment_criteria_id") REFERENCES "public"."assessment_criteria"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessment_criteria_to_organizations" ADD CONSTRAINT "assessment_criteria_to_organizations_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_contact" ADD CONSTRAINT "organization_contact_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "role_play_prompt_organization_prompt_id_idx" ON "role_play_prompt_to_organizations" USING btree ("role_play_prompt_id");--> statement-breakpoint
CREATE INDEX "role_play_prompt_organization_organization_id_idx" ON "role_play_prompt_to_organizations" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "assessment_criteria_to_orgs_assessment_criteria_id_idx" ON "assessment_criteria_to_organizations" USING btree ("assessment_criteria_id");--> statement-breakpoint
CREATE INDEX "assessment_criteria_to_orgs_organization_id_idx" ON "assessment_criteria_to_organizations" USING btree ("organization_id");