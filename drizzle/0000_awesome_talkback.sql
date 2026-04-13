CREATE TABLE `cidade` (
	`id` text PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`uf_id` text NOT NULL,
	FOREIGN KEY (`uf_id`) REFERENCES `uf`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `regiao` (
	`id` text PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`cidade_id` text NOT NULL,
	FOREIGN KEY (`cidade_id`) REFERENCES `cidade`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `uf` (
	`id` text PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`sigla` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uf_sigla_unique` ON `uf` (`sigla`);