import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as io from 'socket.io-client';
import { SOCKET_END_POINT } from '../shared/socket.utils';
import { Player } from './player';

const TEAM_NAMESPACE = '/player';

@Injectable()
export class PlayerService {

  socket: SocketIOClient.Socket;
  teamName$ = new BehaviorSubject<string>(null);

  constructor() {
    this.socket = io(TEAM_NAMESPACE, {path: SOCKET_END_POINT});
  }

  addPlayer(teamName: any): Observable<boolean> {
    return new Observable(observer => {
      this.socket.emit('addPlayer', teamName, isOk => {
        if (isOk) {
          this.teamName$.next(teamName);
        }
        observer.next(isOk);
        observer.complete();
      });
    });
  }

  sendAnswer(answer: string): Observable<Date> {
    return new Observable(observer => {
      this.socket.emit('answer', answer, strDate => observer.next(strDate && new Date(strDate)));
    });
  }

  resetAllAnswer(): void {
    this.socket.emit('resetAllAnswer');
  }

  getPlayers$(): Observable<Player[]> {
    return new Observable(observer => {
      this.socket.on('allPlayers', players => {
        players.forEach(p => p.date = p.date && new Date(p.date));
        observer.next(players)
      });
    });
  }

  getPlayerName$(): Observable<string> {
    return this.teamName$.asObservable();
  }

}
