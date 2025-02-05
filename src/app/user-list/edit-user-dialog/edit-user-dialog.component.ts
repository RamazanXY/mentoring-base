import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { Users } from '../../users';

@Component({
    selector: 'app-edit-user-dialog',
    standalone: true,
    imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDialogClose],
    templateUrl: './edit-user-dialog.component.html',
    styleUrl: './edit-user-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditUserDialogComponent {
    readonly data = inject<{user: Users}>(MAT_DIALOG_DATA);

    public form = new FormGroup({
        name: new FormControl(this.data.user?.name || '',
            [Validators.required, Validators.minLength(2)]),
        email: new FormControl(this.data.user?.email || '',
            [Validators.required, Validators.email]),
        website: new FormControl(this.data.user?.website || '',
            [Validators.required, Validators.minLength(3)]),
        companyName: new FormControl(this.data.user?.company.name || '',
            [Validators.required, Validators.minLength(2)])
    });

    get userWithUpdateFields() {
        return {
            ...this.form.value,
            id: this.data.user.id
        }
    }
}