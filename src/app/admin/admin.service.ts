import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SOCKET_END_POINT } from '../shared/socket.utils';
import { Question } from './question';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const ADMIN_NAMESPACE = '/admin';

@Injectable()
export class AdminService {

  socket: SocketIOClient.Socket;
  question$ = new BehaviorSubject<Question>(null);
  choices$ = new BehaviorSubject<string[]>(null);
  displayAnswer$ = new BehaviorSubject<boolean>(false);
  startingDate$ = new BehaviorSubject<Date>(null);

  constructor() {
    this.socket = io(ADMIN_NAMESPACE, {path: SOCKET_END_POINT});

    this.socket.on('question', question => this.question$.next(question));
    this.socket.on('choices', choices => this.choices$.next(choices));
    this.socket.on('displayAnswer', displayAnswer => this.displayAnswer$.next(displayAnswer));
    this.socket.on('startingDate', strDate => {
      this.startingDate$.next(strDate && new Date(strDate));
    });
  }

  sendQuestion(question: Question): void {
    this.socket.emit('question', question);
  }

  getQuestion$(): Observable<Question> {
    return this.question$.asObservable();
  }

  sendChoices(choices: string[]): void {
    this.socket.emit('choices', choices);
  }

  getChoices$(): Observable<string[]> {
    return this.choices$.asObservable();
  }

  sendDisplayAnswer(displayAnswer: boolean): void {
    this.socket.emit('displayAnswer', displayAnswer);
  }

  getDisplayAnswer$(): Observable<boolean> {
    return this.displayAnswer$.asObservable();
  }

  getStartingDate$(): Observable<Date> {
    return this.startingDate$.asObservable();
  }

  isStarted(): Observable<boolean> {
    return this.getStartingDate$().map(date => !!date);
  }

}
