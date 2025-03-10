import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Todos } from "../../interface/todos";

@Injectable({ providedIn: 'root' })

export class TodosApiService {
    readonly todosApiService = inject(HttpClient)

    getTodos(): Observable<Todos[]> {
        return this.todosApiService.get<Todos[]>('https://jsonplaceholder.typicode.com/todos');
    }
}