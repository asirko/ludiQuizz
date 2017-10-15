module.exports = function (socket) {

  console.log('connection on admin');
  socket.nsp.localData = socket.nsp.localData || {};
  socket.emit('question', socket.nsp.localData.question);
  socket.emit('choices', socket.nsp.localData.choices);
  socket.emit('displayAnswer', socket.nsp.localData.displayAnswer);
  socket.emit('startingDate', socket.nsp.localData.date);

  socket.on('question', question => {
    console.log('New question : ', question);
    socket.broadcast.emit('question', question);
    socket.nsp.localData.question = question;
    updateTiming();
  });

  socket.on('choices', choices => {
    console.log('New choices : ', choices);
    socket.broadcast.emit('choices', choices);
    socket.nsp.localData.choices = choices;
    updateTiming();
  });

  socket.on('displayAnswer', displayAnswer => {
    console.log('Change display to : ', displayAnswer);
    socket.broadcast.emit('displayAnswer', displayAnswer);
    socket.nsp.localData.displayAnswer = displayAnswer;
  });

  function updateTiming() {
    if (socket.nsp.localData.question && socket.nsp.localData.choices) {
      socket.nsp.localData.date = new Date();
    } else {
      socket.nsp.localData.date = null;
    }
    socket.nsp.emit('startingDate', socket.nsp.localData.date);
  }

};
