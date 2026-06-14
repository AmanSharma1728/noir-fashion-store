import { CommonModule } from '@angular/common';
import { Component, inject, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectCartCount } from '../../store/cart/cart.selectors';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';
import * as ProductsActions from '../../store/products/products.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private store = inject(Store);

  currentUser$ = this.store.select(selectCurrentUser);
  cartCount$ = this.store.select(selectCartCount);

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  // Close menu on Escape key
  @HostListener('document:keydown.escape')
  onEscape() {
    this.menuOpen = false;
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.store.dispatch(ProductsActions.setSearchQuery({ query: input.value }));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
