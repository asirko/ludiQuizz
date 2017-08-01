import { Component, OnInit } from '@angular/core';
import { NomEquipeService } from './nom-equipe.service';

@Component({
  selector: 'lq-nom-equipe',
  templateUrl: './nom-equipe.component.html',
  styleUrls: ['./nom-equipe.component.scss']
})
export class NomEquipeComponent implements OnInit {

  nomEquipe: string;
  nomPris = false;

  constructor(private nomEquipeService: NomEquipeService) {}

  ngOnInit() {
    this.nomEquipe = localStorage.getItem('nomEquipe') || '';
  }

  valider(): void {
    this.nomEquipeService.enregistrerEquipe(this.nomEquipe).subscribe(
      () => this.nomPris = false,
      error => this.nomPris = error.status === 403
    );
  }

}
