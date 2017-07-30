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

  get indexQuestion() {
    return (this.questionnaire || []).indexOf(this.questionCourante) + 1;
  }

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

  choisirQuestion(): void {
    this.questionService.envoyerQuestion(this.questionCourante);
  }

  afficherPossibilites(): void {
    this.questionService.envoyerQuestion(this.questionCourante);
  }

  questionPrecedente(): void {
    const indexQuestionCourante = this.questionnaire.indexOf(this.questionCourante);
    if (indexQuestionCourante > 0) {
      this.questionCourante = this.questionnaire[indexQuestionCourante - 1];
    }
  }

  questionSuivante(): void {
    const indexQuestionCourante = this.questionnaire.indexOf(this.questionCourante);
    if (this.questionnaire.length - 1 > indexQuestionCourante) {
      this.questionCourante = this.questionnaire[indexQuestionCourante + 1];
    }
  }

  afficherResultats(): void {
    // TODO: ajouter un service de contrôle des affichages
  }

}
