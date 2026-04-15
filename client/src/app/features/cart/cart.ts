import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../../core/services/cart';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent {
  cartService = inject(Cart);
}
