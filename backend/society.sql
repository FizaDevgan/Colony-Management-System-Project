CREATE DATABASE  IF NOT EXISTS `society` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `society`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: society
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'Ridhima','ridhimabehal475@gmail.com','1234','superadmin','2025-03-05 11:23:46','2025-03-17 07:33:49'),(2,'Ridhi','ridhimabehal@gmail.com','123','admin','2025-03-05 11:23:46','2025-03-17 07:33:49');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookhelpers`
--

DROP TABLE IF EXISTS `bookhelpers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookhelpers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `helperId` int NOT NULL,
  `userId` int NOT NULL,
  `date` datetime NOT NULL,
  `instructions` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `helperId` (`helperId`),
  KEY `userId` (`userId`),
  CONSTRAINT `bookhelpers_ibfk_1` FOREIGN KEY (`helperId`) REFERENCES `helpers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookhelpers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookhelpers`
--

LOCK TABLES `bookhelpers` WRITE;
/*!40000 ALTER TABLE `bookhelpers` DISABLE KEYS */;
INSERT INTO `bookhelpers` VALUES (1,1,1,'2025-03-09 00:00:00','evening ','2025-03-08 05:05:25','2025-03-08 05:05:25'),(2,1,1,'2025-03-11 00:00:00','come in evening','2025-03-09 15:36:28','2025-03-09 15:36:28'),(3,2,1,'2025-03-19 00:00:00','come fast','2025-03-18 05:21:07','2025-03-18 05:21:07'),(4,1,1,'2025-03-20 00:00:00','abc','2025-03-20 09:50:09','2025-03-20 09:50:09');
/*!40000 ALTER TABLE `bookhelpers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ccategories`
--

DROP TABLE IF EXISTS `ccategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ccategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ccategories`
--

LOCK TABLES `ccategories` WRITE;
/*!40000 ALTER TABLE `ccategories` DISABLE KEYS */;
INSERT INTO `ccategories` VALUES (1,'Infrastructure & Maintenance','2025-03-06 07:11:49','2025-03-06 07:11:49'),(2,'Security & Safety','2025-03-06 07:11:49','2025-03-06 07:11:49'),(3,' Noise & Disturbances','2025-03-06 07:11:49','2025-03-06 07:11:49'),(4,'Health & Sanitation','2025-03-06 07:11:49','2025-03-06 07:11:49');
/*!40000 ALTER TABLE `ccategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `suggestion` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT 'Pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaints`
--

LOCK TABLES `complaints` WRITE;
/*!40000 ALTER TABLE `complaints` DISABLE KEYS */;
INSERT INTO `complaints` VALUES (1,1,'ridhimabehal475@gmail.com','1','noisy whole day','2025-03-12 00:00:00','manage tym','Addressed','2025-03-12 06:08:57','2025-03-12 11:09:46'),(2,1,'ridhimabehal475@gmail.com','2','gaurd not available','2025-03-13 00:00:00','make available','Addressed','2025-03-12 06:09:41','2025-03-12 11:11:45');
/*!40000 ALTER TABLE `complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flats`
--

DROP TABLE IF EXISTS `flats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bname` varchar(255) NOT NULL,
  `ftype` varchar(255) NOT NULL,
  `floor` varchar(255) NOT NULL,
  `flat` varchar(255) NOT NULL,
  `sdeposite` varchar(255) NOT NULL,
  `rent` varchar(255) NOT NULL,
  `furnished` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flats`
--

LOCK TABLES `flats` WRITE;
/*!40000 ALTER TABLE `flats` DISABLE KEYS */;
INSERT INTO `flats` VALUES (1,'a block','2 bhk','3','3032','15,000','10,000','Fully Furnished','2025-03-18 07:33:31','2025-03-18 07:33:31');
/*!40000 ALTER TABLE `flats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gaurds`
--

DROP TABLE IF EXISTS `gaurds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gaurds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `adharcard` varchar(255) DEFAULT NULL,
  `gate` varchar(255) DEFAULT NULL,
  `shift` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Approved',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gaurds`
--

LOCK TABLES `gaurds` WRITE;
/*!40000 ALTER TABLE `gaurds` DISABLE KEYS */;
INSERT INTO `gaurds` VALUES (5,'Ridhi','Female','466890665','ridhimabehal475@gmail.com','123','87534689','Gate 2','Evening','Approved','2025-03-06 07:26:01','2025-03-17 07:25:57');
/*!40000 ALTER TABLE `gaurds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpers`
--

DROP TABLE IF EXISTS `helpers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `helpers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `adharcard` varchar(255) DEFAULT NULL,
  `servicetype` varchar(255) DEFAULT NULL,
  `availability` varchar(255) DEFAULT NULL,
  `medical` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Approved',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpers`
--

LOCK TABLES `helpers` WRITE;
/*!40000 ALTER TABLE `helpers` DISABLE KEYS */;
INSERT INTO `helpers` VALUES (1,'Ridhi','Female','776446789','ridhimabehal475@gmail.com','AZcurBvG','887543325679','Cook','Part-Time','Checked','Approved','2025-03-07 05:53:35','2025-03-07 07:28:39'),(2,'Ridhima Behal','Female','887657899','ridhimabehal475@gmail.com','jJOdIESX','877557900','Driver','Part-Time','Checked','Approved','2025-03-07 05:54:40','2025-03-07 07:28:37'),(5,'gun','Female','8865890987','ridhimabehalbehal@gmail.com','D4Pe0xzO','755780086554','Plumber','Part-Time','Checked','Approved','2025-03-09 15:42:27','2025-03-09 15:42:27'),(6,'trisha','Female','457800644','sakshibehal2880@gmail.com','9CuE52GS','34568996544','Plumber','Part-Time','Checked','Block','2025-03-09 15:47:20','2025-03-09 15:52:42');
/*!40000 ALTER TABLE `helpers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `floor` varchar(255) DEFAULT NULL,
  `flat` varchar(255) DEFAULT NULL,
  `members` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ridhima Behal','ridhimabehal475@gmail.com','23454212','1234','/user/girl.jpg','3','3032','4','2025-03-01 00:00:00','2025-03-05 11:23:46','2025-03-17 11:21:10');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicals`
--

DROP TABLE IF EXISTS `vehicals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `oname` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `vnumber` varchar(255) NOT NULL,
  `rc` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `vehicals_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicals`
--

LOCK TABLES `vehicals` WRITE;
/*!40000 ALTER TABLE `vehicals` DISABLE KEYS */;
INSERT INTO `vehicals` VALUES (1,1,'ridhimabehal475@gmail.com','abc','Car','ii7658','/user/oi.avif','approve','2025-03-17 05:32:38','2025-03-17 05:51:53');
/*!40000 ALTER TABLE `vehicals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitors`
--

DROP TABLE IF EXISTS `visitors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `floor` varchar(255) NOT NULL,
  `flat` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `parking` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT 'notvisited',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `visitors_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitors`
--

LOCK TABLES `visitors` WRITE;
/*!40000 ALTER TABLE `visitors` DISABLE KEYS */;
INSERT INTO `visitors` VALUES (1,1,'Ridhi','ridhimabehal4755@gmail.com','234567876543','3','3032','2025-03-14 00:00:00','yes','Visited','2025-03-13 11:04:06','2025-03-17 05:06:23');
/*!40000 ALTER TABLE `visitors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-21 11:07:30
