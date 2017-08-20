module.exports = function (socket) {

  console.log('connection on team namespace');
  socket.localData = {};

  socket.on('addPlayer', (playerName, response) => {
    console.log('request for new player : ', playerName);
    const otherNames = getAllPlayerSocket()
      .filter(socketTeam => socketTeam.id !== socket.id)
      .map(otherSocket => otherSocket.localData.name);

    const newNameIsAvailable = otherNames.indexOf(playerName) === -1;
    if (newNameIsAvailable) {
      socket.localData.name = playerName;
    }
    console.log('Name \'' + playerName + '\' is ' + (newNameIsAvailable ? '' : 'NOT ') + 'available');
    response(newNameIsAvailable);
    updateAllPlayers();
  });

  socket.on('answer', (answer, response) => {
    socket.localData.answer = answer;
    socket.localData.date = new Date();
    response(socket.localData.date);
    console.log(socket.localData.name + ' choose : ' + answer + ' at ' + socket.localData.date);
    updateAllPlayers();
  });

  function updateAllPlayers() {
    const allPlayer = getAllPlayerSocket()
      .map(playerSocket => playerSocket.localData);
    socket.nsp.emit('allPlayers', allPlayer);
    console.log('Players list updated', allPlayer);
  }

  function getAllPlayerSocket() {
    const socketObj = socket.nsp.sockets;
    return Object.keys(socketObj)
      .map(socketID => socketObj[socketID])
      .filter(socket => socket.localData.name);
  }

};
