import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserDialog } from "./create-user-dialog/create-user-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { UserActions } from "./store/user.actions";
import { selectCurrentUser, selectIsAdmin, selectIsLoggedIn, selectUsers } from "./store/users.selectors";
import {LocalStorageService} from "../../service/local-storage-service/local-storage.service";
import {User} from "../../interface/users";


@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserDialog],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
    private readonly store = inject(Store)
    private snackBar = inject(MatSnackBar);
    private localStorageService = inject(LocalStorageService);

    public readonly users$ = this.store.select(selectUsers);
    readonly currentUser$ = this.store.select(selectCurrentUser);
    readonly isAdmin$ = this.store.select(selectIsAdmin);
    readonly isLoggedIn$ = this.store.select(selectIsLoggedIn);

    constructor() { }

    // public openDialog(user?: User) {
    //     const dialogRef = this.dialog.open(CreateEditUserComponent, {
    //         data: {
    //             isEdit: true,
    //             user: user,
    //             title: 'addUser',
    //         },
    //             width: '400px'
    //     })
    //     dialogRef.afterClosed().subscribe(result) => {
    //         if(user) {
    //             this.store.select(selectUsers);
    //             this.UserService.editUser(result);
    //         }
    //         else {
    //             this.UserService.addUser(result);
    //         }
    //     }
    // }

    ngOnInit(): void {
        const savedUsers = this.localStorageService.getItem<User[]>('users');
        if (savedUsers && Array.isArray(savedUsers)) {
            this.store.dispatch(UserActions.set({ users: savedUsers }));
        } else {
            this.store.dispatch(UserActions.loadUsers());
        }
    }

    deleteUser(id: number) {
        this.store.dispatch(UserActions.delete({ id }))
        this.users$.subscribe(users => {
            if (users.length === 0) {
                this.store.dispatch(UserActions.loadUsers());
            }
        }
        )
    };

    editUser(user: any) {
        this.store.dispatch(UserActions.edit({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                website: user.website,
                company: {
                    name: user.companyName
                },
                isAdmin: false
            },
        }))
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
            duration: 2000
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
