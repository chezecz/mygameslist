-- MySQL dump 10.13  Distrib 5.7.14, for Linux (x86_64)
--
-- Host: localhost    Database: mygameslist
-- ------------------------------------------------------
-- Server version	5.7.14-google-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `mygameslist`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mygameslist` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `mygameslist`;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `games` (
  `gameid` int(11) NOT NULL AUTO_INCREMENT,
  `gamename` text NOT NULL,
  `gamedesc` text,
  `releasedate` text,
  PRIMARY KEY (`gameid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'Hollow Knight','Metroidvania','2017'),(2,'Dead Cells','2d Rogue-lite','2018'),(3,'Super Mario Odyssey','3d Platformer','2017'),(4,'Breath of the Wild','Zelda Adventure','2017'),(5,'Skyrim','RPG','2017'),(6,'Octopath Traveler','JRPG','2018'),(7,'Sonic Mania','2d Platformer','2017'),(8,'Rocket League','Car Soccer','2017');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lists`
--

DROP TABLE IF EXISTS `lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lists` (
  `listid` int(11) DEFAULT NULL,
  `gameid` int(11) DEFAULT NULL,
  KEY `gameid` (`gameid`),
  KEY `listid` (`listid`),
  CONSTRAINT `lists_ibfk_1` FOREIGN KEY (`gameid`) REFERENCES `games` (`gameid`),
  CONSTRAINT `lists_ibfk_2` FOREIGN KEY (`listid`) REFERENCES `userlists` (`listid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lists`
--

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;
INSERT INTO `lists` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(2,7),(3,1),(3,2),(3,3),(3,4),(4,6),(4,1),(4,8),(8,1),(10,3),(9,6),(13,2),(14,6),(14,6),(14,6),(13,4),(14,2),(16,6),(11,5),(17,8),(27,6);
/*!40000 ALTER TABLE `lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwords`
--

DROP TABLE IF EXISTS `passwords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `passwords` (
  `userid` int(11) NOT NULL,
  `password` text NOT NULL,
  KEY `userid` (`userid`),
  CONSTRAINT `passwords_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwords`
--

LOCK TABLES `passwords` WRITE;
/*!40000 ALTER TABLE `passwords` DISABLE KEYS */;
INSERT INTO `passwords` VALUES (21,'$2b$10$ZLsz/UaU5Dc2fEOd/85WwOyQcKyNXM6fxF4qiZDmDXdcpL.wHnS3W'),(22,'$2b$10$Jn2halH1GZm8jAENRlY1cO2ur1am3ELfw2e/XmD40AZbKrQiLan9e'),(23,'$2b$10$WPJTlsYUbRt4d3al0QI9eOJ0qgZyWoeYAzQxkSU7SwQZPdxRMtDre'),(24,'$2b$10$6ErKvQuChdtZ1Mh2.rQxFOZO1kb64NhWm3ccvtdH/n43F2mic6SrS'),(25,'$2b$10$Ssj5YZ0tjVSAIGFBFpgOw.Vq5rFUeYfm./xB1oSPcuAnhksz0bnNS'),(26,'$2b$10$AjlJXWr5rL9BAIFoKrh3Fu6d6sW9aLX.d.d24kFDLu/zkgSQPhNKm'),(27,'$2b$10$qxA7NcfP00JM/kYfA9wZTeg4BvijyBS5kDqjAizhKbsld1UhH0gou'),(41,'$2b$10$L6DbDjIX0SrEAlV005bINuI/scWL34gsLLwmer3wxzVOmKiSB.pOe'),(42,'$2b$10$Rf7JUWZTXp0yOyirZczUZugpqweQF7hBaE7E3Kv/PvEwknFUvkMNS'),(43,'$2b$10$edQ1pxISgEPibNClTS/hUezN2MxOR/kIY28zijSx8ZrK6zlys5seS'),(44,'$2b$10$YdSy1oYqNnjbL.j/d.ImeeEiwhMWpcWNzngevpd.OGRgOcfhWrrAa'),(45,'$2b$10$co.jkew7NEc8LeuJ6dj2J.l8ZACR7RAv6PjeOILxn6.6Wqooe77S6'),(46,'$2b$10$MZJ7C9T7Y.anV0gTcmHJbOCOHXOHDSpYvNU7h0JqQOHWrK7.hfGdS'),(47,'$2b$10$DqE.BrsYKN0zf1ndTD5YceL1Twn03b28CixJOzBd1vvBxbJiXX1ry');
/*!40000 ALTER TABLE `passwords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlists`
--

DROP TABLE IF EXISTS `userlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userlists` (
  `userid` int(11) NOT NULL,
  `listid` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`listid`),
  KEY `userid` (`userid`),
  CONSTRAINT `userlists_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlists`
--

LOCK TABLES `userlists` WRITE;
/*!40000 ALTER TABLE `userlists` DISABLE KEYS */;
INSERT INTO `userlists` VALUES (21,1),(21,8),(21,10),(21,46),(22,2),(22,9),(23,3),(24,4),(25,5),(26,6),(27,7),(41,11),(41,16),(41,17),(41,18),(43,12),(43,19),(43,20),(43,21),(43,22),(43,23),(43,24),(43,25),(43,26),(43,27),(43,28),(43,29),(43,30),(43,31),(43,32),(43,33),(43,34),(43,35),(43,36),(43,37),(43,38),(43,39),(43,40),(43,41),(43,42),(43,43),(43,44),(43,45),(44,13),(44,14),(44,15);
/*!40000 ALTER TABLE `userlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (21,'cheze'),(22,'deze'),(23,'zakk'),(24,'kane'),(25,'chase'),(26,'zulin'),(27,'nintendofan'),(41,'1'),(42,'privet'),(43,''),(44,'ben'),(45,'—‘’'),(46,'vivian'),(47,'testuser');
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

-- Dump completed on 2018-10-19  8:42:30
