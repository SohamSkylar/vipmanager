CREATE TABLE IF NOT EXISTS `sublist` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `subtype` VARCHAR(45) NOT NULL,
  `flags` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;