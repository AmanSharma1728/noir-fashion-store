import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as CartActions from '../../store/cart/cart.actions';
import { selectCartTotal } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private store = inject(Store);
  router = inject(Router);

  cartTotal$: Observable<number> = this.store.select(selectCartTotal);

  name = '';
  address = '';
  cardNumber = '';

  onPay() {
    alert('processing payment...');
    setTimeout(() => {
      this.store.dispatch(CartActions.clearCart());
      alert('order placed successfully');
      this.router.navigate(['/']);
    }, 1500);
  }
}
