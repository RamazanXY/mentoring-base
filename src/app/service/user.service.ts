import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../interface/users";

@Injectable({ providedIn: 'root' })

export class UserService {
    private user: User | null = null;

    private UserSubject$ = new BehaviorSubject<User[]>([]);

    public user$ = this.UserSubject$.asObservable();

    setUser(User: User[]) {
        this.UserSubject$.next(User);
    }

    editUser(editedUser: User) {
        this.UserSubject$.next(
            this.UserSubject$.value.map(user =>
                editedUser.id === user.id ? editedUser : user
            )
        )
    }

    createUser(user: User) {
        const existingUser = this.UserSubject$.value.find(
            item => item.email === user.email
        )

        if (existingUser) {
            return undefined;
        }
        else {
            this.UserSubject$.next(
                [...this.UserSubject$.value, user]
            );
        }
    }

    deleteUser(id: number) {
        this.UserSubject$.next(
            this.UserSubject$.value.filter(
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

    
    isLoggedIn(): boolean {
        return this.user !== null;
    }

}
