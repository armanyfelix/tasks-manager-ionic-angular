import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'task/:id',
    loadComponent: () =>
      import('./view-task/view-task.page').then((m) => m.ViewTaskPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

