import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management-questions',
  templateUrl: './management-questions.component.html',
  styleUrls: ['./management-questions.component.scss'],
  animations: [
    trigger('questionListAnimation', [
      transition(':leave', animate(200, style({ opacity: 0 }))),
    ]),
  ],
})
export class ManagementQuestionsComponent implements OnInit {

  constructor(private router: Router) {}

  storedQuestionsList: any;
  isQuestionExist: boolean = false;

  ngOnInit(): void {
    this.storedQuestionsList = localStorage.getItem('questions')
    if (this.storedQuestionsList){
      this.isQuestionExist = true;
      this.storedQuestionsList = JSON.parse(this.storedQuestionsList)
      this.storedQuestionsList = this.storedQuestionsList.sort((item_a: any, item_b: any) =>
        new Date(item_b.createAt).getTime() - new Date(item_a.createAt).getTime()
    );
    } else this.isQuestionExist = false;
  }

  deleteQuestion(questionId: string) {
    if (this.storedQuestionsList.length !== 1) {
      this.isQuestionExist = true;
      this.storedQuestionsList = this.storedQuestionsList.filter((item: any) => item.id !== questionId)
      localStorage.setItem('questions', JSON.stringify(this.storedQuestionsList))
    } else {
      localStorage.removeItem('questions')
      this.isQuestionExist = false
    };
    this.ngOnInit();
  }

  editQuestion(questionId: number) {
    this.router.navigate(['edit-question'], { state: { questionId } });
  }
}
