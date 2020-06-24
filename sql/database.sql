CREATE DATABASE  IF NOT EXISTS `goal_bucket`;
USE `goal_bucket`;

CREATE TABLE `categories` (
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`category`)
)

CREATE TABLE `goals` (
  `goals_id` int(11) NOT NULL AUTO_INCREMENT,
  `time_submitted` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `goal` mediumtext NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  `due_date` timestamp NULL,
  PRIMARY KEY (`goals_id`)
) ;

