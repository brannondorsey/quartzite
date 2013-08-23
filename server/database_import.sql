-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 24, 2013 at 01:14 AM
-- Server version: 5.5.25
-- PHP Version: 5.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `quartzite`
--
CREATE DATABASE IF NOT EXISTS `quartzite` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `quartzite`;

-- --------------------------------------------------------

--
-- Table structure for table `metadata`
--

CREATE TABLE IF NOT EXISTS `metadata` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` char(24) NOT NULL,
  `filename` char(34) NOT NULL,
  `title` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `length_visited` int(11) NOT NULL COMMENT 'Values in milliseconds',
  `referrer` varchar(255) NOT NULL,
  `ip` varchar(45) NOT NULL,
  `forward_from` varchar(45) NOT NULL,
  `author` varchar(100) NOT NULL,
  `owner` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `keywords` text NOT NULL,
  `copywrite` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `url` (`url`),
  FULLTEXT KEY `description` (`description`),
  FULLTEXT KEY `keywords` (`keywords`),
  FULLTEXT KEY `url_2` (`url`,`description`,`keywords`),
  FULLTEXT KEY `keywords_2` (`keywords`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=801 ;

--
-- Dumping data for table `metadata`
--

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
