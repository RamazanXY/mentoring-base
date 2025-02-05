import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { CreateUserDialog } from "../create-user-dialog/create-user-dialog.component";

@Component({
    selector: 'app-user-card',
    standalone: true,
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss'
})

export class UserCardComponent {
    @Input()
    user: any;

    @Output()
    deleteUser = new EventEmitter();

    @Output()
    editUser = new EventEmitter();

    @Output()
    createUser = new EventEmitter();

    readonly dialog = inject(MatDialog);

    editOpenDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            data: { user: this.user },
        });

        dialogRef.afterClosed().subscribe(editResult => {
            if(editResult) {
            this.editUser.emit(editResult);
        }
        })
    };

    createOpenDialog(): void {
        const dialogRef = this.dialog.open(CreateUserDialog, {
            data: { user: this.user },
        });

        dialogRef.afterClosed().subscribe(createResult => {
            if(createResult) {
            this.createUser.emit(createResult);
        }
        })
    };

    onDeleteUser(userId: number) {
        this.deleteUser.emit(userId);
    }
}