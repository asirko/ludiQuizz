import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';

@Injectable()
export class AnswerService {

  private url = 'http://localhost:3000';
  private socket;

  constructor() { }

  envoyerReponse(message: any) {
    this.socket.emit('reponse', message);
  }

  getReponses$() {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('reponses', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
