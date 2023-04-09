CREATE TABLE IF NOT EXISTS `serverSublist` (
  `name` VARCHAR(45) NOT NULL,
  `price` VARCHAR(45) NOT NULL,
  `duration` VARCHAR(45) NOT NULL,
  `subtype` VARCHAR(45) NOT NULL,
  PRIMARY KEY(`name`, `subtype`, `duration`),
  CONSTRAINT servername_fk FOREIGN KEY(`name`) references `serverlist` (`name`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT subtype_fk FOREIGN KEY(`subtype`) references `sublist` (`subtype`) ON UPDATE CASCADE ON DELETE CASCADE
  )
ENGINE = InnoDB;