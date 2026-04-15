import { Component, inject } from '@angular/core';
import { Cart } from '../../core/services/cart';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  cartService = inject(Cart);
  router = inject(Router);

  name = '';
  address = '';
  cardNumber = '';

  onPay() {
    //display the alert that the payment is being processed
    alert('processing payment...');
    setTimeout(() => {
      //clear the cart
      this.cartService.clearCart();

      //display the alert that order has been placed successfully
      alert('order placed successfully');

      //redirect to home page
      this.router.navigate(['/']);
    }, 1500);
  }
}
