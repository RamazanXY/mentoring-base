import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../interface/users";

export const UserActions = createActionGroup({
    source: 'Users',
    events: {
        'set': props<{ users: User[] }>(),
        'edit': props<{ user: User }>(),
        'create': props<{ user: User }>(),
        'delete': props<{ id: number }>(),  
        'LoginAsAdmin': emptyProps(),
        'LoginAsUser': emptyProps(),
        'isAdmin': emptyProps(),
        'Logout': emptyProps(),
        'Is Logged In': emptyProps(),
        'loadUsersBackend': emptyProps(),
    }
});