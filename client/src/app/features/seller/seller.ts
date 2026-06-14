import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as ProductsActions from '../../store/products/products.actions';
import { Product } from '../../core/models/product.model';

import {
  selectProductsLoading,
  selectProductsError,
} from '../../store/products/products.selectors';

@Component({
  selector: 'app-seller',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './seller.html',
  styleUrl: './seller.scss',
})
export class Seller {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  productForm = this.fb.group({
    title: ['', Validators.required],
    price: ['', Validators.required],
    category: ['jackets', Validators.required],
    image: ['', Validators.required],
    description: [''],
  });

  onSubmit() {
    if (this.productForm.invalid) return;
    this.store.dispatch(ProductsActions.addProduct({ productData: this.productForm.value as Partial<Product> }));
    // Navigation and success alert are handled by addProductSuccess$ in products.effects.ts
  }
}
