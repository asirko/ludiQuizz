import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from './questionnaire.service';
import { Question } from './question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'lq-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  questionnaire: Question[];
  questionCourante: Question;

  constructor(private questionnaireService: QuestionnaireService,
              private questionService: QuestionService) { }

  ngOnInit() {
    this.questionnaireService.getQuestionnaire$().subscribe(q => {
      this.questionnaire = q;
      if (this.questionnaire.length) {
        this.questionCourante = this.questionnaire[0];
      }
    });
  }

  lancerQuestion(): void {
    this.questionService.envoyerQuestion(this.questionCourante);
  }

  questionSuivante(): void {
    const indexQuestionCourante = this.questionnaire.indexOf(this.questionCourante);
    if (this.questionnaire.length > indexQuestionCourante) {
      this.questionCourante = this.questionnaire[indexQuestionCourante + 1];
    }
  }

  afficherReponse(): void {

  }

}
