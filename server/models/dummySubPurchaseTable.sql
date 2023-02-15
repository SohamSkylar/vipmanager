CREATE TABLE IF NOT EXISTS `customer` (
  `username` VARCHAR(45) NOT NULL,
  `subtype` VARCHAR(45) NOT NULL,
  `duration` INT(45) NOT NULL,
  `created_at` DATE DEFAULT SYSDATE,
  CONSTRAINT `customer_pk` PRIMARY KEY (`username`, `subtype`, `duration`))
ENGINE = InnoDB;