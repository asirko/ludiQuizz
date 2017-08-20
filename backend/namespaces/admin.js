module.exports = function (socket) {

  console.log('connection on admin');
  socket.localData = {};

  socket.on('question', question => {
    console.log('New question : ', question);
    socket.broadcast.emit('question', question);
  });

  socket.on('choices', choices => {
    console.log('New choices : ', choices);
    socket.broadcast.emit('choices', choices);
  });

  socket.on('displayAnswer', displayAnswer => {
    console.log('Change display to : ', displayAnswer);
    socket.broadcast.emit('displayAnswer', displayAnswer);
  });

};
