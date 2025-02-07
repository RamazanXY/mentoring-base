import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../service/users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UserService } from "../service/user.service";
import { CreateUserDialog } from "./create-user-dialog/create-user-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserDialog],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
    hasUnsavedChanges() {
      throw new Error('Method not implemented.');
    }
    readonly usersApiService = inject(UsersApiService);
    readonly userService = inject(UserService)
    private snackBar = inject(MatSnackBar);

    CreateUserForm: any;
    
    canExit = false;

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: any) => {
                this.userService.setUser(response);
            }
        )
    }

    deleteUser(id: number) {
        this.userService.deleteUser(id);
    }

    editUser(user: any) {
        this.userService.editUser({
            ...user,
            company: {
                name: user.companyName
            }
        });
    }

    onClick() {
        this.canExit = !this.canExit;
    }

    public createUser(formDate: any): void {
        this.userService.createUser({
            id: new Date().getTime(),
            name: formDate.name,
            email: formDate.email,
            website: formDate.website,
            company: {
                name: formDate.companyName
            },
            isAdmin: false
        }), this.snackBar.open('Пользователь создан!', 'ок', {
            duration: 5000
        });
    }
}