var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser')

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                    
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

var fs = require ('fs')

var twitterMarker = function(callback) {
  fs.readFile('./tweets.txt', 'utf8', function(err, data){
    if(err)
      callback(err)
    var array = new Array();

    var lines = data.split('\n')
    var filelength = lines.length
    lines.forEach(function(tweet, index, array){
      array.push(tweet)
        if (index === filelength - 1) {
          callback(null, JSON.parse(array))
        }
    })

    // console.log(data)
  })
}

app.get('/', function(request, response){
  response.render('index.ejs')
});

app.get('/markers', function(request, response){
  twitterMarker(function(err, markers){
    if(err)
      response.send(err)
    response.json(markers)
  });
});

var port = process.env.PORT || 3000

server.listen(port, function(){
  console.log("Listening on port " + port)
});


module.exports = server;