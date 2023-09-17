CREATE TABLE `todo` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`description` varchar(256) NOT NULL,
	`computer_id` int NOT NULL,
	`user_id` varchar(256) NOT NULL,
	CONSTRAINT `todo_id` PRIMARY KEY(`id`)
);
