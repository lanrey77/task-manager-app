import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../services/filter.service';
import { StatisticsService } from '../services/statistics.service';
import { NewTask, Task, TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.css',
})
export class TaskManager {
  private readonly taskService = inject(TaskService);
  private readonly filterService = inject(FilterService);
  private readonly statisticsService = inject(StatisticsService);

  get tasks(): Task[] {
    return this.taskService.tasks;
  }

  //Dropdown Options
  categories: string[] = ['work', 'personal', 'shopping', 'health', 'finance', 'education', 'other'];
  priorities: string[] = ['low', 'medium', 'high', 'urgent'];
  statuses: string[] = ['pending', 'in-progress', 'completed', 'cancelled'];

  //Form data
  newTask: NewTask = {
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: '',
      status: 'pending'
    };

  //Filter controls
  filterStatus: string = 'all';
  filterCategory: string = 'all';
  filterPriority: string = 'all';
  showCompleted: boolean = true;

  //Methods
  getCompletedTasksCount(): number {
    return this.statisticsService.getCompletedTasksCount(this.tasks);
  }

  getPendingTasksCount(): number {
    return this.statisticsService.getPendingTasksCount(this.tasks);
  }

  getOverdueTasksCount(): number {
    return this.statisticsService.getOverdueTasksCount(this.tasks);
  }

  getCompletionRate(): number {
    return this.statisticsService.getCompletionRate(this.tasks);
  }

  getProductivityLevel(): string {
    return this.statisticsService.getProductivityLevel(this.tasks);
  }

  onFieldFocus(field: string): void {
    //Could add validation feedback here
  }

  onFieldBlur(field: string): void {
    //Could add validation feedback here
  }

  addTask(): void {
    if (!this.newTask.title || !this.newTask.category || !this.newTask.dueDate) {
      return;
    }

    this.taskService.addTask(this.newTask);
    this.clearForm();
  }

  clearForm(): void {
    this.newTask = {
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: '',
      status: 'pending'
    };
  }

  getFilteredTasks(): Task[] {
    return this.filterService.filterTasks(this.tasks, {
      status: this.filterStatus,
      category: this.filterCategory,
      priority: this.filterPriority,
      showCompleted: this.showCompleted
    });
  }

  toggleTaskComplete(id: number): void {
    this.taskService.toggleTaskComplete(id);
  }

  isOverdue(task: Task): boolean {
    return this.statisticsService.isOverdue(task);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}