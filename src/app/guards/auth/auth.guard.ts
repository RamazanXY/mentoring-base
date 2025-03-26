import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectIsAdmin } from '../user-list/store/users.selectors';


export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  const isLoginIn = store.select(selectIsLoggedIn);
  const isAdmin = store.select(selectIsAdmin);
  if (!isLoginIn.subscribe((isLoginIn => isLoginIn))) {
    router.navigate(['']);
    return false;
  }
   if (isAdmin) {
    return true;
  }
 
  router.navigate(['']);
  return false;
};