import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState, authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.currentUser,
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading,
);

export const selectAuthHydrated = createSelector(
  selectAuthState,
  (state: AuthState) => state.hydrated,
);
