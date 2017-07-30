'use strict';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const REPONSE_CANAL = 'reponse';
const REPONSES_CANAL = 'reponses';
const QUESTION_CANAL = 'question';

let reponsesCourante = [];

io.on('connection', socket => {
  console.log('Nouvel utilisateur connecté');

  socket.on('disconnect', function(){
    console.log('Utilisateur déconnecté');
  });

  socket.on(REPONSE_CANAL, reponse => {
    reponse.date = new Date();
    reponsesCourante.push(reponse);
    console.log('nouvelle réponse : ', JSON.stringify(reponse));
    io.emit(REPONSES_CANAL, reponsesCourante);
  });

  socket.on('question', question => {
    console.log('nouvelle question : ', JSON.stringify(question));
    reponsesCourante = [];
    io.emit(REPONSES_CANAL, reponsesCourante);
    io.emit(QUESTION_CANAL, question);
  });
});

http.listen(3000, () => {
  console.log('Démarré sur le port 3000');
});
