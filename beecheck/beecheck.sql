-- Adminer 4.8.1 MySQL 8.0.30 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `tbl_quiz`;
CREATE TABLE `tbl_quiz` (
  `quiz_id` int NOT NULL AUTO_INCREMENT,
  `quiz_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `made_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image_weight` int NOT NULL,
  PRIMARY KEY (`quiz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `tbl_quiz` (`quiz_id`, `quiz_image`, `made_by`, `image_weight`) VALUES
(1,	'../images/image01.jpg',	'AIGen-Art',	1000),
(2,	'../images/image1.jpg',	'Human-Art',	1000),
(3,	'../images/image02.jpg',	'AIGen-Art',	1000),
(4,	'../images/image2.jpg',	'Human-Art',	1000),
(5,	'../images/image03.jpg',	'AIGen-Art',	1000),
(6,	'../images/image3.jpg',	'Human-Art',	1000),
(7,	'../images/image04.jpg',	'AIGen-Art',	1000),
(8,	'../images/image4.jpg',	'Human-Art',	1000),
(9,	'../images/image05.jpg',	'AIGen-Art',	1000),
(10,	'../images/image5.jpg',	'Human-Art',	1000),
(11,	'../images/image06.jpg',	'AIGen-Art',	1000),
(12,	'../images/image6.jpg',	'Human-Art',	1000),
(13,	'../images/image07.jpg',	'AIGen-Art',	1000),
(14,	'../images/image031.jpg',	'AIGen-Art',	2000),
(15,	'../images/image08.jpg',	'AIGen-Art',	2000),
(16,	'../images/image8.jpg',	'Human-Art',	2000),
(17,	'../images/image09.jpg',	'AIGen-Art',	2000),
(18,	'../images/image9.jpg',	'Human-Art',	2000),
(19,	'../images/image010.jpg',	'AIGen-Art',	2000),
(20,	'../images/image10.jpg',	'Human-Art',	2000),
(21,	'../images/image011.jpg',	'AIGen-Art',	2000),
(22,	'../images/image11.jpg',	'Human-Art',	2000),
(23,	'../images/image012.jpg',	'AIGen-Art',	2000),
(24,	'../images/image12.jpg',	'Human-Art',	2000),
(25,	'../images/image013.jpg',	'AIGen-Art',	2000),
(26,	'../images/image13.jpg',	'Human-Art',	3000),
(27,	'../images/image31.jpg',	'Human-Art',	3000),
(28,	'../images/image014.jpg',	'AIGen-Art',	3000),
(29,	'../images/image14.jpg',	'Human-Art',	3000),
(30,	'../images/image015.jpg',	'AIGen-Art',	3000),
(31,	'../images/image15.jpg',	'Human-Art',	3000),
(32,	'../images/image016.jpg',	'AIGen-Art',	3000),
(33,	'../images/image16.jpg',	'Human-Art',	3000),
(34,	'../images/image017.jpg',	'AIGen-Art',	3000),
(35,	'../images/image17.jpg',	'Human-Art',	3000),
(36,	'../images/image018.jpg',	'AIGen-Art',	3000),
(37,	'../images/image18.jpg',	'Human-Art',	3000),
(38,	'../images/image019.jpg',	'AIGen-Art',	3000),
(39,	'../images/image19.jpg',	'Human-Art',	3000),
(40,	'../images/image020.jpg',	'AIGen-Art',	4000),
(41,	'../images/image20.jpg',	'Human-Art',	4000),
(42,	'../images/image021.jpg',	'AIGen-Art',	4000),
(43,	'../images/image21.jpg',	'Human-Art',	4000),
(44,	'../images/image022.jpg',	'AIGen-Art',	4000),
(45,	'../images/image22.jpg',	'Human-Art',	4000),
(46,	'../images/image023.jpg',	'AIGen-Art',	4000),
(47,	'../images/image23.jpg',	'Human-Art',	4000),
(48,	'../images/image024.jpg',	'AIGen-Art',	4000),
(49,	'../images/image24.jpg',	'Human-Art',	4000),
(50,	'../images/image025.jpg',	'AIGen-Art',	4000),
(51,	'../images/image25.jpg',	'Human-Art',	4000),
(52,	'../images/image026.jpg',	'AIGen-Art',	4000),
(53,	'../images/image26.jpg',	'AIGen-Art',	4000),
(57,	'../images/image027.jpg',	'AIGen-Art',	5000),
(58,	'../images/image27.jpg',	'Human-Art',	5000),
(59,	'../images/image028.jpg',	'AIGen-Art',	5000),
(60,	'../images/image28.jpg',	'Human-Art',	5000),
(61,	'../images/image029.jpg',	'AIGen-Art',	5000),
(62,	'../images/image29.jpg',	'Human-Art',	5000),
(63,	'../images/image030.jpg',	'AIGen-Art',	5000),
(64,	'../images/image30.jpg',	'Human-Art',	5000),
(65,	'../images/image7.jpg',	'Human-Art',	5000);

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cmltv_score` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`user_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `tbl_user` (`user_id`, `user_name`, `email`, `password`, `cmltv_score`) VALUES
(1,	'Usagi001',	'usagi0012@gmail.com',	'Password01#',	4600.00),
(3,	'james',	'updatejames mail01',	'Password01#',	4100.00),
(4,	'raymond',	'raymondred@whatever.com',	'password01',	600.00),
(5,	'bernice',	'bernice@gmail.com',	'password01',	1400.00),
(6,	'vania',	'vania@gmail.com',	'password01',	3100.00),
(7,	'taylor1989',	'taylor1989@taylorswift.com',	'password01',	2900.00),
(8,	'sandra',	'sandra@gmail.com',	'password01',	200.00),
(10,	'clarabow',	'clarabow@gmail.com',	'password01',	1500.00),
(11,	'betty001',	'betty001@gmail.com',	'password01',	2000.00),
(12,	'dorothea001',	'dorothea001@outlook.com',	'password01',	3400.00),
(13,	'marjorie001',	'marjorie001@gmail.com',	'password01',	900.00),
(15,	'aimee002',	'aimee002@outlook.com',	'password01',	700.00),
(17,	'leonardo',	'leonardo@decaprio.com',	'Password',	200.00),
(18,	'Gabriella',	'Gabriella123@gmail.com',	'Password02#',	3200.00),
(19,	'Winnie',	'Winnie@gmail.com',	'Password01#',	2000.00),
(31,	'Alexa',	'Alexa123@gmail.com',	'Password01#',	1900.00),
(34,	'Viona',	'Viona123@gmail.com',	'Password01#',	0.00),
(37,	'Lindsay',	'Lindsay001@gmail.com',	'Password01#',	0.00),
(39,	'test009',	'test009@live.com',	'Password01#',	0.00),
(40,	'test009',	'test009@live.com',	'Password01#',	0.00);

-- 2024-09-07 11:57:19
