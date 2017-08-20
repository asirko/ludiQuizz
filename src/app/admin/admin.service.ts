import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SOCKET_END_POINT } from '../shared/socket.utils';
import { Question } from './question';
import * as io from 'socket.io-client';

const ADMIN_NAMESPACE = '/admin';

@Injectable()
export class AdminService {

  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io(ADMIN_NAMESPACE, {path: SOCKET_END_POINT});
  }

  sendQuestion(question: Question): void {
    this.socket.emit('question', question);
  }

  getQuestion$(): Observable<Question> {
    return new Observable(observer => {
      this.socket.on('question', (question) => {
        observer.next(question);
      });
    });
  }

  sendChoices(choices: string[]): void {
    this.socket.emit('choices', choices);
  }

  getChoices$(): Observable<string[]> {
    return new Observable(observer => {
      this.socket.on('choices', choices => {
        observer.next(choices);
      });
    });
  }

  sendDisplayAnswer(displayAnswer: boolean): void {
    this.socket.emit('displayAnswer', displayAnswer);
  }

  getDisplayAnswer$(): Observable<boolean> {
    return new Observable(observer => {
      this.socket.on('displayAnswer', displayAnswer => {
        observer.next(displayAnswer);
      });
    });
  }

}
