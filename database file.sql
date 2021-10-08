-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2020 at 03:24 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iukl`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_account`
--

CREATE TABLE `admin_account` (
  `id` int(11) NOT NULL,
  `staff_id` varchar(9) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` varchar(15) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1' COMMENT '1 mean active \\n0 mean deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_account`
--

INSERT INTO `admin_account` (`id`, `staff_id`, `password`, `name`, `created_by`, `created_at`, `status`) VALUES
(1, '123456789', 'admin', 'Irfan Khan', 1, '1579770168035', 1),
(2, 'Sint corp', 'Pa$$w0rd!', 'Numquam aut commodi', 1, '1579959084562', 1),
(4, '222', 'Pa$$w0rd!', 'Numquam aut commodi', 1, '1579959115015', 1),
(5, 'Voluptate', 'Pa$$w0rd!', 'Sed id eligendi volu', 1, '1579959191240', 1),
(6, 'Tenetur e', 'Pa$$w0rd!', 'Fuga Sit suscipit a', 1, '1579965187340', 1);

-- --------------------------------------------------------

--
-- Table structure for table `admin_session`
--

CREATE TABLE `admin_session` (
  `id` int(11) NOT NULL,
  `hash` varchar(45) DEFAULT NULL,
  `admin_id` int(11) NOT NULL,
  `created_at` varchar(15) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1' COMMENT '1 mean active \n0 mean deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_session`
--

INSERT INTO `admin_session` (`id`, `hash`, `admin_id`, `created_at`, `status`) VALUES
(1, 'ab69dceeada9dfa3c72f1339acbc223e', 1, '1579782082595', 0),
(2, '23f4017f48befbacab5f28511e0b58ca', 1, '1579782099788', 1),
(3, '5844c05b35a715d456ca4b4e6376e699', 1, '1579782127764', 1),
(4, 'c9690dd8aa2d3c0409fcb62f75567a59', 1, '1579782189433', 1),
(5, '8d9ca27769ee48d442749da5a431515f', 1, '1579782247447', 1),
(6, '57e8dd38671c1c11aee288155e539b6e', 1, '1579782282953', 1),
(7, '9dc37e70df7e78078b5b4b7525fcb8f3', 1, '1579782305043', 1),
(8, '8f0862b9c24fc0c6aa5fcd6de4900ef4', 1, '1579782334580', 1),
(9, 'f1bdd5566560d8a7cf03cbfc191169c5', 1, '1579782375028', 1),
(10, '7611648436ae6c132caa151332e675d2', 1, '1579782448584', 1),
(11, '8c4e98a0aff4aef6731580cd2db6503b', 1, '1579782486317', 1),
(12, '2a80bfbc21065c3cbcf791e289c88223', 1, '1579782529141', 1),
(13, '32d03eb84b9028f36b47873adbe5a52b', 1, '1579782560033', 1),
(14, '63eea9c5c176cd0d850fddcdca6567c7', 1, '1579782577668', 1),
(15, 'a11d9e7cdb2434a25a3c527d2196e344', 1, '1579782603672', 1),
(16, 'caeaa8b8e2e35dc6f572292b19036ae8', 1, '1579782666832', 1),
(17, '96ef1ac0fb6ccf17ea22044c7858872c', 1, '1579782687363', 0),
(18, '78caccf16b178737b79b1373f4573668', 1, '1579782769105', 0),
(19, 'b5c1e7f02ef5d57652d69c019b0869f7', 1, '1579784859313', 1),
(20, 'e3b416a43b0a18a92d20ce8c574b4b02', 1, '1579852904163', 1),
(21, '31ac1f7762765896f1c3676265d6d814', 1, '1579852964433', 0),
(22, '6003d259e66d77cb3e9585296a4a888a', 1, '1579853248882', 1),
(23, 'd13fdd28d0d2ccfa0edd60734fd6ddbe', 1, '1579864563807', 0),
(24, '32c1df82883942132c33480cf9c09847', 1, '1579880546223', 0),
(25, '8345f6cbe7d26042792369289476064d', 1, '1579948450117', 1),
(26, 'fd5dc4f2148e85ddaa04a0c03c2910d7', 1, '1579954773696', 0),
(27, '97dcaf5dc15f03b8162a07004331b632', 1, '1579965156637', 0),
(28, 'bc263d5247d2072fde7ad8a0d47652c6', 1, '1580106025637', 0),
(29, '5276dd5be87b2495f9b33830c485c7e2', 1, '1580125588472', 0),
(30, 'c61d4352364780b7a4997b068f356ae0', 1, '1580126056087', 1),
(31, '1dcca915cdca5937e95d4059fdf82180', 1, '1580280202479', 0),
(32, '88426779294020bd91ede57bbe35269d', 1, '1580281058120', 0),
(33, '6b5888719b1bb72ff1ad57d4fea78294', 1, '1580739980695', 0),
(34, '9005e37859c811661817fd522129f1de', 1, '1580740050241', 0),
(35, 'af8c704dcb19c3c4a15afefe1ab62665', 1, '1580741149463', 0),
(36, '3d4cd2d5afd256d2e5989e107793c4f5', 1, '1580814645984', 0);

-- --------------------------------------------------------

--
-- Table structure for table `catalog`
--

CREATE TABLE `catalog` (
  `id` int(11) NOT NULL,
  `isbn` varchar(45) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `edition` int(11) DEFAULT NULL,
  `cover` varchar(200) DEFAULT 'default.jpg',
  `rack_number` varchar(15) DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL COMMENT '1 mean available\n0 mean unavailable',
  `added_at` varchar(15) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1' COMMENT '1 mean active \\n0 mean deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `catalog`
--

INSERT INTO `catalog` (`id`, `isbn`, `title`, `author`, `edition`, `cover`, `rack_number`, `availability`, `added_at`, `description`, `status`) VALUES
(11, 'Quae dicta deleniti', 'Quae dicta deleniti', 'Officia ad sequi dui', 34, 'bookCoverfYhyySMEUJK834cjAQRT2uHkrkeN9VAjdshXaTYPmnIn7oQxGWyhGPJjHdSjTVifTifumnScJRybbQWxeehyvgJdwvYVDV1TM0tR.png', '57', 1, '1580125603219', NULL, 1),
(12, '9783540572091', '9783540572091', 'Omar Faruque', 2020, 'bookCoveryVAK59TnoT1pi40ooo3BMKsW46OT4CTnHjeAqtQTUsNRfn7y5mateUlMbpHJyWP2YaUIJ4LGcoyimOoZRFKJ7n9TYIT4sqLmoAPu.jpeg', '23', 0, '1580740847155', NULL, 1),
(16, 'Non amet voluptate', 'Non amet voluptate', 'Dolor aut quae labor', 84, 'null', '48', 1, '1580796073121', 'Wow', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dxf`
--

CREATE TABLE `ebook` (
  `id` int(11) NOT NULL,
  `isbn` varchar(45) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `edition` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `publish_date` varchar(15) DEFAULT NULL,
  `file` varchar(200) DEFAULT NULL,
  `added_at` varchar(15) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1' COMMENT '0 mean deleted \n1 mean active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dxf`
--

INSERT INTO `ebook` (`id`, `isbn`, `title`, `author`, `edition`, `price`, `publish_date`, `file`, `added_at`, `status`) VALUES
(6, 'Quo nulla possimus', 'Quo nulla possimus', 'Voluptatem commodo o', 37, 730, '1579633200000', 'booktskIrWVxpurtFtarM9XjXRfpNCaBoEYwivslUEzXM5MKufnlYFKZjGnUChB61rpTIL5ZSbNCdYQipToz0XwIHEVvG1F2egnfoDiJ.pdf', '1579880733487', 1),
(7, 'Ut recusandae Est r', 'Similique incididunt', 'Rem aliquid aut id d', 9, 76, '1258916400000', 'book3RAqtuQySyioKignDfUvnanqMKwI5DvG9VYRzTfx2vbjubwTDQeLl0089CIwU3UG1GBx1jAwoZITaFOd3jy3TJ6CBv3wkECPK0dE.pdf', '1580125675901', 1);

-- --------------------------------------------------------

--
-- Table structure for table `paper`
--

CREATE TABLE `paper` (
  `id` int(11) NOT NULL,
  `subject_code` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `semester_month` int(11) DEFAULT '1',
  `year` int(11) DEFAULT '2020',
  `file` varchar(200) DEFAULT NULL,
  `added_at` varchar(15) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1' COMMENT '0 mean deleted \n1 mean active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `paper`
--

INSERT INTO `paper` (`id`, `subject_code`, `title`, `semester_month`, `year`, `file`, `added_at`, `status`) VALUES
(1, 'CS4', 'Discrete Mathmatics', 3, 2020, NULL, '1579770168035', 1),
(3, 'Ad mollit aut eum qu1', 'Temporibus sed harum1', 6, 2018, 'paperSHrTS8I7ORlLx18BxYU7ztojf8NORfGarjjHqVAeRP1xsthDSYdNKABIkj9JmsFsWne0Hj1BcC3BmqcqRyvhEdDCmLdtTylOtT6Y.pdf', '1579935786609', 1);

-- --------------------------------------------------------

--
-- Table structure for table `room_bookings`
--

CREATE TABLE `room_bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `room_id` varchar(45) DEFAULT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `checkin_datetime` varchar(15) DEFAULT NULL,
  `checkout_datetime` varchar(15) DEFAULT NULL,
  `approve_by` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0' COMMENT '0 for pending\\n1 for completed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `room_bookings`
--

INSERT INTO `room_bookings` (`id`, `user_id`, `room_id`, `booking_id`, `checkin_datetime`, `checkout_datetime`, `approve_by`, `status`) VALUES
(3, 1, '1', 3, '1580072400000', '1580076000000', 1, 1),
(4, 13, '1', 18, '1582097700000', '1582099740000', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `room_booking_request`
--

CREATE TABLE `room_booking_request` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `checkin_datetime` varchar(15) DEFAULT NULL,
  `checkout_datetime` varchar(15) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0' COMMENT '0 mean pending\\n1 mean approved\\n2 mean timeout \n3 for rejeceted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `room_booking_request`
--

INSERT INTO `room_booking_request` (`id`, `user_id`, `room_id`, `checkin_datetime`, `checkout_datetime`, `status`) VALUES
(1, 1, 1, '1580109300000', '1580072400000', 2),
(2, 1, 2, '1579993200000', '1580000400000', 2),
(3, 1, 1, '1580122800000', '1580126400000', 1),
(7, 1, 1, '1580075220000', '1580078820000', 2),
(8, 1, 1, '1580075220000', '1580078820000', 2),
(9, 1, 2, '1581670500000', '1581706500000', 0),
(10, 1, 2, '1581670500000', '1581706500000', 0),
(11, 1, 2, '1581670500000', '1581706500000', 0),
(12, 1, 2, '1581670500000', '1581706500000', 0),
(13, 1, 2, '1582880100000', '1582881000000', 0),
(14, 1, 2, '1580889900000', '1580903400000', 3),
(15, 1, 1, '1579162440000', '1579181400000', 2),
(16, 1, 2, '1580462100000', '1580466600000', 2),
(17, 1, 2, '1580475600000', '1580479200000', 2),
(18, 13, 1, '1582097700000', '1582099740000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `room_types`
--

CREATE TABLE `room_types` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `room_types`
--

INSERT INTO `room_types` (`id`, `name`) VALUES
(1, 'Auditorium'),
(2, 'Conference'),
(3, 'Meeting');

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `id` int(11) NOT NULL,
  `student_id` varchar(15) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `created_at` varchar(15) DEFAULT NULL,
  `approve_by` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '2' COMMENT '0 mean deleted\n1 mean active\n2 mean not approvd'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`id`, `student_id`, `password`, `name`, `created_at`, `approve_by`, `status`) VALUES
(1, '123456789', '123', 'Rizwan Khan', '1579770168035', 1, 1),
(4, 'Nisi inventore ', 'Pa$$w0rd!', 'Facilis tempor non r', '1579965222898', 1, 1),
(5, '111', 'user', 'hh hh', '1580380502470', NULL, 2),
(9, '12345789', '12345', 'abcdefg', '1580383908617', NULL, 2),
(11, '123', '12345', 'hgsfdhgafs', '1580466776392', NULL, 2),
(12, 'qqqq', 'dsass', 'abc', '1580466974522', NULL, 2),
(13, '17391230', '1234', 'Rahman', '1580737926261', 1, 1),
(15, '12345670', '1234', 'Omar', '1580738185304', NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_session`
--

CREATE TABLE `user_session` (
  `id` int(11) NOT NULL,
  `hash` varchar(45) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` varchar(15) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1' COMMENT '1 mean active\n0 mean deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_session`
--

INSERT INTO `user_session` (`id`, `hash`, `user_id`, `created_at`, `status`) VALUES
(1, '60ac71ceba1fe67e67d78b152cfe5132', 1, '1579784981457', 0),
(2, 'a5ceece52c64621461c184befc646c78', 1, '1579789193659', 1),
(3, '86069a71698e227acfad73f867beecc1', 1, '1579789214107', 1),
(4, 'c431410fad28e00fee65d16c875e77cd', 1, '1580372509316', 1),
(5, '11c793100aca20736959b0a9929e4052', 1, '1580377307237', 1),
(6, '8ea4465e2f520117c433b820aca179b8', 1, '1580377396494', 1),
(7, 'c59993fd9c12e96dc698ea046cbc3a82', 1, '1580378024504', 1),
(8, '5a7d89a061b430a62d2d120d7d97f1c5', 1, '1580379712883', 1),
(9, '0af039c4dfabd56df27b2d33155a77c1', 1, '1580379715781', 1),
(10, 'a9be3c3b80e947765db16663e599d379', 1, '1580379716811', 1),
(11, '1a4ad2377f1749eb08b626a86de407cf', 1, '1580379717159', 1),
(12, '1a4ad2377f1749eb08b626a86de407cf', 1, '1580379717440', 1),
(13, '1a4ad2377f1749eb08b626a86de407cf', 1, '1580379717695', 1),
(14, '0c337d1abca93a7086e6e181953411b6', 1, '1580379730969', 1),
(15, '2e92b1ff7cd9caf839722b840c56da7b', 1, '1580379810617', 1),
(16, '317449f109535493c3efcb8d28a8d7b0', 1, '1580379958651', 1),
(17, '9ab8fd24ac044ad2059f19fa3ceb8531', 1, '1580379995525', 1),
(18, '03be5529f86bd10cebf37838a25d748f', 1, '1580380030562', 1),
(19, 'e476139b684385a39c86c25bf26676a9', 1, '1580380041501', 1),
(20, '7853f5ee53b28da4a0c924f737f366d6', 1, '1580380075431', 1),
(21, 'd61b42f99a3b401e21fce57431d5d9ca', 1, '1580380140711', 1),
(22, 'f7e9e707e81e61829fcbf5ad6488c5f7', 1, '1580380141426', 1),
(23, '2bc64c5bbaf784ae4dd8e1cabbe72b2e', 1, '1580380212111', 1),
(24, 'b13c4c9ec05e3a1230d3c0f053cb44b7', 1, '1580380262422', 1),
(25, '6d64f1cdc848e16154f87cf93a2afffc', 1, '1580380638849', 1),
(26, 'ae7688b0cc11d9654c479a8a09d0bf77', 1, '1580380804811', 1),
(27, '420be6085eedb1d13280ccef7e0bea57', 1, '1580380879665', 1),
(28, '0fc277d714d1847f0887da9e73aac991', 1, '1580380927274', 1),
(29, '0d0ba725528e1fbc89f697db0dca8bf0', 1, '1580381052880', 1),
(30, '91677e13dcd8f3a85d284afa546516b8', 1, '1580381167287', 1),
(31, 'a22893df43b485f6cc0b66e16a97e3a5', 1, '1580381776120', 1),
(32, '16bfcc580116060a299335915bdb2423', 1, '1580382059870', 1),
(33, 'f68111e4524c93fc7112417670f27c0a', 1, '1580383100433', 1),
(34, 'b97c691f99cbc2a2a1f7346d3291915d', 1, '1580383101842', 1),
(35, 'a022e1e2c950f6c457d641314330045b', 1, '1580384830222', 1),
(36, '34bff5fec0287e03a438b7c580d077f8', 1, '1580385030290', 1),
(37, 'dc3f5915c281adf765df9c3fa8447ac8', 1, '1580385162431', 1),
(38, 'baf9edbcf1aedf35dfe239eada7e8284', 1, '1580385357433', 1),
(39, '840708a98a4f58a3de5cc078439e52ad', 1, '1580385458289', 1),
(40, 'd68993bd0b1433d81eae641b7625d53a', 1, '1580385529106', 1),
(41, 'e09e3d5de168ddabc328cdfe356c6bf1', 1, '1580385576975', 1),
(42, 'e6cf7ba3f8cb84a4c05646eac1e009b3', 1, '1580386074742', 1),
(43, '7f200e3ca537441640d6097d28f8754c', 1, '1580386382212', 1),
(44, 'b05a3243a52608e0bf805043ac4a5fa1', 1, '1580386478441', 1),
(45, 'f1669ff46593d55d89536351e9a1faf8', 1, '1580386620928', 1),
(46, '00ee0447ca90fcb77d4882f3155cb0d5', 1, '1580386764170', 1),
(47, '0b5d0cbfc7444312d3b838214fe8fbf3', 1, '1580388781319', 1),
(48, '4a1e009ebff8de1d3026b1d1b5c12a3e', 1, '1580388836315', 1),
(49, 'badb0fe74c6d6fb835c96c284cb0bdbc', 1, '1580389543138', 1),
(50, 'dd6a7db7c2850d5be4658ef7a2cbe6c6', 1, '1580389632820', 1),
(51, 'dce8ae9da124c08b5e89350a48b0ce73', 1, '1580389668823', 1),
(52, '7e6e61bed0e7cb0aff96c46ec7450fb9', 1, '1580389801478', 1),
(53, 'b510e85e53b2ccaf33dcfebe0d4057d0', 1, '1580389892727', 1),
(54, '04ff0484209ce25b1c1f4953ab0b8ee9', 1, '1580389953936', 1),
(55, '04ff0484209ce25b1c1f4953ab0b8ee9', 1, '1580389953952', 1),
(56, '31cf219d34111318677304fd55948670', 1, '1580390064164', 1),
(57, '4d4b99fe026e00964846aa3fb7eeb48b', 1, '1580390207077', 1),
(58, '98ac294dd8fb02813c0edc4ee9fd334d', 1, '1580390506791', 1),
(59, 'f97ef47ab86a4155973e3d6cb60f7ad9', 1, '1580390973858', 1),
(60, '2554e0b04ab53c1016cb9bcbce2a18e5', 1, '1580391080441', 1),
(61, '88c1570184b797bffc22df8d7d1baca4', 1, '1580391192913', 1),
(62, '36abb2175a37d9638b974ba606af475c', 1, '1580391255401', 1),
(63, '083248b8d5479a4e699cdb8dc5508708', 1, '1580391448463', 1),
(64, '8a7631acfc15b45485a1204a1f9c4a77', 1, '1580391586536', 1),
(65, 'ff000e44f6a349d6d836a5b7d1e51a08', 1, '1580392560925', 1),
(66, '01002f70a0d18d890313a25ea790e65c', 1, '1580392582021', 1),
(67, '5f0825403813f3384f5be381feef4b8a', 1, '1580392641130', 1),
(68, 'b68798e38a0e5f173a1d6d96c6e1b408', 1, '1580392681409', 1),
(69, 'aaa484935840a59e058946c8c6b4874b', 1, '1580392714650', 1),
(70, '9b617d20c853ce3ad8e6cd44b837e217', 1, '1580392903508', 1),
(71, '62e059f61b2705bf8cda116c5c00b50f', 1, '1580392963566', 1),
(72, '72722b6f15c63e053d7bbcf7e95985be', 1, '1580392993467', 1),
(73, '530dda2c0755315b77a23a4f598d0e5e', 1, '1580393421543', 1),
(74, 'd83ba165a853dea2eaac0271180873a6', 1, '1580393462824', 1),
(75, 'b28befd19156b3adcc5a54525159601e', 1, '1580393545128', 1),
(76, '75d38ee779a35dc463cd86e173dc9e97', 1, '1580393984971', 1),
(77, '0e8ff4c60cd3a4f017fc021fc8f7038c', 1, '1580394052512', 1),
(78, 'f80e1dd7dce4dca596322069facf383d', 1, '1580394174282', 1),
(79, 'f19e90920ff4d82267cef4bcddfaf01b', 1, '1580394435977', 1),
(80, '485c22dc4846ecfb202a5acaeb611021', 1, '1580394497402', 1),
(81, '6621a08ce684b414d23fb81b990119f6', 1, '1580394647676', 1),
(82, '5c9b8f2255e1c6dc671a9205d38a8f71', 1, '1580394648730', 1),
(83, '53b5b56c3e18bebcf4cf3626e93ecb04', 1, '1580395215711', 1),
(84, '2ebc7735b43ce323b3caa8be359bf273', 1, '1580397570925', 1),
(85, '7d8ed2d40e9806ed45406fd12e398529', 1, '1580397572003', 1),
(86, '0f236b3c10d056011dbdc1b45124833c', 1, '1580397585159', 1),
(87, 'f1058401a503c192fcfeb7d33db51740', 1, '1580397663682', 1),
(88, '1a1d27c6875b962c29ad613512a322af', 1, '1580397816271', 1),
(89, '100c79c26de33c76e9d47814b8fb8456', 1, '1580397914402', 1),
(90, '8e146c184549b8e1ca11453b297172a3', 1, '1580398190517', 0),
(91, '78020c520a5657b0ff274e1782c7d134', 9, '1580453419107', 1),
(92, 'b8e0b1519a7d6f2027231486af0b2a88', 1, '1580453555404', 1),
(93, 'a57e834dad33e285f1c52849549b9404', 1, '1580466756789', 1),
(94, '6f1f42ccdd75bfc40ca08ec5feaa47a2', 1, '1580466989638', 0),
(95, '98d12dfc15f8fdb92dc0f2109c0ff925', 1, '1580469168509', 0),
(96, '0b17653b3fc8f9a2b2296e40168bcc24', 1, '1580469793061', 0),
(97, 'd493463675414715dfd4860fc2e810fb', 1, '1580470207669', 0),
(98, '314ca399d26b7689577a058e1f738f7e', 1, '1580470269861', 0),
(99, 'ddb7e05275444e9b54dc841a50d274b9', 1, '1580471428200', 1),
(100, 'f314722bb03446300bfd29ac1a145199', 13, '1580737956618', 0),
(101, '3a169ed95a1f6ad3c2aeb002089a30de', 13, '1580738399248', 0),
(102, '2340bcf0e4ef246bda6fbccd7a992d2f', 1, '1580739924815', 1),
(103, 'b02b1588d36264b9a41bb793bedc8a42', 13, '1580740243188', 0),
(104, '463aaaa2aeecd1af2fa4390c87c13f16', 13, '1580741747086', 0),
(105, 'ac0e55e62d5cce01026cac08eff1bd40', 13, '1580741802728', 0),
(106, '84d64b4ee1d3fe6dfb045cdacb62c040', 13, '1580741873593', 0),
(107, '3fc8b8cbc1771ddef2e90f13f444f9f0', 1, '1580805190318', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_account`
--
ALTER TABLE `admin_account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `staff_id` (`staff_id`),
  ADD KEY `admin_createdby_FK` (`created_by`);

--
-- Indexes for table `admin_session`
--
ALTER TABLE `admin_session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_Admin_FK` (`admin_id`);

--
-- Indexes for table `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dxf`
--
ALTER TABLE `ebook`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paper`
--
ALTER TABLE `paper`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_bookings`
--
ALTER TABLE `room_bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_type_br_FK` (`user_id`);

--
-- Indexes for table `room_booking_request`
--
ALTER TABLE `room_booking_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid_pb_FK` (`user_id`);

--
-- Indexes for table `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD KEY `user_approveby_FK` (`approve_by`);

--
-- Indexes for table `user_session`
--
ALTER TABLE `user_session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid_sessionFK` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_account`
--
ALTER TABLE `admin_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `admin_session`
--
ALTER TABLE `admin_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `catalog`
--
ALTER TABLE `catalog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `dxf`
--
ALTER TABLE `ebook`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `paper`
--
ALTER TABLE `paper`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `room_bookings`
--
ALTER TABLE `room_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `room_booking_request`
--
ALTER TABLE `room_booking_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `room_types`
--
ALTER TABLE `room_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_session`
--
ALTER TABLE `user_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_account`
--
ALTER TABLE `admin_account`
  ADD CONSTRAINT `admin_createdby_FK` FOREIGN KEY (`created_by`) REFERENCES `admin_account` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `admin_session`
--
ALTER TABLE `admin_session`
  ADD CONSTRAINT `session_Admin_FK` FOREIGN KEY (`admin_id`) REFERENCES `admin_account` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `room_bookings`
--
ALTER TABLE `room_bookings`
  ADD CONSTRAINT `user_type_br_FK` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `room_booking_request`
--
ALTER TABLE `room_booking_request`
  ADD CONSTRAINT `userid_pb_FK` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_account`
--
ALTER TABLE `user_account`
  ADD CONSTRAINT `user_approveby_FK` FOREIGN KEY (`approve_by`) REFERENCES `admin_account` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
