import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.currentUser()) {
    return true;
  }

  //if user is not logged in then ask them to login first
  router.navigate(['/login']);
  return false;
};
