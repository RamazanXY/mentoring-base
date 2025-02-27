// import { CanActivateFn } from '@angular/router';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';


// export const authGuard: CanActivateFn = () => {
//   const router = inject(Router);
//   const store = inject(Store);

//   if (!store.isLoggedIn()) {
//     router.navigate(['']);
//     return false;
//   }
//    if (store.isAdmin()) {
//     return true;
//   }
 
//   router.navigate(['']);
//   return false;
// };