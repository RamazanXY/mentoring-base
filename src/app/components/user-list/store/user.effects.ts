import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { UserActions } from './user.actions';
import { Store } from '@ngrx/store';
import { selectUsers } from './users.selectors';
import {UsersApiService} from "../../../service/api-service/users-api.service";
import {LocalStorageService} from "../../../service/local-storage-service/local-storage.service";

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
          this.localStorageService.setItem('users', users);
        })
      ),
    { dispatch: false }
  );
}
