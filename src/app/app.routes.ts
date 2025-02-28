import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TodosListComponent } from './todo-list/todos-list.component'; 
import { authGuard } from './auth/auth.guard';


export const routes: Routes = [
    { path: '', component: MainComponent },
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
        canActivate: [authGuard]
    },
    {
        path: 'users',
        loadComponent: () => import('./user-list/user-list.component').then(m => m.UsersListComponent),
        canActivate: [authGuard]
    },
    { path: 'todos', component: TodosListComponent },
    { path: '**', redirectTo: '' }
];

