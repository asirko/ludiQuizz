import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Question } from './admin/question';
import * as io from 'socket.io-client';

@Injectable()
export class QuestionService {

  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  envoyerQuestion(question: Question) {
    this.socket.emit('question', question);
  }

  getQuestion$() {
    return new Observable(observer => {
      this.socket.on('question', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

}
