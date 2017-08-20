import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';
import 'rxjs/add/operator/filter';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'lq-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  displayPopinName = true;
  playerName: string;
  choices: string[];
  selectedAnswer: string;
  dateOfAnswer: Date;

  constructor(private playerService: PlayerService,
              private adminService: AdminService) { }

  ngOnInit() {
    this.playerService.getPlayerName$()
      .filter(name => name !== null)
      .subscribe(newName => {
        this.playerName = newName;
        this.displayPopinName = false;
      });

    this.adminService.getChoices$().subscribe(choices => {
      this.choices = choices;
      this.selectedAnswer = null;
      this.dateOfAnswer = null;
    });
  }

  sendAnswer(answer: string): void {
    this.playerService.sendAnswer(answer).subscribe(date => {
      this.dateOfAnswer = date;
    });
    this.selectedAnswer = answer;
  }
}
