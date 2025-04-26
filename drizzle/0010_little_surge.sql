ALTER TABLE "users" RENAME TO "details";--> statement-breakpoint
ALTER TABLE "posts" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "details" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "details" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "details" ALTER COLUMN "username" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "details" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "details" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_details_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."details"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "details" ADD CONSTRAINT "details_username_unique" UNIQUE("username");