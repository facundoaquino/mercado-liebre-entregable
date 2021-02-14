
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mercado_liebre_entregable
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mercado_liebre_entregable
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mercado_liebre_entregable` DEFAULT CHARACTER SET utf8 ;
USE `mercado_liebre_entregable` ;

-- -----------------------------------------------------
-- Table `mercado_liebre_entregable`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercado_liebre_entregable`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mercado_liebre_entregable`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercado_liebre_entregable`.`brands` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mercado_liebre_entregable`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercado_liebre_entregable`.`categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mercado_liebre_entregable`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercado_liebre_entregable`.`products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `photo` VARCHAR(100) NOT NULL,
  `price` FLOAT(10,2) UNSIGNED NOT NULL,
  `stock` INT UNSIGNED NOT NULL,
  `brand_id` INT UNSIGNED NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `product_belongs_to_brand_idx` (`brand_id` ASC),
  INDEX `product_belongs_to_category_idx` (`category_id` ASC),
  CONSTRAINT `product_belongs_to_brand`
    FOREIGN KEY (`brand_id`)
    REFERENCES `mercado_liebre_entregable`.`brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `product_belongs_to_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `mercado_liebre_entregable`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
