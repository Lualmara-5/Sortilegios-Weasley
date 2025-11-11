// src/app/pages/products/product-detail/product-detail.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product } from '../../../services/products.service';
import { ReviewsService, Review } from '../../../services/reviews.service';
import { Observable, map, shareReplay, switchMap } from 'rxjs';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  Math = Math; // para usar Math en el template si lo necesitas

  private route = inject(ActivatedRoute);
  private products = inject(ProductsService);
  private reviewsSvc = inject(ReviewsService);
  private wishlistSvc = inject(WishlistService)

  product$: Observable<Product | undefined> = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.products.getProductById(id)),
    shareReplay(1)
  );

  reviews$: Observable<Review[]> = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.reviewsSvc.getReviews(id)),
    shareReplay(1)
  );

  avgRating$: Observable<number> = this.reviews$.pipe(
    map(list => list.length
      ? list.reduce((s, r) => s + (r.rating || 0), 0) / list.length
      : 0)
  );

  showForm = false;
  form = {
    author: '',
    rating: 5,
    text: ''
  };

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitReview(productId: number) {
    if (!this.form.author || !this.form.text) return;
    this.reviewsSvc.addReview(productId, {
      author: this.form.author,
      text: this.form.text,
      rating: Number(this.form.rating),
      avatar: 'assets/img/avatars/default.png'
    });
    this.form = { author: '', rating: 5, text: '' };
    this.showForm = false;
  }

  // ✅ CORRECTO: ahora agrega el producto completo
  addToWishlist(product: Product) {
    this.wishlistSvc.agregarDeseo(product);
    alert(`¡${product.name} añadido a tu lista de deseos! ✨`);
  }
}