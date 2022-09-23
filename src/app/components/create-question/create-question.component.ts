import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements AfterViewInit {
  
  @ViewChildren('correctOption') correctOption!: QueryList<any>;
  questionsList: any = [];
  questionType: string = 'single';
  radioValues: any[] = [];

  singleQuestionFormGroup: FormGroup;
  multipleQuestionFormGroup: FormGroup;
  openQuestionFormGroup: FormGroup;
  values = {
    id: '',
    questionTitle: '',
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
    this.singleQuestionFormGroup = new FormGroup({
      questionTitle: new FormControl('', [Validators.required]),
      questionOptionA: new FormControl('', [Validators.required]),
      questionOptionB: new FormControl('', [Validators.required]),
      questionOptionC: new FormControl('', [Validators.required]),
      questionOptionD: new FormControl('', [Validators.required]),
    });
    this.multipleQuestionFormGroup = new FormGroup({
      questionTitle: new FormControl('', [Validators.required]),
      questionOptionA: new FormControl('', [Validators.required]),
      questionOptionB: new FormControl('', [Validators.required]),
      questionOptionC: new FormControl('', [Validators.required]),
      questionOptionD: new FormControl('', [Validators.required]),
    });
    this.openQuestionFormGroup = new FormGroup({
      questionTitle: new FormControl('', [Validators.required]),
      questionText: new FormControl('', [Validators.required]),
    });
  }

  ngAfterViewInit(): void {
    const questions = localStorage.getItem('questions');
    if (questions) {
      JSON.parse(questions).forEach((element: any) => {
        this.questionsList.push(element);
      });
    }
  }

  setQuestionType(type: string) {
    this.singleQuestionFormGroup.reset();
    this.multipleQuestionFormGroup.reset();
    this.openQuestionFormGroup.reset();
    this.questionType = type;
  }

  submitForm() {
    if (this.questionType === 'single') this.values = this.singleQuestionFormGroup.getRawValue();
    if (this.questionType === 'multiple') this.values = this.multipleQuestionFormGroup.getRawValue();
    if (this.questionType === 'open') this.values = this.openQuestionFormGroup.getRawValue();

    this.radioValues.length > 0 ? this.values.answered = true: this.values.answered = false;
    console.log(this.values)
    this.values.id = uuidv4();
    this.values.createAt = new Date(Date.now()).toString();
    this.values.type = this.questionType;
    this.values.correctAnswer = this.radioValues;
    this.questionsList.push(this.values);
    localStorage.setItem('questions', JSON.stringify(this.questionsList));

    this.router.navigate(['management-question']);
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
