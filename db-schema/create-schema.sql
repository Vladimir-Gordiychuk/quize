-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Quiz
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Quiz` ;

-- -----------------------------------------------------
-- Schema Quiz
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Quiz` DEFAULT CHARACTER SET utf8 ;
USE `Quiz` ;

-- -----------------------------------------------------
-- Table `Quiz`.`Questions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Quiz`.`Questions` ;

CREATE TABLE IF NOT EXISTS `Quiz`.`Questions` (
  `Id` INT NOT NULL,
  `Text` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Quiz`.`Options`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Quiz`.`Options` ;

CREATE TABLE IF NOT EXISTS `Quiz`.`Options` (
  `Id` INT NOT NULL,
  `QuestionId` INT NOT NULL,
  `Text` VARCHAR(45) NOT NULL,
  `Correct` TINYINT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `FK_Options_Questions_idx` (`QuestionId` ASC) VISIBLE,
  CONSTRAINT `FK_Options_Questions`
    FOREIGN KEY (`QuestionId`)
    REFERENCES `Quiz`.`Questions` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Quiz`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Quiz`.`Users` ;

CREATE TABLE IF NOT EXISTS `Quiz`.`Users` (
  `Id` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Quiz`.`Quizzes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Quiz`.`Quizzes` ;

CREATE TABLE IF NOT EXISTS `Quiz`.`Quizzes` (
  `Id` INT NOT NULL,
  `AuthorId` VARCHAR(45) NULL,
  `Title` VARCHAR(45) NULL,
  `Hash` INT NULL,
  `Timelimit` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `FK_Quizes_Users_idx` (`AuthorId` ASC) VISIBLE,
  CONSTRAINT `FK_Quizes_Users`
    FOREIGN KEY (`AuthorId`)
    REFERENCES `Quiz`.`Users` (`Id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Quiz`.`QuizQuestions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Quiz`.`QuizQuestions` ;

CREATE TABLE IF NOT EXISTS `Quiz`.`QuizQuestions` (
  `Id` INT NOT NULL,
  `QuizId` INT NOT NULL,
  `QuestionId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `FK_QuizQuestions_Questions_idx` (`QuestionId` ASC) VISIBLE,
  CONSTRAINT `FK_QuizQuestions_Quizes`
    FOREIGN KEY (`QuizId`)
    REFERENCES `Quiz`.`Quizzes` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_QuizQuestions_Questions`
    FOREIGN KEY (`QuestionId`)
    REFERENCES `Quiz`.`Questions` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Quiz`.`Attempts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Quiz`.`Attempts` ;

CREATE TABLE IF NOT EXISTS `Quiz`.`Attempts` (
  `Id` INT NOT NULL,
  `QuizId` INT NOT NULL,
  `UserId` VARCHAR(45) NOT NULL,
  `Started` DATETIME NOT NULL,
  `Finished` DATETIME NULL,
  `Status` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `FK_Results_Quizes_idx` (`QuizId` ASC) VISIBLE,
  INDEX `FK_Results_Users_idx` (`UserId` ASC) VISIBLE,
  CONSTRAINT `FK_Results_Quizes`
    FOREIGN KEY (`QuizId`)
    REFERENCES `Quiz`.`Quizzes` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_Results_Users`
    FOREIGN KEY (`UserId`)
    REFERENCES `Quiz`.`Users` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Quiz`.`AttemptDetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Quiz`.`AttemptDetails` ;

CREATE TABLE IF NOT EXISTS `Quiz`.`AttemptDetails` (
  `Id` INT NOT NULL,
  `AttemptId` INT NULL,
  `OptionId` INT NULL,
  `Selected` TINYINT NULL,
  PRIMARY KEY (`Id`),
  INDEX `FK_ResultDetails_Results_idx` (`AttemptId` ASC) VISIBLE,
  INDEX `FK_ResultDetails_Options_idx` (`OptionId` ASC) VISIBLE,
  CONSTRAINT `FK_AttemptDetails_Attempts`
    FOREIGN KEY (`AttemptId`)
    REFERENCES `Quiz`.`Attempts` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_AttemptDetails_Options`
    FOREIGN KEY (`OptionId`)
    REFERENCES `Quiz`.`Options` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
