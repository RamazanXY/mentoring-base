import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { UsersApiService } from '../../service/api-service/users-api.service';
import { UserActions } from './user.actions';
import { LocalStorageService } from '../../service/local-storage-service/local-storage.service';
import { User } from '../../interface/users';
import { Store } from '@ngrx/store';
import { selectUsers } from './users.selectors';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private usersApiService: UsersApiService,
        private localStorageService: LocalStorageService,
        private store: Store,
    ) { }

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(() =>
                this.usersApiService.getUsers().pipe(
                    map((users) => UserActions.set({ users })),
                    catchError(() => of({ type: 'LOAD_USERS_FAILED' }))
                )
            )
        )
    );

    saveUsersLocalStorage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.set, UserActions.edit, UserActions.create, UserActions.delete),
            withLatestFrom(this.store.select(selectUsers)),
            tap(([action, users]) => {
                let updatedUsers: User[];
                switch (action.type) {
                    case UserActions.set.type:
                        updatedUsers = action.users;
                        break;
                    case UserActions.edit.type:
                        updatedUsers = users.map((user) =>
                            user.id === action.user.id ? action.user : user);
                        break;
                    case UserActions.create.type:
                        updatedUsers = [...users, action.user];
                        break;
                    case UserActions.delete.type:
                        updatedUsers = users.filter((user) => user.id !== action.id);
                        break;
                    default:
                        updatedUsers = users;
                        break;
                }
                this.localStorageService.setItem('users', updatedUsers);
            })
        ),
        { dispatch: false }
    );
}