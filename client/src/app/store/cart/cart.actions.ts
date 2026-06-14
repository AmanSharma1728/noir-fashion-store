import { createAction, props } from '@ngrx/store';

import { CartItem } from '../../core/models/cart-item';
import { Product } from '../../core/models/product.model';

export const loadCart = createAction(
  '[Cart] Load Cart from Storage',
  props<{ items: CartItem[] }>(),
);

export const addToCart = createAction('[Product] Add to Cart', props<{ product: Product }>());

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ productId: number }>(),
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; change: number }>(),
);

export const clearCart = createAction('[Cart] Clear Cart');
