import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'app-todo-card',
    standalone: true,
    templateUrl: './todo-card.component.html',
    styleUrl: './todo-card.component.scss'
})

export class TodoCardComponent {
    readonly dialog = inject(MatDialog);

    @Input()
    todo: any;

    @Output()
    deleteTodo = new EventEmitter();

    onDeleteTodo(todoId: number) {
        this.deleteTodo.emit(todoId)
    }

    // deleteOpenDialog(): void {
    //     const dialogRef = this.dialog.
    // }
}