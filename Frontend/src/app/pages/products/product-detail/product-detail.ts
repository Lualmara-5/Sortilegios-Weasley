// src/app/pages/products/product-detail/product-detail.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product } from '../../../services/products.service';
import { ReviewsService, Review } from '../../../services/reviews.service';
import { WishlistService } from '../../../services/wishlist.service';
import { Observable, map, shareReplay, switchMap } from 'rxjs';
import { AnimationViewerComponent } from './animations/animation-viewer';
import { hasAnimation } from './animations/product-animations';
import { CauldronService } from '../../../services/cualdron.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, AnimationViewerComponent],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {

  private route = inject(ActivatedRoute);
  private products = inject(ProductsService);
  private reviewsSvc = inject(ReviewsService);
  private wishlistSvc = inject(WishlistService);
  private cauldronSvc = inject(CauldronService);

  Math = Math;

  /** Obtener el producto por ID */
  product$: Observable<Product | undefined> = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.products.getProductById(id)),
    shareReplay(1)
  );

  /** Reseñas del backend */
  reviews$: Observable<Review[]> = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.reviewsSvc.getReviews(id)),
    shareReplay(1)
  );

  /** Promedio desde el backend */
  avgRating$: Observable<number> = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.reviewsSvc.getAverage(id))
  );

  showForm = false;

  currentUserJSON = localStorage.getItem('currentUser');
  user = this.currentUserJSON ? JSON.parse(this.currentUserJSON) : null;

  // Usa el campo correcto según tu backend (id_usuario o id)
  userId = this.user?.id_usuario || this.user?.id || 1;

  form = {
    rating: 5,
    text: '',
    id_usuario: this.userId
  };


  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitReview(productId: number) {

    if (!this.form.text) return;

    this.reviewsSvc.addReview({
      rating: Number(this.form.rating),
      text: this.form.text,
      id_producto: productId,
      id_usuario: this.form.id_usuario
    }).subscribe(() => {

      // Limpiar formulario
      this.showForm = false;
      this.form = { rating: 5, text: '', id_usuario: 1 };

    });
  }

  addToWishlist(product: Product) {
    this.wishlistSvc.agregarDeseo(product);
    alert(`¡${product.name} añadido a tu lista de deseos! ✨`);
  }

  agregarAlCaldero(deseo: Product) {
    const productoReal = this.wishlistSvc['products'].find(
      (p: Product) => p.name.toLowerCase() === deseo.name.toLowerCase()
    );

    if (productoReal) {
      this.cauldronSvc.addItem(productoReal);
      alert(`${productoReal.name} ha sido agregado al caldero mágico 🧙‍♂️`);
    } else {
      alert(`No se encontró el producto ${deseo.name} en el inventario 🕵️‍♀️`);
    }
  }


  hasAnimation = hasAnimation;
}
