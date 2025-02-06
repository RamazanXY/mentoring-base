import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, NgModule, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { DeleteUserDialogComponent } from "./delete-user-dialog/delete-user-dialog.component";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-user-card',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatCardModule],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserCardComponent {
    constructor(public dialog: MatDialog) { }

    private _snackBar = inject(MatSnackBar);

    @Input()
    user: any;

    @Output()
    deleteUser = new EventEmitter();

    @Output()
    editUser = new EventEmitter();

    @Output()
    createUser = new EventEmitter();

    editOpenDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            data: { user: this.user },
        });

        dialogRef.afterClosed().subscribe(editResult => {
            if (editResult) {
                this.editUser.emit(editResult);
                this._snackBar.open('Пользователь изменен!', 'ок'), {
                    duration: 10000
                };
            }

        })
    };

    deleteOpenDialog(): void {
        const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
            data: { user: this.user, message: 'Вы уверены, что хотите удалить этот элемент?' }
        });

        dialogRef.afterClosed().subscribe(deleteResult => {
            if (deleteResult) {
                this.deleteUser.emit(this.user.id);
                this._snackBar.open('Пользователь удален!', 'ок', {
                    duration: 10000
                });
            }
        });
    }
}