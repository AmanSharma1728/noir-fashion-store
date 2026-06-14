import { Injectable, inject } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';

import * as CartActions from './cart.actions';
import { selectCartItems } from './cart.selectors';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  hydrate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        tap(() => {
          const savedCart = localStorage.getItem('cart');

          if (savedCart) {
            this.store.dispatch(CartActions.loadCart({ items: JSON.parse(savedCart) }));
          }
        }),
      ),
    { dispatch: false },
  );

  persist$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions.addToCart,
          CartActions.removeFromCart,
          CartActions.updateQuantity,
          CartActions.clearCart,
        ),
        withLatestFrom(this.store.select(selectCartItems)),
        tap(([, items]) => {
          localStorage.setItem('cart', JSON.stringify(items));
        }),
      ),
    { dispatch: false },
  );
}
