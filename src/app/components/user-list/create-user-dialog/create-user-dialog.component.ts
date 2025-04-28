import { Component, EventEmitter, inject, Output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from "@angular/material/dialog";
import { CreateUserForm } from "./create-user-form/create-user-form.component";
import {User} from "../../../interface/users";

@Component({
    selector: 'app-create-user-dialog',
    standalone: true,
    imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule],
    templateUrl: './create-user-dialog.component.html',
    styleUrl: './create-user-dialog.component.scss'
})

export class CreateUserDialog {
    user: User | undefined;

    @Output()
    createUser = new EventEmitter();

    readonly dialog = inject(MatDialog);

    createOpenDialog(): void {
      const dialogRef = this.dialog.open(CreateUserForm);
      dialogRef.afterClosed().subscribe(createResult => {
        if (createResult) this.createUser.emit(createResult);
    });
  }
}
