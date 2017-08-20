import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

const LOCALSTORAGE_PLAYER_NAME = 'playerName';

@Component({
  selector: 'lq-player-name',
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.scss']
})
export class PlayerNameComponent implements OnInit {

  playerName: string;
  available = true;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playerName = localStorage.getItem(LOCALSTORAGE_PLAYER_NAME) || '';
  }

  valider(): void {
    if (!this.playerName) {
      return;
    }

    this.playerService.addPlayer(this.playerName)
      .subscribe(isOk => {
        localStorage.setItem(LOCALSTORAGE_PLAYER_NAME, this.playerName);
        this.available = isOk;
      });
  }

}
