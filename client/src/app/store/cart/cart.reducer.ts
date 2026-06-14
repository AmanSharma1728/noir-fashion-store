import { createReducer, on } from '@ngrx/store';

import { CartItem } from '../../core/models/cart-item';
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.loadCart, (state, { items }) => ({ ...state, items: [...items] })),

  on(CartActions.addToCart, (state, { product }) => {
    const existing = state.items.find((i) => i.product.id === product.id);

    if (existing) {
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      };
    } else {
      return {
        ...state,
        items: [
          ...state.items,
          {
            product,
            quantity: 1,
          },
        ],
      };
    }
  }),

  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter((i) => i.product.id !== productId),
  })),

  on(CartActions.updateQuantity, (state, { productId, change }) => {
    return {
      ...state,
      items: state.items
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + change } : item,
        )
        .filter((i) => i.quantity > 0),
    };
  }),

  on(CartActions.clearCart, (state) => {
    return {
      ...state,
      items: [],
    };
  }),
);
