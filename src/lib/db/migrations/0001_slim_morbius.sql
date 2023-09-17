CREATE TABLE `site` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`sitename` varchar(256) NOT NULL,
	`sitedescription` varchar(256) NOT NULL,
	`sitegoal` varchar(256) NOT NULL,
	CONSTRAINT `site_id` PRIMARY KEY(`id`)
);
