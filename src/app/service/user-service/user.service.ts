import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {UserActions} from "../../components/user-list/store/user.actions";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private store: Store) {}

  initializeUserState() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.store.dispatch(UserActions.restoreUser({ user }));
    }
  }
}
