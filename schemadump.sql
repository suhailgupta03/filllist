/*
SQLyog Community Edition- MySQL GUI v6.15
MySQL - 5.6.17 : Database - filllist
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `filllist`;

USE `filllist`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `product_info` */

DROP TABLE IF EXISTS `product_info`;

CREATE TABLE `product_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2122 DEFAULT CHARSET=latin1;

/* Procedure structure for procedure `get_product_info` */

/*!50003 DROP PROCEDURE IF EXISTS  `get_product_info` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `get_product_info`(in_productid int)
begin
	if in_productid is null then
		select * from product_info;
	else
		select * from product_info where product_id = in_productid;
	end if;
end */$$
DELIMITER ;

/* Procedure structure for procedure `insert_product_info` */

/*!50003 DROP PROCEDURE IF EXISTS  `insert_product_info` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_product_info`(in_productid int,in_position int,in_status int )
begin
	if in_productid is not null and in_position is not null and in_status is not null then
		insert into product_info (product_id,position,status) values (in_productid,in_position,in_status);
	end if;
end */$$
DELIMITER ;

/* Procedure structure for procedure `update_product_info` */

/*!50003 DROP PROCEDURE IF EXISTS  `update_product_info` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `update_product_info`(in_productid int,in_position int,in_status int )
begin
	if in_productid is not null and in_position is not null and in_status is not null then
		insert into product_info (product_id,position,status) values (in_productid,in_position,in_status)
		on duplicate key update product_info.position = (product_info.position + in_position), product_info.status = in_status;
	end if;
end */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
