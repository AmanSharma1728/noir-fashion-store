import { createReducer, on } from '@ngrx/store';

import { Product } from '../../core/models/product.model';
import * as ProductsActions from './products.actions';

export const productsFeatureKey = 'products';

export interface ProductsState {
  products: Product[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

export const initialState: ProductsState = {
  products: [],
  searchQuery: '',
  loading: false,
  error: null,
};

export const productsReducer = createReducer(
  initialState,

  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),

  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ProductsActions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query,
  })),

  on(ProductsActions.getProductsByCategory, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProductsActions.addProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductsActions.addProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    loading: false,
  })),

  on(ProductsActions.addProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
