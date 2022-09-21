import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateQuestionComponent } from '../create-question/create-question.component';
import { EditQuestionComponent } from '../edit-question/edit-question.component';
import { ListQuestionsComponent } from '../list-questions/list-questions.component';
import { ManagementQuestionsComponent } from '../management-questions/management-questions.component';

const routes: Routes = [
  {
    path: '', component: HeaderComponent,
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeaderRoutingModule {}
