CREATE SCHEMA IF NOT EXISTS `ingenias` DEFAULT CHARACTER SET utf8 ;
USE `ingenias` ;

-- -----------------------------------------------------
-- Table `ingenias`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;


-- -----------------------------------------------------
-- Table `ingenias`.`Genero`
-- -----------------------------------------------------
CREATE TABLE `genero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;


-- -----------------------------------------------------
-- Table `ingenias`.`Pelicula`
-- -----------------------------------------------------
CREATE TABLE `pelicula` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) NOT NULL,
  `id_categoria` int DEFAULT NULL,
  `id_genero` int DEFAULT NULL,
  `resumen` varchar(800) DEFAULT NULL,
  `temporadas` int DEFAULT NULL,
  `trailer` varchar(45) DEFAULT NULL,
  `duracion` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categoria_idx` (`id_categoria`),
  KEY `fk_genero_idx` (`id_genero`),
  CONSTRAINT `fk_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`),
  CONSTRAINT `fk_genero` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;


-- -----------------------------------------------------
-- Table `ingenias`.`Tag`
-- -----------------------------------------------------
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;



-- -----------------------------------------------------
-- Table `ingenias`.`Actor`
-- -----------------------------------------------------
CREATE TABLE `actor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_apellido` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_apellido_UNIQUE` (`nombre_apellido`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb3;


-- -----------------------------------------------------
-- Table `ingenias`.`PeliculaTag`
-- -----------------------------------------------------
CREATE TABLE `peliculatag` (
  `id_pelicula` int NOT NULL,
  `id_tag` int NOT NULL,
  PRIMARY KEY (`id_pelicula`,`id_tag`),
  KEY `fk_tag_idx` (`id_tag`),
  CONSTRAINT `fk_peliculaTag` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula` (`id`),
  CONSTRAINT `fk_tagPelicula` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;




-- -----------------------------------------------------
-- Table `ingenias`.`PeliculaActor`
-- -----------------------------------------------------
CREATE TABLE `peliculaactor` (
  `id_pelicula` int NOT NULL,
  `id_actor` int NOT NULL,
  PRIMARY KEY (`id_pelicula`,`id_actor`),
  KEY `fk_actor_idx` (`id_actor`),
  CONSTRAINT `fk_actorPelicula` FOREIGN KEY (`id_actor`) REFERENCES `actor` (`id`),
  CONSTRAINT `fk_peliculaActor` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;