import { Route } from '@angular/router';
import { QuestionComponent } from './index';

export const QuestionRoutes: Route[] = [
  {
    path: 'questions/:site/:id',
    component: QuestionComponent
  }
];
