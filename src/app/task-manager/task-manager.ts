import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Task, TaskStore } from './task-store';

@Component({
  selector: 'app-task-manager',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.css',
})
export class TaskManager {
  constructor(private readonly taskStore: TaskStore) {}

  get tasks(): Task[] {
    return this.taskStore.tasks;
  }

  //Dropdown Options
  categories: string[] = ['work', 'personal', 'shopping', 'health', 'finance', 'education', 'other'];
  priorities: string[] = ['low', 'medium', 'high', 'urgent'];
  statuses: string[] = ['pending', 'in-progress', 'completed', 'cancelled'];

  //Filter controls
  filterStatus: string = 'all';
  filterCategory: string = 'all';
  filterPriority: string = 'all';
  showCompleted: boolean = true;

  //Methods
  getCompletedTasksCount(): number {
    return this.tasks.filter(task => task.status === 'completed').length;
  }

  getPendingTasksCount(): number {
    return this.tasks.filter(task => task.status === 'pending').length;
  }

  getOverdueTasksCount(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.tasks.filter(task => new Date(task.dueDate) < today && task.status != 'completed').length;
  }

  getCompletionRate(): number {
    if (this.tasks.length == 0) return 0;
    return Math.round((this.getCompletedTasksCount() / this.tasks.length) * 100);
  }

  getProductivityLevel(): string {
    const rate = this.getCompletionRate();
    if (rate >= 80) return 'excellent';
    if (rate >= 60) return 'good';
    if (rate >= 40) return 'needs-improvement';
    return 'poor';
  }

  onFieldFocus(field: string): void {
    //Could add validation feedback here
  }

  onFieldBlur(field: string): void {
    //Could add validation feedback here
  }

  getFilteredTasks(): Task[] {
    let filtered = [...this.tasks];

    if (this.filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === this.filterStatus);
    }

    if (this.filterCategory !== 'all') {
      filtered = filtered.filter(task => task.category === this.filterCategory);
    }

    if (this.filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === this.filterPriority);
    }

    if (!this.showCompleted) {
      filtered = filtered.filter(task => task.status !== 'completed');
    }

    return filtered;
  }

  toggleTaskComplete(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      if (task.status === 'completed') {
        task.status = 'pending';
        delete task.completedAt;
      }
      else {
        task.status = 'completed';
        task.completedAt = new Date();
      }
    }
  }

  isOverdue(task: Task): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < today && task.status != 'completed';
  }

  deleteTask(id: number): void {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}