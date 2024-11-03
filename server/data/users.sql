-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.5.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table reactmysql.users: ~5 rows (approximately)
INSERT INTO `users` (`id`, `email`, `password`, `name`, `avatar`) VALUES
	(1, 'doraemon@gmail.com', 'password1', 'Doraemon', 'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/26/498/avatar-doremon-cute-4.jpg'),
	(2, 'nobita@gmail.com', 'password2', 'Nobita', 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474092Ykw/avatar-nobita-sieu-dep_091512515.jpg'),
	(3, 'luffy@gmail.com', 'password3', 'Luffy', 'https://m.yodycdn.com/blog/anh-luffy-yody-vn-65.jpg'),
	(4, 'alice@gmail.com', 'password4', 'Alice', 'https://cdn2.fptshop.com.vn/unsafe/800x0/avatar_meo_4_57f5ca33f7.jpg'),
	(5, 'tienphat@gmail.com', 'tienphat29', 'Tien Phat', 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-1.jpg'),
	(6, 'angel@gmail.com', 'password6', 'Angel', 'https://doanhnhanphaply.vn/wp-content/uploads/2024/09/avatar-anh-meo-cute-7-1.jpg');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
