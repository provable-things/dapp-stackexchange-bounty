import { Routes } from '@angular/router';

import { HomeRoutes } from './+home/index';
import { QuestionRoutes } from './+question/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...QuestionRoutes
];
