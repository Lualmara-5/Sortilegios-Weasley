import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, map, switchMap, shareReplay } from 'rxjs';

import { ProductsService, Product } from '../../../services/products.service';
import { ReviewsService, Review } from '../../../services/reviews.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  // inyecciones
  private route = inject(ActivatedRoute);
  private products = inject(ProductsService);
  private reviewsSvc = inject(ReviewsService);
  Math = Math;

  // id de producto desde la ruta
  productId$: Observable<number> = this.route.paramMap.pipe(
    map(params => Number(params.get('id')))
  );

  // producto
  product$: Observable<Product | undefined> = this.productId$.pipe(
    switchMap(id => this.products.getProductById(id)),
    shareReplay(1)
  );

  // refresco manual para que el async se actualice al añadir reseña
  private refresh$ = new BehaviorSubject<void>(undefined);

  // reseñas y promedio
  reviews$: Observable<Review[]> = combineLatest([this.productId$, this.refresh$]).pipe(
    switchMap(([id]) => this.reviewsSvc.getReviews(id))
  );

  avgRating$: Observable<number> = this.reviews$.pipe(
    map(list => {
      if (!list.length) return 0;
      const sum = list.reduce((acc, r) => acc + (r.rating || 0), 0);
      return sum / list.length;
    })
  );

  // UI form
  showForm = false;
  form: { author: string; rating: number; text: string } = {
    author: '',
    rating: 5,
    text: '',
  };

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitReview(productId: number) {
    // validación mínima
    const author = this.form.author?.trim();
    const text = this.form.text?.trim();
    const rating = Number(this.form.rating) || 5;

    if (!author || !text) return;

    this.reviewsSvc.addReview(productId, {
      author,
      text,
      rating,
      avatar: 'assets/img/avatars/default.png',
    });

    // limpiar y refrescar
    this.form = { author: '', rating: 5, text: '' };
    this.showForm = false;
    this.refresh$.next(); // fuerza actualización del async pipe
  }
}