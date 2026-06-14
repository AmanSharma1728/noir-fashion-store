import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Product } from '../../core/models/product.model';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'http://localhost:3000/api';

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts, ROOT_EFFECTS_INIT),
      switchMap(() =>
        this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductsActions.loadProductsFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  getProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProductsByCategory),
      switchMap(({ category }) =>
        this.http.get<Product[]>(`${this.apiUrl}/products/category/${category}`).pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductsActions.loadProductsFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  getProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProductById),
      switchMap(({ id }) =>
        this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
          map((product) => ProductsActions.loadProductsSuccess({ products: [product] })),
          catchError((error) => of(ProductsActions.loadProductsFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.addProduct),
      switchMap(({ productData }) =>
        this.http.post<{ success: boolean; product: Product }>(`${this.apiUrl}/products`, productData).pipe(
          map(({ product }) => ProductsActions.addProductSuccess({ product })),
          catchError((error) => of(ProductsActions.addProductFailure({ error: error.message }))),
        ),
      ),
    ),
  );


  addProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.addProductSuccess),
        tap(() => {
          alert('Product added successfully.');
          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );
}
