import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../../core/services/cart';
import { Auth } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import { Search } from '../../core/services/search';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  cartService = inject(Cart);
  authService = inject(Auth);
  searchService = inject(Search);
  // cartCount = computed(() => this.cartService.cartCount());

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.searchQuery.set(input.value);
  }
}
