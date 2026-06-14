import { createAction, props } from '@ngrx/store';

export const hydrateComplete = createAction('[Auth Effects] Hydrate Complete');

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string; isSeller: boolean }>(),
);

export const loginSuccess = createAction(
  '[Auth Effects] Login Success',
  props<{ user: { email: string; name: string; role: string } }>(),
);

export const logout = createAction('[Header] Logout');

export const logoutSuccess = createAction('[Auth Effects] Logout Success');
