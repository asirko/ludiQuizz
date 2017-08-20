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

  chooseName = true;
  playerName: string;
  choices: string[];
  selectedChoice: string;

  constructor(private nomEquipeService: PlayerService,
              private adminService: AdminService) { }

  ngOnInit() {
    this.nomEquipeService.getPlayerName$()
      .filter(name => name !== null)
      .subscribe(newName => {
        this.playerName = newName;
        this.chooseName = false;
      });

    this.adminService.getChoices$().subscribe(choices => {
      this.choices = choices;
      console.log('ici')
      this.selectedChoice = null;
    });
  }

}
