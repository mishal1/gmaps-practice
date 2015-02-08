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
  var array = new Array();
  var stream = fs.createReadStream('./tweetslarge.txt', {flags: 'r', encoding: 'utf-8'});
  var buf = '';

  stream.on('data', function(d) {
    buf += d.toString(); // when data is read, stash it in a string buffer
    pump(); // then process the buffer
  }).on('end', function(){
    callback(null, array) 
    console.log(array.length)
  })

  function pump() {
    var pos;
    while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
      process(buf.slice(0,pos)); // hand off the line
      buf = buf.slice(pos+1); // and slice the processed data off the buffer
    }
  }

  function process(line) { // here's where we do something with a line
    if (line.length > 0) { // ignore empty lines
     // parse the JSON
     isJson(line)
    }
  }

  function isJson(str) {
    try {
      var obj = JSON.parse(str);
    } catch (e) {
      return false;
    }
    if (obj.geo != null && latIsFine(obj.geo.coordinates[0]) && longIsFine(obj.geo.coordinates[1])){
      array.push(obj.geo.coordinates);
      return true;
    } else{
      return true;
    }
  }

  function latIsFine (latitude){
    return latitude >= 51.514492 && latitude <= 51.520853
  }

  function longIsFine(longitude){
    return longitude >= -0.080306 && longitude <= -0.06515
  }
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

var port = 3000

server.listen(port, function(){
  console.log("Listening on port " + port)
});


module.exports = server;
