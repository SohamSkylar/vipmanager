CREATE TABLE IF NOT EXISTS `serverlist` (
  `name` VARCHAR(45) NOT NULL,
  `ip` VARCHAR(45) NOT NULL,
  `port` VARCHAR(45) NOT NULL,
  `rcon` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB;