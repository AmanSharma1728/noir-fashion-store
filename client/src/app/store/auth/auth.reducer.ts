import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  currentUser: { email: string; name: string; role: string } | null;
  loading: boolean;
  hydrated: boolean;
}

export const initialState: AuthState = {
  currentUser: null,
  loading: false,
  hydrated: false,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    loading: false,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    currentUser: null,
    loading: false,
  })),

  on(AuthActions.hydrateComplete, (state) => ({
    ...state,
    hydrated: true,
  })),
);
