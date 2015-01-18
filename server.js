var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(request, response){
  response.render('index.ejs')
});

var port = process.env.PORT || 3000

server.listen(port, function(){
  console.log("Listening on port " + port)
});

module.exports = server;