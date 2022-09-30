import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements AfterViewInit {

  @ViewChildren('correctOption') correctOption!: QueryList<any>;
  questionsList: any = [];
  questionType!: string ;
  radioValues: any[] = [];
  questionId: string;
  isEdit: boolean = false;

  singleQuestionFormGroup: FormGroup;
  multipleQuestionFormGroup: FormGroup;
  openQuestionFormGroup: FormGroup;
  values = {
    id: '',
    questionTitle: '',
    questionText: '',
    questionOptionA: '',
    questionOptionB: '',
    questionOptionC: '',
    questionOptionD: '',
    createAt: '',
    type: '',
    answered: false,
    correctAnswer: [''],
  };

  constructor(private router: Router) {
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['edit'];
    this.questionId = this.router.getCurrentNavigation()?.extras.state?.['questionId'];
    const questions = localStorage.getItem('questions');
    if (questions) {
      JSON.parse(questions).forEach((element: any) => {
        if (element.id === this.questionId) {
          this.values = element;
          this.questionType = element.type;
        }
      });
      this.questionsList = JSON.parse(questions).filter(
        (item: any) => item.id !== this.questionId
      );
    }

    this.singleQuestionFormGroup = new FormGroup({
      questionTitle: new FormControl(this.values.questionTitle, [Validators.required]),
      questionOptionA: new FormControl(this.values.questionOptionA, [Validators.required]),
      questionOptionB: new FormControl(this.values.questionOptionB, [Validators.required]),
      questionOptionC: new FormControl(this.values.questionOptionC, [Validators.required]),
      questionOptionD: new FormControl(this.values.questionOptionD, [Validators.required]),
    });
    this.multipleQuestionFormGroup = new FormGroup({
      questionTitle: new FormControl(this.values.questionTitle, [Validators.required]),
      questionOptionA: new FormControl(this.values.questionOptionA, [Validators.required]),
      questionOptionB: new FormControl(this.values.questionOptionB, [Validators.required]),
      questionOptionC: new FormControl(this.values.questionOptionC, [Validators.required]),
      questionOptionD: new FormControl(this.values.questionOptionD, [Validators.required]),
    });
    this.openQuestionFormGroup = new FormGroup({
      questionTitle: new FormControl(this.values.questionTitle, [Validators.required]),
      questionText: new FormControl(this.values.questionText),
    });
  }

  ngAfterViewInit(): void {
    this.correctOption.toArray().forEach((elem) => {
      this.values.correctAnswer.forEach((item) => {
        if (elem.nativeElement.defaultValue === item) {
          elem.nativeElement.checked = true;
          this.radioValues.push(item);
        }
      });
    });
  }

  submitForm() {
    if (this.questionType === 'single'){
      this.values = this.singleQuestionFormGroup.getRawValue();
      this.radioValues.length > 0 ? this.values.answered = true: this.values.answered = false;
    }
    if (this.questionType === 'multiple') {
      this.values = this.multipleQuestionFormGroup.getRawValue();
      this.radioValues.length > 0 ? this.values.answered = true: this.values.answered = false;
    }
    if (this.questionType === 'open'){
      this.values = this.openQuestionFormGroup.getRawValue();
      this.values.questionText ? this.values.answered = true: this.values.answered = false;
    }
    this.values.id = this.questionId;
    this.values.createAt = new Date(Date.now()).toString();
    this.values.type = this.questionType;
    this.values.correctAnswer = this.radioValues;
    this.questionsList.push(this.values);
    localStorage.setItem('questions', JSON.stringify(this.questionsList));
    this.isEdit ? this.router.navigate(['management-question']): this.router.navigate(['list-questions'])
  }

  checked(eventTarget: any) {
    this.radioValues = [];
    if (this.questionType === 'single'){
      this.correctOption.toArray().forEach((elem) => {
          if (elem.nativeElement.defaultValue === eventTarget.value) {
            elem.nativeElement.checked ? true: false;
          } else {
            elem.nativeElement.checked = false
          }
      });
      this.correctOption.toArray().forEach((item) => {
        if (item.nativeElement.checked === true ){
          this.radioValues.push(item.nativeElement.defaultValue);
        }
      });
    }
    if (this.questionType === 'multiple'){
      this.correctOption.toArray().forEach((elem) => {
          if (elem.nativeElement.defaultValue === eventTarget.value) {
            elem.nativeElement.checked ? true: false;
          }
      });
      this.correctOption.toArray().forEach((item) => {
        if (item.nativeElement.checked === true ){
          this.radioValues.push(item.nativeElement.defaultValue);
        }
      });
    }
  }
}
