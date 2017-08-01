import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NomEquipeService {

  nomEquipe$ = new BehaviorSubject<string>(null);

  constructor(private httpClient: HttpClient) { }

  enregistrerEquipe(nomEquipe: string): Observable<any> {
    return this.httpClient.post('/api/enregistrerEquipe', {nomEquipe})
      .do(() => this.nomEquipe$.next(nomEquipe));
  }

  getNomEquipe$(): Observable<string> {
    return this.nomEquipe$.asObservable();
  }

}
