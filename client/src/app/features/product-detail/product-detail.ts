import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../../core/models/product.model';
import { selectProductById } from '../../store/products/products.selectors';
import * as ProductsActions from '../../store/products/products.actions';
import * as CartActions from '../../store/cart/cart.actions';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  product$: Observable<Product | undefined> | undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(ProductsActions.getProductById({ id }));
    this.product$ = this.store.select(selectProductById(id));
  }

  addToCart(product: Product) {
    this.store.dispatch(CartActions.addToCart({ product }));
    alert('Added to Bag!');
  }
}
