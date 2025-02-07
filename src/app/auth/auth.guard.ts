import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';


export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (!userService.isLoggedIn()) {
    router.navigate(['']);
    return false;
  }
   if (userService.isAdmin()) {
    return true;
  }
 
  router.navigate(['']);
  return false;
};