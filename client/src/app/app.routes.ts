import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { ProductDetail } from './features/product-detail/product-detail';
import { CartComponent } from './features/cart/cart';
import { Login } from './features/login/login';
import { Checkout } from './features/checkout/checkout';
import { authGuard } from './core/guards/auth-guard';
import { Seller } from './features/seller/seller';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'products/:id',
    component: ProductDetail,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'checkout',
    component: Checkout,
    canActivate: [authGuard],
  },
  {
    path: 'seller',
    component: Seller,
  },
];
