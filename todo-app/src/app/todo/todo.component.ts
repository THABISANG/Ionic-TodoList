import { ChangeDetectorRef, Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class TodoComponent {
  tasks$: Observable<Task[]> = this.taskService.tasks$;
  newTaskTitle = '';
  newTaskDescription = '';
  editingTaskId: number | null = null;
  editedTitle = '';
  editedDescription = '';

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle, this.newTaskDescription);
      this.newTaskTitle = '';
      this.newTaskDescription = '';
      this.cdr.detectChanges();
    }
  }

  trackById(index: number, task: Task): number {
    return task.id;
  }

  markAsCompleted(id: number) {
    this.taskService.markAsCompleted(id);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  editTask(task: Task) {
    this.editingTaskId = task.id;
    this.editedTitle = task.title;
    this.editedDescription = task.description || '';
  }
  saveTask(task: Task) {
    if (this.editedTitle.trim()) {
      this.taskService.updateTask({ 
        ...task, 
        title: this.editedTitle, 
        description: this.editedDescription 
      });
      this.editingTaskId = null;
      this.editedTitle = '';
      this.editedDescription = '';
    }
  }
  cancelEdit() {
    this.editingTaskId = null;
  }
}
