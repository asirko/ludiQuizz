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
  });

  socket.on('response', response => {
    socket.localData.response = response;
    socket.localData.date = new Date();
    console.log(socket.localData.name + ' choose : ' + response + ' at ' + socket.localData.date);
    updateAllPlayers()
  });

  function updateAllPlayers() {
    // todo
  }

  function getAllPlayerSocket() {
    const socketObj = socket.nsp.sockets;
    return Object.keys(socketObj)
      .map(socketID => socketObj[socketID])
      .filter(socket => socket.localData.name);
  }

};
