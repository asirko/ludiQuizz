import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Question } from './admin/question';

@Injectable()
export class QuestionService {

  private url = 'http://localhost:3000';
  private socket;

  constructor() { }

  envoyerQuestion(question: Question) {
    this.socket.emit('question', question);
  }

  getMessages$() {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('question', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

}
