CREATE DATABASE  IF NOT EXISTS `netflix` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `netflix`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: netflix
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actors`
--

DROP TABLE IF EXISTS `actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actors` (
  `idActor` int NOT NULL AUTO_INCREMENT,
  `nameActor` varchar(45) NOT NULL,
  `lastnameActor` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `bithday` date DEFAULT NULL,
  `pet` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idActor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actors`
--

LOCK TABLES `actors` WRITE;
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
INSERT INTO `actors` VALUES (1,'Tom','Hanks','Estados Unidos','1956-06-09',NULL),(2,'Roberto','Benigni','Italia','1952-10-27',NULL),(3,'John','Travolta','Estados Unidos','1954-02-18',NULL);
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `categorie` varchar(45) NOT NULL,
  `yearMovies` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Pulp Fiction','Crimen','https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg','Top 10','1994-01-01'),(2,'Pulp Fiction','Crimen','https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg','Top 10','1994-01-01'),(3,'La vita è bella','Comedia','https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg','Top 10','1997-01-01'),(4,'Forrest Gump','Comedia','https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg','Top 10','1994-01-01');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rel_movies_actors`
--

DROP TABLE IF EXISTS `rel_movies_actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rel_movies_actors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fkActors` int DEFAULT NULL,
  `fkMovie` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkActors` (`fkActors`),
  KEY `fkMovie` (`fkMovie`),
  CONSTRAINT `rel_movies_actors_ibfk_1` FOREIGN KEY (`fkActors`) REFERENCES `actors` (`idActor`),
  CONSTRAINT `rel_movies_actors_ibfk_2` FOREIGN KEY (`fkMovie`) REFERENCES `movies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rel_movies_actors`
--

LOCK TABLES `rel_movies_actors` WRITE;
/*!40000 ALTER TABLE `rel_movies_actors` DISABLE KEYS */;
INSERT INTO `rel_movies_actors` VALUES (1,3,1),(2,3,2),(3,2,3),(4,1,4);
/*!40000 ALTER TABLE `rel_movies_actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rel_movies_users`
--

DROP TABLE IF EXISTS `rel_movies_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rel_movies_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fkUsers` int DEFAULT NULL,
  `fkMovie` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkUsers` (`fkUsers`),
  KEY `fkMovie` (`fkMovie`),
  CONSTRAINT `rel_movies_users_ibfk_1` FOREIGN KEY (`fkUsers`) REFERENCES `users` (`idUsers`),
  CONSTRAINT `rel_movies_users_ibfk_2` FOREIGN KEY (`fkMovie`) REFERENCES `movies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rel_movies_users`
--

LOCK TABLES `rel_movies_users` WRITE;
/*!40000 ALTER TABLE `rel_movies_users` DISABLE KEYS */;
INSERT INTO `rel_movies_users` VALUES (4,2,1),(5,2,2),(6,3,2);
/*!40000 ALTER TABLE `rel_movies_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUsers` int NOT NULL AUTO_INCREMENT,
  `userMovies` varchar(45) NOT NULL,
  `passwordMovies` varchar(45) NOT NULL,
  `nameMovies` varchar(45) NOT NULL,
  `email` varchar(1000) NOT NULL,
  `plan_details` varchar(45) NOT NULL,
  PRIMARY KEY (`idUsers`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'maria_dev','maria','Maria','maria@gmail.com','Standard'),(3,'ester_dev','ester','Ester','ester@gmail.com','Standard');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-29 11:23:41
