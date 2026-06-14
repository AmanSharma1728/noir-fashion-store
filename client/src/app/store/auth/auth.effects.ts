import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private store = inject(Store);

  hydrate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        tap(() => {
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            const user = JSON.parse(savedUser);
            this.store.dispatch(AuthActions.loginSuccess({ user }));
          }
          // Always mark hydration as done so the auth guard can unblock
          this.store.dispatch(AuthActions.hydrateComplete());
        }),
      ),
    { dispatch: false },
  );

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap(({ email, isSeller }) => {
          const user = {
            name: email.split('@')[0],
            email,
            role: isSeller ? 'seller' : 'customer',
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.store.dispatch(AuthActions.loginSuccess({ user }));
          // Navigate here (not in loginSuccess$) so hydration doesn't trigger redirect
          this.router.navigate([isSeller ? '/seller' : '/']);
        }),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          this.store.dispatch(AuthActions.logoutSuccess());
        }),
      ),
    { dispatch: false },
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );
}

