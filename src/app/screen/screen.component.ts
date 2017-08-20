import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { Observable } from 'rxjs/Observable';
import { Player } from '../player/player';

@Component({
  selector: 'lq-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  players$: Observable<Player[]>;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.players$ = this.playerService.getPlayers$();
  }

}
