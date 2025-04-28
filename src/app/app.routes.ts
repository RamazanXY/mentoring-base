import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { authGuard } from './guards/auth/auth.guard';
import {TodosListComponent} from "./components/todo-list/todos-list.component";


export const routes: Routes = [
    { path: '', component: MainComponent },
    {
        path: 'admin',
        loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent),
        canActivate: [authGuard]
    },
    {
        path: 'users',
        loadComponent: () => import('./components/user-list/user-list.component').then(m => m.UsersListComponent),
        canActivate: [authGuard]
    },
    { path: 'todos', component: TodosListComponent },
    { path: '**', redirectTo: '' }
];

