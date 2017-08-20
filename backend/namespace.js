module.exports = function (io) {

  console.log('create namespace player');
  io.of('/player').on('connection', require('./namespaces/player'));

  console.log('create namespace admin');
  io.of('/admin').on('connection', require('./namespaces/admin'));

};
