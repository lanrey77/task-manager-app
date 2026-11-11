import { Injectable } from '@angular/core';
import { Task } from './task.service';

@Injectable({ providedIn: 'root' })

export class StatisticsService {
  getCompletedTasksCount(tasks: Task[]): number {
    return tasks.filter(task => task.status === 'completed').length;
  }

  getPendingTasksCount(tasks: Task[]): number {
    return tasks.filter(task => task.status === 'pending').length;
  }

  getOverdueTasksCount(tasks: Task[]): number {
    return tasks.filter(task => this.isOverdue(task)).length;
  }

  getCompletionRate(tasks: Task[]): number {
    if (tasks.length === 0) {
      return 0;
    }
    return Math.round((this.getCompletedTasksCount(tasks) / tasks.length) * 100);
  }

  getProductivityLevel(tasks: Task[]): string {
    const rate = this.getCompletionRate(tasks);
    if (rate >= 80) return 'excellent';
    if (rate >= 60) return 'good';
    if (rate >= 40) return 'needs-improvement';
    return 'poor';
  }

  isOverdue(task: Task): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < today && task.status !== 'completed';
  }
}
