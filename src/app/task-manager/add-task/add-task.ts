import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NewTask, TaskStore } from '../task-store';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule, RouterLink],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  readonly categories = ['work', 'personal', 'shopping', 'health', 'finance', 'education', 'other'];
  readonly priorities = ['low', 'medium', 'high', 'urgent'];
  readonly statuses = ['pending', 'in-progress', 'completed', 'cancelled'];

  newTask: NewTask = {
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: '',
    status: 'pending'
  };

  constructor(
    private readonly taskStore: TaskStore,
    private readonly router: Router
  ) {}

  addTask(): void {
    if (!this.newTask.title || !this.newTask.category || !this.newTask.dueDate) {
      return;
    }

    this.taskStore.addTask(this.newTask);
    this.router.navigate(['/dashboard']);
  }
}
