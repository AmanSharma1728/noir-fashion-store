import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { selectAuthHydrated, selectCurrentUser } from '../../store/auth/auth.selectors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectAuthHydrated).pipe(
    // Wait until hydration from localStorage is done before checking user
    filter(Boolean),
    take(1),
    switchMap(() => store.select(selectCurrentUser).pipe(take(1))),
    map((user) => {
      if (user) return true;
      router.navigate(['/login']);
      return false;
    }),
  );
};
