import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component'; 
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' }, 
  { path: 'todo', component: TodoComponent }, 
  { path: 'home', component: HomePage }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
