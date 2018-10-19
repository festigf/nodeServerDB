CREATE DATABASE  IF NOT EXISTS `dbusers` ;
USE `dbusers`;

DROP TABLE IF EXISTS `tblusers`;

CREATE TABLE `tblusers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Cognome` varchar(100) DEFAULT NULL,
  `Nome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;


DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `spEditUser`(  
 Cognome varchar(100),
 Nome varchar(100),
 Id int,
 OUT nRows int, 
 OUT newId int 
)
Begin  
    if (select count(*) as c from tblusers where tblusers.id=id) > 0   then
      UPDATE tblUsers SET tblUsers.Cognome=Cognome, tblUsers.Nome = Nome WHERE tblUsers.id = id;
      set nRows=1; -- ROW_COUNT();
      set newId=id ; 
    else
    
      insert into tblusers(Cognome,Nome) values(Cognome,Nome);
      set newId= Last_Insert_ID() ;
      set nRows=ROW_COUNT();
    end if;
End ;;
DELIMITER ;

LOCK TABLES `tblusers` WRITE;
INSERT INTO `tblusers` VALUES (1,'Rosssi','Paolo'),(2,'nuovo','utente');
UNLOCK TABLES;
