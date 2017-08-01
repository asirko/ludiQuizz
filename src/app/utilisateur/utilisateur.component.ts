import { Component, OnInit } from '@angular/core';
import { ReponseService } from './reponse.service';
import { NomEquipeService } from './nom-equipe/nom-equipe.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'lq-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  nomEquipe$: Observable<string>;

  constructor(private reponseService: ReponseService,
              private nomEquipeService: NomEquipeService) { }

  ngOnInit() {
    this.nomEquipe$ = this.nomEquipeService.getNomEquipe$();
  }

}
