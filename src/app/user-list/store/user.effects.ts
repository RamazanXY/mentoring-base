import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UsersApiService } from '../../service/users-api.service';  // Предположим, что у вас есть сервис для работы с API
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private usersApiService: UsersApiService
    ) { }

    loadUsers$ = createEffect(() =>
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
}