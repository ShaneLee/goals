CREATE SCHEMA `simple_goals` ;


CREATE DATABASE  IF NOT EXISTS `simple_goals`;
USE `simple_goals`;

CREATE TABLE `simple_goals`.`categories` (
  `category` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`category`));

CREATE TABLE `simple_goals`.`goals` (
  `goal_id` INT NOT NULL AUTO_INCREMENT,
  `time_submitted` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `goal` MEDIUMTEXT NULL,
  `category` VARCHAR(100) NULL,
  `due_date` TIMESTAMP NULL,
  `complete` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`goal_id`));

