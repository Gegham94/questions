import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  isRadioValid: boolean = false;
  questionsList: any = [];
  questionType!: string ;
  radioValues: any[] = [];
  questionId: string;

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
    this.questionId = this.router.getCurrentNavigation()?.extras.state?.['questionId'];
    const questions = localStorage.getItem('questions');
    if (questions) {
      JSON.parse(questions).forEach((element: any) => {
        if(element.id === this.questionId) {
          this.values = element;
          this.questionType = element.type
        }
      });
      this.questionsList = JSON.parse(questions).filter((item: any) => item.id !== this.questionId)
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
      questionText: new FormControl(this.values.questionText, [Validators.required]),
    });
  }

  ngOnInit(): void {
    const multyRadioButtons = document.querySelectorAll('input[class="mrb"]');
    console.log(multyRadioButtons)
    // this.values.correctAnswer.forEach((item) => {
    //   this.answer = item
    // })
  }

  submitForm() {
    if (this.questionType === 'single') this.values = this.singleQuestionFormGroup.getRawValue();
    if (this.questionType === 'multiple') this.values = this.multipleQuestionFormGroup.getRawValue();
    if (this.questionType === 'open') this.values = this.openQuestionFormGroup.getRawValue();

    this.values.id = this.questionId;
    this.values.createAt = new Date(Date.now()).toString();
    this.values.type = this.questionType;
    this.values.answered = false;
    this.values.correctAnswer = this.radioValues;
    this.questionsList.push(this.values);
    localStorage.setItem('questions', JSON.stringify(this.questionsList));

    this.router.navigate(['management-question']);
  }

  checked(eventTarget: any) {
    this.radioValues.push(eventTarget.value);
    this.isRadioValid = true;
  }

}
