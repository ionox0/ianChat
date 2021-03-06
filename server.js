var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    fs.appendFile('/var/log/chat', msg + '\n');
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3004, function(){
  console.log('listening on *:3004');
});
