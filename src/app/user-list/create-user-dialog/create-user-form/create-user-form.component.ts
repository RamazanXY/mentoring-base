import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogClose } from "@angular/material/dialog";
import { Users } from '../../../interface/users'; 

@Component({
    selector: 'app-create-user-form',
    standalone: true,
    imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDialogClose],
    templateUrl: './create-user-form.component.html',
    styleUrl: './create-user-form.component.scss'
})

export class CreateUserForm {
    readonly data = inject<{ user: Users }>(MAT_DIALOG_DATA);

    public form = new FormGroup({
        name: new FormControl('',
            [Validators.required, Validators.minLength(2)]),
        email: new FormControl('',
            [Validators.required, Validators.email]),
        website: new FormControl('',
            [Validators.required, Validators.minLength(3)]),
        companyName: new FormControl('',
            [Validators.required, Validators.minLength(2)])
    });

    get userWithCreateFields() {
        return {
            ...this.form.value,
        }
    }
}