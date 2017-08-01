import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from './questionnaire.service';
import { Question } from './question';
import { QuestionService } from '../question.service';
import { ReponseService } from '../utilisateur/reponse.service';

@Component({
  selector: 'lq-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  questionnaire: Question[];
  questionCourante: Question;
  isSelected = false;

  get indexQuestion() {
    return (this.questionnaire || []).indexOf(this.questionCourante) + 1;
  }

  constructor(private questionnaireService: QuestionnaireService,
              private questionService: QuestionService,
              private reponseService: ReponseService) { }

  ngOnInit() {
    this.questionnaireService.getQuestionnaire$().subscribe(q => {
      this.questionnaire = q;
      if (this.questionnaire.length) {
        this.questionCourante = this.questionnaire[0];
      }
    });
  }

  afficherQuestion(): void {
    this.questionService.envoyerQuestion(this.questionCourante);
  }

  afficherPossibilites(): void {
    this.reponseService.envoyerPossibilites(this.questionCourante.possibilite);
  }

  afficherResultats(): void {
    // TODO: ajouter un service de contrôle des affichages
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

  selectionQuestionCourante() {
    this.isSelected = true;
  }

}
