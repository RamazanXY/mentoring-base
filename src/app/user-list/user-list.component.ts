import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../service/users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserDialog } from "./create-user-dialog/create-user-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { UserActions } from "./store/user.actions";
import { selectCurrentUser, selectIsAdmin, selectIsLoggedIn, selectUsers } from "./store/users.selectors";


@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserDialog],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService);

    private readonly store = inject(Store)

    private snackBar = inject(MatSnackBar);

    public readonly users$ = this.store.select(selectUsers);

    readonly currentUser$ = this.store.select(selectCurrentUser);
    
    readonly isAdmin$ = this.store.select(selectIsAdmin);

    readonly isLoggedIn$ = this.store.select(selectIsLoggedIn);

    constructor() {
        console.log("Обработал");
        this.usersApiService.getUsers().subscribe((response: any) => {
            console.log("ОТВЕТ ОТ СЕРВЕРА: ", response);
            this.store.dispatch(UserActions.set({ users: response }));
        });
    }

    deleteUser(id: number) {
        this.store.dispatch(UserActions.delete({ id }))
    }

    editUser(user: any) {
        this.store.dispatch(UserActions.edit({ user }))
    }

    public createUser(formDate: any): void {
        this.store.dispatch(
            UserActions.create({
                user: {
                    id: new Date().getTime(),
                    name: formDate.name,
                    email: formDate.email,
                    website: formDate.website,
                    company: {
                        name: formDate.companyName
                    },
                    isAdmin: false
                },

            })
        ), this.snackBar.open('Пользователь создан!', 'ок', {
            duration: 5000
        });
    }

    loginAsAdmin() {
        this.store.dispatch(UserActions.loginAsAdmin());
    }

    loginAsUser() {
        this.store.dispatch(UserActions.loginAsUser());
    }

    logout() {
        this.store.dispatch(UserActions.logout());
    }
}