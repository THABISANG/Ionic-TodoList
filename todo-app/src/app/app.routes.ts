import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
  { path: 'todo', loadComponent: () => import('./todo/todo.component').then(m => m.TodoComponent) },
  { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
];

