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
  `time_completed` TIMESTAMP NULL,
  `tag_id` INT NULL,
  PRIMARY KEY (`goal_id`));


CREATE TABLE `simple_goals`.`tags` (
    `tag_id` INT NOT NULL AUTO_INCREMENT,
    `goal_id` INT NOT NULL,
      `tag` VARCHAR(100) NULL,
        PRIMARY KEY (`tag_id`));

ALTER TABLE `simple_goals`.`tags` 
ADD INDEX `goal_id_idx` (`goal_id` ASC);
ALTER TABLE `simple_goals`.`tags` 
ADD CONSTRAINT `goal_id`
  FOREIGN KEY (`goal_id`)
    REFERENCES `simple_goals`.`goals` (`goal_id`)
      ON DELETE CASCADE
        ON UPDATE CASCADE;
        
