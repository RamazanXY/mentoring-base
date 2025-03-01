import { createSelector } from "@ngrx/store";
import { User } from "../../interface/users";


interface UserState {
    currentUser: any;
    users: User[];
}

interface AppState {
    users: UserState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
    selectUsersFeature,
    (state: UserState) => state.users
);

export const selectCurrentUser = (state: AppState) => state.users.currentUser;
export const selectIsAdmin = createSelector(
    selectCurrentUser,
    (currentUser) => currentUser ? currentUser.isAdmin : false
);
export const selectIsLoggedIn = createSelector(
    selectCurrentUser,
    (currentUser) => currentUser !== null   
);


