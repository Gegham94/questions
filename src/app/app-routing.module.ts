import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { ListQuestionsComponent } from './components/list-questions/list-questions.component';
import { ManagementQuestionsComponent } from './components/management-questions/management-questions.component';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      { path: '', component: ManagementQuestionsComponent },
      { path: 'edit-question', component: EditQuestionComponent, data: { animation: 'editQuestion' } },
      { path: 'create-question', component: CreateQuestionComponent, data: { animation: 'createQuestion' } },
      { path: 'management-question', component: ManagementQuestionsComponent, data: { animation: 'managementQuestion' } },
      { path: 'list-questions', component: ListQuestionsComponent, data: { animation: 'listQuestions' } },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
