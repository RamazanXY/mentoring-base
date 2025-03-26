import { createActionGroup, emptyProps, props } from "@ngrx/store";
import {Todos} from "../../../interface/todos";

export const TodoActions = createActionGroup({
    source: 'Todos',
    events: {
        'set': props<{ todos: Todos[] }>(),
        'edit': props<{ todo: Todos }>(),
        'create': props<{ todo: Todos }>(),
        'delete': props<{ id: number }>(),
        'loadTodos': emptyProps(),
    }
});
