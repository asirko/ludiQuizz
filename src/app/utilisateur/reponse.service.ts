import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class ReponseService {

  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  envoyerReponse(question: any) {
    this.socket.emit('reponse', question);
  }

  getReponses$() {
    return new Observable(observer => {
      this.socket.on('reponses', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  envoyerPossibilites(possibilites: any) {
    this.socket.emit('possibilites', possibilites);
  }

  getPossibilites$() {
    return new Observable(observer => {
      this.socket.on('possibilites', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

}
