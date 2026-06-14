import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState, productsFeatureKey } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>(productsFeatureKey);

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products,
);

export const selectSearchQuery = createSelector(
  selectProductsState,
  (state: ProductsState) => state.searchQuery,
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loading,
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error,
);

export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectSearchQuery,
  (products, query) => {
    if (!query.trim()) return products;

    const lowerQuery = query.toLowerCase();
    return products.filter((product) => {
      const title = product.title.toLowerCase();
      const category = product.category.toLowerCase();
      return title.includes(lowerQuery) || category.includes(lowerQuery);
    });
  },
);

export const selectProductById = (id: number) =>
  createSelector(selectAllProducts, (products) => products.find((p) => p.id === id));
