import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from './questionnaire.service';
import { Question } from './question';
import { AdminService } from './admin.service';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'lq-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  questions: Question[];
  currentQuestion: Question;
  isSelected = false;

  get indexQuestion() {
    return (this.questions || []).indexOf(this.currentQuestion) + 1;
  }

  constructor(private questionnaireService: QuestionnaireService,
              private adminService: AdminService,
              private playerService: PlayerService) { }

  ngOnInit() {
    this.questionnaireService.getQuestionnaire$().subscribe(q => {
      this.questions = q;
      if (this.questions.length) {
        this.currentQuestion = this.questions[0];
      }
    });
  }

  displayQuestion(): void {
    this.adminService.sendQuestion(this.currentQuestion);
  }

  displayPossibilites(): void {
    this.adminService.sendChoices(this.currentQuestion.possibilite);
  }

  displayAnswer(): void {
    this.adminService.sendDisplayAnswer(true);
    this.isSelected = false;
  }

  previousQuestion(): void {
    const indexQuestionCourante = this.questions.indexOf(this.currentQuestion);
    if (indexQuestionCourante > 0) {
      this.currentQuestion = this.questions[indexQuestionCourante - 1];
    }
  }

  nextQuestion(): void {
    const indexCurrentQuestion = this.questions.indexOf(this.currentQuestion);
    if (this.questions.length - 1 > indexCurrentQuestion) {
      this.currentQuestion = this.questions[indexCurrentQuestion + 1];
    }
  }

  selectCurrentQuestion() {
    this.isSelected = true;
    this.adminService.sendChoices(null);
    this.adminService.sendQuestion(null);
    this.playerService.resetAllAnswer();
  }

}
