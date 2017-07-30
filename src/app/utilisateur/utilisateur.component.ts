import { Component, OnInit } from '@angular/core';
import { AnswerService } from './answer.service';

@Component({
  selector: 'lq-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  constructor(private answerService: AnswerService) { }

  ngOnInit() {
    this.answerService.getReponses$().subscribe(a => console.log(a));
  }

}
