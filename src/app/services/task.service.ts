import { Injectable } from '@angular/core';
import { TaskStore } from './task.store';

export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  dueDate: Date;
  status: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface NewTask {
  title: string;
  description: string;
  category: string;
  priority: string;
  dueDate: string | Date;
  status: string;
}

@Injectable({ providedIn: 'root' })

export class TaskService {
  readonly tasks: Task[];

  constructor(taskStore: TaskStore) {
    this.tasks = taskStore.getDefaultTasks();
  }

  addTask(newTask: NewTask): void {
    this.tasks.push({
      ...newTask,
      id: Date.now(),
      dueDate: new Date(newTask.dueDate),
      createdAt: new Date()
    });
  }

  toggleTaskComplete(id: number): void {
    const task = this.tasks.find(candidate => candidate.id === id);
    if (!task) {
      return;
    }

    if (task.status === 'completed') {
      task.status = 'pending';
      delete task.completedAt;
    } else {
      task.status = 'completed';
      task.completedAt = new Date();
    }
  }

  deleteTask(id: number): void {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
