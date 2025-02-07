import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Users } from "../interface/users";

@Injectable({ providedIn: 'root' })

export class UserService {
    private user: Users | null = null;

    private usersSubject$ = new BehaviorSubject<Users[]>([]);

    public users$ = this.usersSubject$.asObservable();

    setUser(users: Users[]) {
        this.usersSubject$.next(users);
    }

    editUser(editedUser: Users) {
        this.usersSubject$.next(
            this.usersSubject$.value.map(user =>
                editedUser.id === user.id ? editedUser : user
            )
        )
    }

    createUser(user: Users) {
        const existingUser = this.usersSubject$.value.find(
            item => item.email === user.email
        )

        if (existingUser) {
            return undefined;
        }
        else {
            this.usersSubject$.next(
                [...this.usersSubject$.value, user]
            );
        }
    }

    deleteUser(id: number) {
        this.usersSubject$.next(
            this.usersSubject$.value.filter(
                item => id !== item.id
            )
        )
    }

    loginAsAdmin() {
        this.user = {
            isAdmin: true,
            id: 1,
            name: '',
            email: '',
            website: '',
            company: { name: '' }
        };
    }

    loginAsUser() {
        this.user = {
            isAdmin: false,
            id: 2,
            name: '',
            email: '',
            website: '',
            company: { name: '' }
        };
    }


    isAdmin(): boolean {
        return this.user ? this.user.isAdmin : false;
    }


    logout() {
        this.user = null;
    }

    getCurrentUser(): string | null {
        if (!this.user) return null;
        return this.user.isAdmin ? 'Администратор' : 'Пользователь';
    }


    isLoggedIn(): boolean {
        return this.user !== null;
    }

}
