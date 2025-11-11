import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home },

  {
    path: 'catalogo',
    loadComponent: () =>
      import('./pages/products/products').then(
        (m) => m.Products
      ),
  },

  {
    path: 'caldero-magico',
    loadComponent: () =>
      import('./pages/cart/cart').then((m) => m.Cart),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.Login),
  },
  {
  path: 'catalogo/:id',
  loadComponent: () =>
    import('./pages/products/product-detail/product-detail')
      .then(m => m.ProductDetail), 
  },
  {
  path: 'register',
  loadComponent: () =>
    import('./pages/register/register').then((m) => m.Register),
  },
  {
  path: 'checkout',
  loadComponent: () =>
    import('./pages/checkout/checkout').then(m => m.Checkout),
  },
  {
  path: 'catalogo/:id/resenas',
  loadComponent: () =>
    import('./pages/products/reviews/reviews').then(m => m.ProductReviews),
},
];
