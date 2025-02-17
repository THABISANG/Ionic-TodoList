import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string, description: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
  }

  markAsCompleted(id: number) {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next([...this.tasks]);
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next([...this.tasks]);
  }

  updateTask(updatedTask: Task) {
    this.tasks = this.tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next([...this.tasks]);
  }
}
