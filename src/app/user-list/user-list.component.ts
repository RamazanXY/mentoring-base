import { NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, Injectable } from "@angular/core";

export interface Users {
    
}

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [NgFor],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss'
})


export class UsersListComponent {
    readonly ApiService = inject(HttpClient);
    users:any = [];

    constructor() {
        this.ApiService.get('https://jsonplaceholder.typicode.com/users').subscribe(
            (response: any) => {
              this.users = response;
              console.log('USERS:',this.users)
            }
        )
    }

    deleteUser(id:number) {
        this.users = this.users.filter(
            // @ts-ignore
            item => item.id !== id
        )
    }
}