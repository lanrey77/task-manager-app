import { Injectable } from '@angular/core';
import { Task } from './task.service';

@Injectable({ providedIn: 'root' })

export class TaskStore {
  getDefaultTasks(): Task[] {
    return [
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
  }
}
