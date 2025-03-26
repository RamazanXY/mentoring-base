import { Injectable } from "@angular/core";
import { TodosApiService } from "../../service/api-service/todos-api.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoActions } from "./todo.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class TodoEffects {
    constructor(
        private actions$: Actions,
        private todosApiService: TodosApiService,
    ) { }

    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.loadTodos),
            mergeMap(() =>
                this.todosApiService.getTodos().pipe(
                    map((todos) => TodoActions.set({ todos })),
                    catchError(() => of({ type: 'LOAD_Todos_FAILED' })),
                )
            )
        )
    )
}