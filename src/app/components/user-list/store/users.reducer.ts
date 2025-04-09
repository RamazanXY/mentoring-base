import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./user.actions";
import {User} from "../../../interface/users";

const initialState: { users: User[], currentUser: User | null } = {
    users: [],
    currentUser: null
};

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
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
  on(UserActions.loginAsAdmin, (state) => {
    const currentUser = {
      isAdmin: true,
      id: new Date().getTime(),
      name: 'Администратор',
      email: 'ramazan@gmail.com',
      website: 'goo.org',
      company: { name: 'Goo' }
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return { ...state, currentUser };
  }),
  on(UserActions.loginAsUser, (state) => {
    const currentUser = {
      isAdmin: false,
      id: new Date().getTime(),
      name: 'Пользователь',
      email: '',
      website: '',
      company: { name: '' }
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return { ...state, currentUser };
  }),
  on(UserActions.logout, (state) => {
    localStorage.removeItem('currentUser');
    return { ...state, currentUser: null };
  }),
  on(UserActions.restoreUser, (state, { user }) => ({
    ...state,
    currentUser: user
  })),
);
