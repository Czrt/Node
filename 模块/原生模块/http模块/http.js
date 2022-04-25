var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, "success", { "Content-Type": "text/html; charset=UTF-8" })
    response.end("你好，世界")
}).listen(3000);


// var http = require('http');

// http.createServer(function (request, response) {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('Hello World\n');
// }).listen(8888);

// console.log('Server running at http://127.0.0.1:8888/');