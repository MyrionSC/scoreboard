var express = require('express'),
    path = require('path'),
    fs = require('fs');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var staticRoot = __dirname + '/';
app.set('port', (process.env.PORT || 3000));
app.use(express.static(staticRoot));

// test data
var score = [
  {
    "activity": "længdespring",
    "team": "hold1",
    "time": 40
  },
  {
    "activity": "blah",
    "team": "hold4",
    "time": 30.234
  }
];

//// express
app.use(function(req, res, next){
  // if the request is not html then move along
  var accept = req.accepts('html', 'json', 'xml');
  if(accept !== 'html'){
    return next();
  }

  // if the request has a '.' assume that it's for a file, move along
  var ext = path.extname(req.path);
  if (ext !== ''){
    return next();
  }

  // pass confirmed user to angular page
  res.sendFile(staticRoot + 'index.html');
});


//// socket.io
io.on('connection', function(socket){
  console.log('a socket connected');
  socket.emit('score_change', score); // init scoreboard client with current score

  socket.on('new_score', function(new_score){
    score = new_score;

    // save to file



    console.log("new score. Score is now:\n");
    print_score();
    console.log("\n");

    // emit to scoreboard clients
    io.emit('score_change', new_score);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(app.get('port'), function() {
  console.log('app running on port', app.get('port'));
  print_score();
});

var print_score = function () {
  for (var i = 0; i < score.length; i++) {
    var s = score[i];

    console.log("\n");
    console.log(s.activity);
    console.log(s.team);
    console.log(s.time);
  }
};

// on startup
