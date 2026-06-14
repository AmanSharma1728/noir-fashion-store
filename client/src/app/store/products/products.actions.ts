import { createAction, props } from '@ngrx/store';

import { Product } from '../../core/models/product.model';

export const loadProducts = createAction('[Home] Load Products');

export const loadProductsSuccess = createAction(
  '[Products Effects] Load Products Success',
  props<{ products: Product[] }>(),
);

export const loadProductsFailure = createAction(
  '[Products Effects] Load Products Failure',
  props<{ error: string }>(),
);

export const getProductById = createAction(
  '[Product Detail] Get Product By Id',
  props<{ id: number }>(),
);

export const setSearchQuery = createAction('[Header] Set Search Query', props<{ query: string }>());

export const getProductsByCategory = createAction(
  '[Products List] Get Products by Category',
  props<{ category: string }>(),
);

export const addProduct = createAction(
  '[Seller] Add Product',
  props<{ productData: Partial<Product> }>(),
);

export const addProductSuccess = createAction(
  '[Products Effects] Add Product Success',
  props<{ product: Product }>(),
);

export const addProductFailure = createAction(
  '[Products Effects] Add Product Failure',
  props<{ error: string }>(),
);
