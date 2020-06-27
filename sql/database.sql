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
      `tag` VARCHAR(100) NULL,
        PRIMARY KEY (`tag_id`));

ALTER TABLE `simple_goals`.`goals` 
ADD INDEX `tag_id_idx` (`tag_id` ASC);
ALTER TABLE `simple_goals`.`goals` 
ADD CONSTRAINT `tag_id`
  FOREIGN KEY (`tag_id`)
    REFERENCES `simple_goals`.`tags` (`tag_id`)
      ON DELETE CASCADE
        ON UPDATE CASCADE;
        
