var express = require('express'),
    path = require('path'),
    fs = require('fs');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var util = require('util');

var staticRoot = __dirname + '/';
app.set('port', (process.env.PORT || 3000));
app.use(express.static(staticRoot));

// read score data into memory, if file exists
var score = fs.existsSync(staticRoot + "score.json") ?
  eval(JSON.parse(fs.readFileSync(staticRoot + "score.json", 'utf8'))) : createScoreFile();
var newsList = ['Velkommen til NIH Special Olympics!'];
var rotationStarted = false;

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

  var data = {
    'score': score,
    'news': newsList,
    'rotationStarted': rotationStarted
  }

  socket.emit('init', data); // init scoreboard client with current score and news

  socket.on('new_news', function(new_news) {
    console.log('new news item received: ' + new_news);

    newsList.unshift(new_news);
    if (newsList.length > 4) {
      newsList.pop();
    }

    io.emit('new_news', new_news);
  });

  socket.on('rotation_change', function (rotation_status) {
    console.log('new rotation status received: ' + rotation_status);
    rotationStarted = rotation_status;
    io.emit('rotation_change', rotation_status);
  });

  socket.on('new_score', function(new_score){
    console.log("new score received from admin:");
    console.log(JSON.stringify(new_score));

    score = new_score;

    // save to file
    fs.writeFileSync(staticRoot +'/score.json', JSON.stringify(score) , 'utf-8');

    // emit to scoreboard clients
    io.emit('score_change', new_score);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});



//// helper functions
function createScoreFile() {
  var tempScoreData = [
    {"teamLeader": "Anlo + Anne", "activity": "Dart", "goldTeam": "Gold blah", "goldScore": "Gold Score 1ssdd", "silverTeam": "Silver Team 1", "silverScore": "Silver Score 1", "bronzeTeam": "Bronze Team 1", "bronzeScore": "Bronze Score 1"},
    {"teamLeader": "Bülow", "activity": "Sandslot", "goldTeam": "Gold Team 2 sssdddddddddddddddd", "goldScore": "Gol 2", "silverTeam": "Silver Team 2", "silverScore": "Silver Score 2", "bronzeTeam": "Bronze Team 2", "bronzeScore": "Bronze Score 2"},
    {"teamLeader": "Esma", "activity": "Langrend", "goldTeam": "Gold Team 3", "goldScore": "Gold Score 3", "silverTeam": "Silver Team 3", "silverScore": "Silver Score 3", "bronzeTeam": "Bronze Team 3", "bronzeScore": "Bronze Score 3"},
    {"teamLeader": "Bur", "activity": "Blindebold", "goldTeam": "Gold Team 4", "goldScore": "Gold Score 4", "silverTeam": "Silver Team 4", "silverScore": "Silver Score 4", "bronzeTeam": "Bronze Team 4", "bronzeScore": "Bronze Score 4"},
    {"teamLeader": "Garde", "activity": "Dressur", "goldTeam": "Gold Team 5", "goldScore": "Gold Score 5", "silverTeam": "Silver Team 5", "silverScore": "Silver Score 5", "bronzeTeam": "Bronze Team 5", "bronzeScore": "Bronze Score 5"},
    {"teamLeader": "Xenia", "activity": "Udspring", "goldTeam": "Gold Team 6", "goldScore": "Gold Score 6", "silverTeam": "Silver Team 6", "silverScore": "Silver Score 6", "bronzeTeam": "Bronze Team 6", "bronzeScore": "Bronze Score 6"},
    {"teamLeader": "Richard + Mike", "activity": "Curling", "goldTeam": "Gold Team 7", "goldScore": "Gold Score 7", "silverTeam": "Silver Team 7", "silverScore": "Silver Score 7", "bronzeTeam": "Bronze Team 7", "bronzeScore": "Bronze Score 7"},
    {"teamLeader": "Bond", "activity": "Diskos kast", "goldTeam": "Gold Team 8", "goldScore": "Gold Score 8", "silverTeam": "Silver Team 8", "silverScore": "Silver Score 8", "bronzeTeam": "Bronze Team 8", "bronzeScore": "Bronze Score 8"},
    {"teamLeader": "Simon", "activity": "Bueskydning", "goldTeam": "Gold Team 9", "goldScore": "Gold Score 9", "silverTeam": "Silver Team 9", "silverScore": "Silver Score 9", "bronzeTeam": "Bronze Team 9", "bronzeScore": "Bronze Score 9"},
    {"teamLeader": "Horne", "activity": "Sejlads", "goldTeam": "Gold Team 10", "goldScore": "Gold Score 10", "silverTeam": "Silver Team 10", "silverScore": "Silver Score 10", "bronzeTeam": "Bronze Team 10", "bronzeScore": "Bronze Score 10"},
    {"teamLeader": "Morten", "activity": "Skak", "goldTeam": "Gold Team 11", "goldScore": "Gold Score 11", "silverTeam": "Silver Team 11", "silverScore": "Silver Score 11", "bronzeTeam": "Bronze Team 11", "bronzeScore": "Bronze Score 11"},
    {"teamLeader": "Daniel", "activity": "Klatring", "goldTeam": "Gold Team 12", "goldScore": "Gold Score 12", "silverTeam": "Silver Team 12", "silverScore": "Silver Score 12", "bronzeTeam": "Bronze Team 12", "bronzeScore": "Bronze Score 12"},
    {"teamLeader": "Ida", "activity": "Boldspil", "goldTeam": "Gold Team 13", "goldScore": "Gold Score 13", "silverTeam": "Silver Team 13", "silverScore": "Silver Score 13", "bronzeTeam": "Bronze Team 13", "bronzeScore": "Bronze Score 13"},
    {"teamLeader": "Iversen", "activity": "Skiskydning", "goldTeam": "Gold Team 13", "goldScore": "Gold Score 13", "silverTeam": "Silver Team 13", "silverScore": "Silver Score 13", "bronzeTeam": "Bronze Team 13", "bronzeScore": "Bronze Score 13"}
  ];

  fs.writeFileSync(staticRoot +'score.json', JSON.stringify(tempScoreData) , 'utf-8');
  return tempScoreData;
}


//// on startup
http.listen(app.get('port'), function() {
  console.log('app running on port', app.get('port'));
});
