'use strict';

const bodyParser = require('body-parser');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const REPONSE_CANAL = 'reponse';
const REPONSES_CANAL = 'reponses';
const POSSIBILITES_CANAL = 'possibilites';
const QUESTION_CANAL = 'question';
const EQUIPES_CANAL = 'equipes';

let reponsesCourante = [];
const nomsEquipes = [];

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

  socket.on(POSSIBILITES_CANAL, possibilites => {
    console.log('nouvelle possibilité : ', JSON.stringify(possibilites));
    io.emit(possibilites, possibilites);
  });

  socket.on(QUESTION_CANAL, question => {
    console.log('nouvelle question : ', JSON.stringify(question));
    reponsesCourante = [];
    io.emit(REPONSES_CANAL, reponsesCourante);
    io.emit(QUESTION_CANAL, question);
  });
});

app.use(bodyParser.json());
app.post('/api/enregistrerEquipe', (req, res) => {
  if (req.body.nomEquipe && nomsEquipes.indexOf(req.body.nomEquipe) === -1) {
    res.statusCode(200);
    nomsEquipes.push(req.body.nomEquipe);
    io.sockets.emit(EQUIPES_CANAL, nomsEquipes);
  } else {
    res.statusCode(403);
  }
});

http.listen(3000, () => {
  console.log('Démarré sur le port 3000');
});
