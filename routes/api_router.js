var express = require("express");
var bodyParser= require("body-parser");
const util = require('util')

var mysql = require('mysql');

var sConnection={
		host: 'localhost',
		port: 3306, 
		user: 'root',
		password: 'root',
		database: 'dbUsers',
		multipleStatements: true};

var ALLOWED_IPS = [
"127.0.0.1",
"192.168.56.1"
];
var api = express.Router();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.use(function(req, res, next) {
    console.log(req.ip);
    var userIsAllowed = ALLOWED_IPS.indexOf(req.ip) !== -1;
    if (!userIsAllowed) {
        res.status(401).send("Not authorized!");
    } else
     {
        next();
    }
});
api.get("/users", function(req, res) { 
  console.log(req.url);  
  res.end(req.url);
});
api.post("/user", function(req, res) { 
  console.log(util.inspect(req.body, false, null, true ))
  console.log(req.body.Cognome);
  res.end(req.body.Cognome);

 });
api.get("/messages", function(req, res) { /* ... */ });
api.post("/message", function(req, res) { /* ... */ });


api.get("/getUser",function(req,res){
	connection= mysql.createConnection(sConnection)	;
	connection.connect(function(err){
		if (!err){
            var sQuery="select id,Cognome,Nome from tblUsers where ID=?;";	
            console.log(sQuery);
			var data=[];
			data.push(req.query.id);
			
			console.log(data);
	        
			connection.query(sQuery,data,function(err,rows,fields){
		      if (err) 
				res.sendStatus(500); //Internal Server Error
                else
                console.log(util.inspect(err, false, null, true ))    
                console.log(util.inspect(rows, false, null, true ))    
				res.json(rows); //resituisce tutti i records in formato json
				console.log(rows);
			})
		}
	})
})

api.delete("/delUser",function(req,res){
	connection= mysql.createConnection(sConnection)	;
	connection.connect(function(err){
		if (!err){
            var sQuery="delete from tblUsers where ID=?;";	
            console.log(sQuery);
			var data=[];
			data.push(req.query.id);
			
			console.log(data);
	        
			connection.query(sQuery,data,function(err,rows,fields){
				if (err) 
					res.sendStatus(500); //Internal Server Error
						  else if (rows.affectedRows==0){
							  console.log("affectedRows");
		  
							  res.sendStatus(401); //non ha trovato il record
						  }
				  else   {
							  console.log("Cancellato");
							  res.status(200).send({status: 200, Message: "Del OK" });
							  //res.sendStatus(200); // Record cancellato con successo!
						  }
					  })
		}
	})
})


api.put('/editUser', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
		var sQuery="UPDATE tblUsers SET Cognome=?, Nome = ? WHERE id = ?;";
		var data = [];
		data.push(req.body.Cognome);
		data.push(req.body.Nome);
		data.push(req.body.id);
		console.log(req.body.Cognome);
		console.log(req.body.Nome);
		console.log(req.body.id);
		
		connection.query(sQuery, data, function(err, rows, fields) {
			if (err) 
			{	console.log(err);
				res.sendStatus(500); //Internal Server Error
			}
			else if (rows.affectedRows==0)
			{
				var sQuery2="INSERT INTO tblUsers(Cognome,Nome) VALUES(?,?)";
				connection.query(sQuery2, data, function(err, rows, fields) {
					if (err) 
					{
						console.log(err);
						res.sendStatus(500); //Internal Server Error
					}						
					else   
					console.log(util.inspect(rows, false, null, true ));
    				console.log(util.inspect(fields, false, null, true ));
					res.status(200).send({ 
						status:  200, 
						Message: "Ins OK",
						data: 	 req.body  
					});
					//	res.sendStatus(200)
				});
			}
			else   
			{
				console.log(util.inspect(req.body, false, null, true ))
				res.status(200).send({ 
						status:  200, 
						Message: "Mod OK",
						data:    req.body   
					});
			}
		  }); 
	} else {
      console.log("Error connecting database ... ");    
      res.sendStatus(500); //Internal Server Error
    }
  });
});



module.exports = api;