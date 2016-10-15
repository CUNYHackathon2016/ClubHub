var http = require('http');
var server = http.createServer();

var app = require('./server/index.js')();

server.on('request', app);

var PORT = process.env.PORT || 5000;

server.listen(PORT, function () {
    console.log('The server is listening on port 5000!');
});


// SOCKETIO part
var io = require('socket.io')(server);
var users = [];
var combinedSchedule = [];

io.on('connection', function(socket){
  socket.on('create', function(nickname, roomcode,schedule){
    socket.join(roomcode);
    socket.roomcode = roomcode;
    socket.nickname = nickname;
    users.push(nickname);
    schedule.forEach(function(evt){
      evt.color = "red";
      console.log(evt);
      combinedSchedule.push(evt);
    });

    // io.to(roomcode).emit('update users', scoresInRooms[roomcode]);
  });
  socket.on('join', function(nickname, roomcode,schedule){
    socket.join(roomcode);
    socket.roomcode = roomcode;
    socket.nickname = nickname;
    users.push(nickname);
    schedule.forEach(function(evt){
      evt.color = "blue";
      combinedSchedule.push(evt);
    });
    io.to(roomcode).emit('update schedule', users, combinedSchedule);
    
  });
  socket.on('chat message', function(msg){
    io.to(socket.roomcode).emit('chat message', socket.nickname, msg);
  });
});
