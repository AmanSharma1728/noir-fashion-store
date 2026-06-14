import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { AuthEffects } from './store/auth/auth.effects';
import { authFeatureKey, authReducer } from './store/auth/auth.reducer';
import { CartEffects } from './store/cart/cart.effects';
import { cartFeatureKey, cartReducer } from './store/cart/cart.reducer';
import { ProductsEffects } from './store/products/products.effects';
import { productsFeatureKey, productsReducer } from './store/products/products.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore({
      [authFeatureKey]: authReducer,
      [cartFeatureKey]: cartReducer,
      [productsFeatureKey]: productsReducer,
    }),
    provideEffects([AuthEffects, CartEffects, ProductsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
