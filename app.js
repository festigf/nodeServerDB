var http = require('http');
var conta=0;
var server = http.createServer(function (request, response)
     {   conta+=1; 
         console.log('request starting...'+conta);    
         // respond    
         response.write('hello client!');    
         response.end();
    });

server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');