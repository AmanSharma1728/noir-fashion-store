import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CartItem } from '../../core/models/cart-item';
import * as CartActions from '../../store/cart/cart.actions';
import { selectCartCount, selectCartItems, selectCartTotal } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent {
  private store = inject(Store);

  cartItems$: Observable<CartItem[]> = this.store.select(selectCartItems);
  cartCount$: Observable<number> = this.store.select(selectCartCount);
  cartTotal$: Observable<number> = this.store.select(selectCartTotal);

  updateQuantity(productId: number, change: number) {
    this.store.dispatch(CartActions.updateQuantity({ productId, change }));
  }

  removeFromCart(productId: number) {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }
}
