import { Routes } from '@angular/router';
import { TaskManager } from './task-manager/task-manager';
import { AddTask } from './task-manager/add-task/add-task';

export const routes: Routes = [
    { path: 'tasks/new', component: AddTask },
    { path: 'dashboard', component: TaskManager },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];