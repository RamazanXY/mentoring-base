import { createReducer, on } from "@ngrx/store";
import { User } from "../../interface/users";
import { UserActions } from "./user.actions";

const initialState: { users: User[], currentUser: User | null } = {
    users: [],
    currentUser: null
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.set, (state, payload) => {
        const newState = { ...state, users: payload.users };
        return newState;
    }),
    on(UserActions.edit, (state, payload) => {
        const updatedUsers = state.users.map((user) =>
            user.id === payload.user.id ? payload.user : user
        );
        const newState = { ...state, users: updatedUsers };
        return newState;
    }),
    on(UserActions.create, (state, payload) => {
       const newUsers = [...state.users,  payload.user];
       const newState = {...state, users: newUsers};
       return newState;
    }),
    on(UserActions.delete, (state, payload) => {
       const filtredUsers = state.users.filter((user) => user.id !== payload.id);
       const newState = {...state, users: filtredUsers};
       return newState;
    }),
    on(UserActions.loginAsAdmin, (state) => ({
        ...state,
        currentUser: {
            isAdmin: true,
            id: new Date().getTime(),
            name: 'Администратор',
            email: '',
            website: '',
            company: { name: '' }
        }
    })),
    on(UserActions.loginAsUser, (state) => ({
        ...state,
        currentUser: {
            isAdmin: false,
            id: new Date().getTime(),
            name: 'Пользователь',
            email: '',
            website: '',
            company: { name: '' }
        }
    })),
    on(UserActions.logout, (state) => ({
        ...state,
        currentUser: null
    })),
);
