create database dbUsers;
use dbusers;
create table tblUsers(
  id int primary key not null auto_increment,
  Cognome varchar(100),
  Nome varchar(100)

);


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
End;



/*
set @Cognome = 'tiwwwzssio';
set @Nome = 'eeeecaiosss';
set @Id = 1;
set @nRows = -1;
set @newId = 0;
call dbusers.spEditUser(@Cognome, @Nome, @Id, @nRows, @newId);
select @Cognome, @Nome, @Id, @nRows, @newId;
*/