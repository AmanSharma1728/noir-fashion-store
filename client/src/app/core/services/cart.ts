import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { Auth } from './auth';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  cartItems = signal<CartItem[]>([]);
  http = inject(HttpClient);
  authService = inject(Auth);

  constructor() {
    //if some cart data already exists
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.set(JSON.parse(savedCart));
    }

    //if there is no saved cart then what?
    //then we create a new cart
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    });
  }

  cartCount = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });

  //cart = computed(() => this.cartItems.asReadonly());

  addToCart(product: Product) {
    this.cartItems.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...items, { product, quantity: 1 }];
      }
    });
  }

  totalPrice = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  });

  removeFromCart(productId: number) {
    this.cartItems.update((items) => items.filter((item) => item.product.id !== productId));
  }

  clearCart() {
    this.cartItems.set([]);
  }

  updateQuantity(productId: number, change: number) {
    this.cartItems.update((items) => {
      return items
        .map((item) => {
          if (item.product.id === productId) return { ...item, quantity: item.quantity + change };
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  }
}
