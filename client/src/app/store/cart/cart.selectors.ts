import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartState, cartFeatureKey } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>(cartFeatureKey);

export const selectCartItems = createSelector(selectCartState, (state: CartState) => state.items);

export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
);
