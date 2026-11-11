import { Injectable } from '@angular/core';
import { Task } from './task.service';

export interface TaskFilters {
  status: string;
  category: string;
  priority: string;
  showCompleted: boolean;
}

@Injectable({ providedIn: 'root' })

export class FilterService {
  filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
    return tasks.filter(task =>
      (filters.status === 'all' || task.status === filters.status) &&
      (filters.category === 'all' || task.category === filters.category) &&
      (filters.priority === 'all' || task.priority === filters.priority) &&
      (filters.showCompleted || task.status !== 'completed')
    );
  }
}
