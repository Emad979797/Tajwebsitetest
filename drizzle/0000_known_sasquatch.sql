CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`province` text NOT NULL,
	`city` text,
	`insurance` text NOT NULL,
	`preferred_language` text,
	`contact_method` text,
	`contact_time` text,
	`currently_insured` text,
	`effective_date` text,
	`notes` text,
	`locale` text,
	`status` text DEFAULT 'new' NOT NULL
);
