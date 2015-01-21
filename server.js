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
  var stream = fs.createReadStream('./tweets.txt', {flags: 'r', encoding: 'utf-8'});
  var buf = '';

  stream.on('data', function(d) {
      buf += d.toString(); // when data is read, stash it in a string buffer
      pump(); // then process the buffer
  }).on('end', function(){
    callback(null, array) 
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
          var obj = JSON.parse(line); // parse the JSON
          if (obj.geo != null)
            array.push(obj.geo.coordinates);
      }

  }
}


app.get('/', function(request, response){
  response.render('index.ejs')
});

app.get('/markers', function(request, response){
  twitterMarker(function(err, markers){
    if(err)
      response.send(err)
    response.json(markers.length)
  });
});

var port = 3000

server.listen(port, function(){
  console.log("Listening on port " + port)
});


module.exports = server;
