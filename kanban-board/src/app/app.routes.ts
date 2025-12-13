import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/kanban/kanban.page').then(m => m.KanbanPage),
  },
];
