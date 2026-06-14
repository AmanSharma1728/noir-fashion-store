import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  selectFilteredProducts,
  selectProductsLoading,
} from '../../store/products/products.selectors';
import * as ProductsActions from '../../store/products/products.actions';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private store = inject(Store);

  products$ = this.store.select(selectFilteredProducts);
  loading$ = this.store.select(selectProductsLoading);

  categories: string[] = ['jackets', 'tops', 'bottoms', 'accessories', 'shoes'];

  filterCategory(category: string) {
    if (category === 'All') {
      this.store.dispatch(ProductsActions.loadProducts());
    } else {
      this.store.dispatch(ProductsActions.getProductsByCategory({ category }));
    }
  }

  constructor() {
    this.store.dispatch(ProductsActions.loadProducts());
  }
}
