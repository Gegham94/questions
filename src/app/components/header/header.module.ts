import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CreateQuestionComponent } from '../create-question/create-question.component';
import { EditQuestionComponent } from '../edit-question/edit-question.component';
import { ListQuestionsComponent } from '../list-questions/list-questions.component';
import { ManagementQuestionsComponent } from '../management-questions/management-questions.component';
import { HeaderComponent } from './header.component';
import { HeaderRoutingModule } from './header-routing.module';
import { HeaderItemComponent } from './header-item/header-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ManagementQuestionsComponent,
    ListQuestionsComponent,
    EditQuestionComponent,
    CreateQuestionComponent,
    HeaderItemComponent,
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HeaderModule { }
