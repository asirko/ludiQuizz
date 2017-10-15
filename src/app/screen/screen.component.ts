import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';

import { PlayerService } from '../player/player.service';
import { Player } from '../player/player';
import { Question } from '../admin/question';
import { AdminService } from '../admin/admin.service';
import { formatDiffDate, formatDiffDateShort } from '../shared/date.utils';

@Component({
  selector: 'lq-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  players$: Observable<Player[]>;
  question$: Observable<Question>;
  displayAnswer$: Observable<boolean>;
  startingDate: Date;
  timeSinceStarted$: Observable<string>;

  constructor(private playerService: PlayerService,
              private adminService: AdminService) { }

  ngOnInit() {
    this.players$ = this.playerService.getPlayers$();
    this.question$ = this.adminService.getQuestion$();
    this.displayAnswer$ = this.adminService.getDisplayAnswer$();
    this.adminService.getStartingDate$()
      // the date on the server might be different from the screen
      .subscribe(date => this.startingDate = date);

    const newDate = this.adminService.getStartingDate$().filter(d => !!d);
    const nullDate = this.adminService.getStartingDate$().filter(d => !d);

    this.timeSinceStarted$ = newDate
      .mergeMap(() => Observable.interval(10).takeUntil(nullDate))
      .map(() => formatDiffDateShort(new Date(), this.startingDate));
  }

  getFormattedTiming(date: Date): string {
    return formatDiffDate(date, this.startingDate);
  }

  orderByDate(players: Player[]): Player[] {
    return players && players.sort((a, b) => {
      const timeA = a.date ? a.date.getTime() : 9999999999999999;
      const timeB = b.date ? b.date.getTime() : 9999999999999999;
      return timeA - timeB;
    });
  }
}
