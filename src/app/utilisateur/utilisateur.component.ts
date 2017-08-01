import { Component, OnInit } from '@angular/core';
import { ReponseService } from './reponse.service';

@Component({
  selector: 'lq-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  constructor(private reponseService: ReponseService) { }

  ngOnInit() {}

}
