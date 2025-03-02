import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UsersApiService } from '../../service/users-api.service';
import { UserActions } from './user.actions';
import { User } from '../../interface/users';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private usersApiService: UsersApiService
    ) { }

    loadUsersBackend$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(() =>
                this.usersApiService.getUsers().pipe(
                    map((users) => UserActions.set({ users })),
                    catchError(() => of({ type: 'LOAD_USERS_FAILED' })),
                )
            )
        )
    );

    saveUsersLocalStorage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.set),
            tap((action) => {
                localStorage.setItem('users', JSON.stringify(action.users));
            })
        ),
        { dispatch: false }
    );

    saveUsersAfterEdit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.edit),
            tap((action) => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const updatedUsers = users.map((user: User) =>
                    user.id === action.user.id ? action.user : user
                );
                localStorage.setItem('users', JSON.stringify(updatedUsers));
            })
        ),
        { dispatch: false }
    );

    saveUsersAfterCreate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.create),
            tap((action) => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const updatedUsers = [...users, action.user];
                localStorage.setItem('users', JSON.stringify(updatedUsers));
            })
        ),
        { dispatch: false }
    );

    saveUsersAfterDelete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.delete),
            tap((action) => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const updatedUsers = users.filter((user: User) => user.id !== action.id);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
            })
        ),
        { dispatch: false }
    );


}