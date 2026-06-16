CREATE TABLE `professionals` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`rating` text DEFAULT '5.0',
	`phone` text NOT NULL,
	`is_prime` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`password` text NOT NULL,
	`is_zelo_prime` integer DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
DROP TABLE `cidade`;--> statement-breakpoint
DROP TABLE `regiao`;--> statement-breakpoint
DROP TABLE `uf`;