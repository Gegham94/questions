import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss']
})
export class ListQuestionsComponent implements OnInit {

  storedQuestionsList: any;
  isQuestionExist: boolean = false;
  answeredList: any[]= [];
  unansweredList: any[]= [];

  constructor() { }

  ngOnInit(): void {
    this.storedQuestionsList = localStorage.getItem('questions')
    if (this.storedQuestionsList){
      this.isQuestionExist = true;
      this.storedQuestionsList = JSON.parse(this.storedQuestionsList);
      this.storedQuestionsList.forEach((item: any) => {
        if (item.answered ===true){
          this.answeredList.push(item);
          this.answeredList = this.answeredList.sort((item_a: any, item_b: any) =>
            new Date(item_b.createAt).getTime() - new Date(item_a.createAt).getTime());
        } else {
          this.unansweredList.push(item);
          this.unansweredList = this.unansweredList.sort((item_a: any, item_b: any) =>
            new Date(item_b.createAt).getTime() - new Date(item_a.createAt).getTime());
        }
      });
    } else this.isQuestionExist = false;
  }

}
