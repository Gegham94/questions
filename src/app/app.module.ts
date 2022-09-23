import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ManagementQuestionsComponent } from './components/management-questions/management-questions.component';
import { ListQuestionsComponent } from './components/list-questions/list-questions.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';

@NgModule({
  declarations: [
    AppComponent,
    ManagementQuestionsComponent,
    ListQuestionsComponent,
    EditQuestionComponent,
    CreateQuestionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
