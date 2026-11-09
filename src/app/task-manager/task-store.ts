import { Injectable } from '@angular/core';

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

export type NewTask = Omit<Task, 'id' | 'createdAt' | 'dueDate'> & {
  dueDate: string | Date;
};

@Injectable({ providedIn: 'root' })
export class TaskStore {
  readonly tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Angular Assignment',
      description: 'Finish the task manager application with all requirements',
      category: 'education',
      priority: 'high',
      dueDate: new Date('2024-12-15'),
      status: 'in-progress',
      createdAt: new Date('2024-12-01')
    },
    {
      id: 2,
      title: 'Buy Groceries',
      description: 'Milk, Bread, Eggs, Vegetables',
      category: 'shopping',
      priority: 'medium',
      dueDate: new Date('2024-12-10'),
      status: 'pending',
      createdAt: new Date('2024-12-05')
    },
    {
      id: 3,
      title: 'Team Meeting',
      description: 'Discuss Q1 project roadmap',
      category: 'work',
      priority: 'high',
      dueDate: new Date('2024-12-08'),
      status: 'completed',
      createdAt: new Date('2024-12-08')
    }
  ];

  addTask(newTask: NewTask): void {
    this.tasks.push({
      ...newTask,
      id: Date.now(),
      dueDate: new Date(newTask.dueDate),
      createdAt: new Date()
    });
  }
}
