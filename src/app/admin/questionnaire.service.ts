import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Question } from './question';

@Injectable()
export class QuestionnaireService {

  constructor(private http: Http) { }

  getQuestionnaire$(): Observable<Question[]> {
    return this.http.get('assets/questions.json')
      .map(res => res.json())
      .map(questions => {
        questions.forEach((q, i) => q.index = i);
        return questions;
      });
  }

}
