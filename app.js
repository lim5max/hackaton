var io = require('socket.io');
var express = require('express');

var app = express()
var io = io.listen(app);

app.listen(80);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});