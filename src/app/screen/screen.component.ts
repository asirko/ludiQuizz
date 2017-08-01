import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';

@Component({
  selector: 'lq-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestion$().subscribe(console.log);
  }

}
