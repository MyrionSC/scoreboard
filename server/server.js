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
    "time": 90
  },
  {
    "activity": "vikingespil",
    "team": "hold2",
    "time": 32
  },
  {
    "activity": "svømning",
    "team": "hold3",
    "time": 42
  },
  {
    "activity": "blah",
    "team": "hold4",
    "time": 80.234
  }
];

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

// express
// app.get('/', function(req, res) {
//   // console.log("user connected");
//   res.sendFile('index.html');
// });
// app.get('/admin', function(req, res) {
//   console.log("admin connected");
//   res.sendFile('admin.html');
// });
// app.get('/score', function (req, res) {
//   console.log("score request gotten");
//   res.send(score);
// });

// socket.io
io.on('connection', function(socket){
  console.log('a socket connected');
  socket.emit('score_change', score);





  socket.on('something', function(data){
    // io.emit('score_change', score);
    console.log(data);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(app.get('port'), function() {
  console.log('app running on port', app.get('port'));
});



// middleware example
// app.use(function (req, res, next) {
//   console.log('Time:', Date.now());
//   next();
// });


