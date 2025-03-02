import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../service/todos-api.service";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { CreateTodoForm } from "./create-todo-form/create-todo-form.component";
import { Store } from "@ngrx/store";
import { TodoActions } from "./store/todo.actions";
import { selectTodos } from "./store/todo.selector";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
    selector: 'app-todos-list',
    standalone: true,
    imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoForm],
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
    private readonly store = inject(Store);
    private readonly snackBar = inject(MatSnackBar);
    public readonly todos$ = this.store.select(selectTodos);

    constructor() {
      this.store.dispatch(TodoActions.loadTodos());
    }

    deleteTodo(id: number) {
        this.store.dispatch(TodoActions.delete({ id }));
        this.snackBar
    }

    editTodo(todo: any) {
        this.store.dispatch(TodoActions.edit({ todo }));
    }

    public createTodo(formDate: any): void {
        this.store.dispatch(TodoActions.create({
            todo: {
                id: new Date().getTime(),
                userId: formDate.userId,
                title: formDate.title,
                completed: formDate.completed
            },
        },
        ))
    }
}