'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', socket => {
  console.log('user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('answer', answer => {
    io.emit('answer', answer);
  });

  socket.on('question', question => {
    io.emit('question', question);
  });
});

http.listen(3000, () => {
  console.log('started on port 3000');
});
