import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import reviewsData from '../../assets/data/reviews.seed.json';

export interface Review {
  author: string;
  text: string;
  rating: number;
  avatar: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  // Estructura: { [productId: string]: Review[] }
  private reviews: Record<string, Review[]> = reviewsData as Record<string, Review[]>;

  constructor() {}

  /** Devuelve las reseñas de un producto específico */
  getReviews(productId: number): Observable<Review[]> {
    const list = this.reviews[String(productId)] || [];
    return of(list);
  }

  /** Agrega una reseña (en memoria). Si quieres persistir, combina con localStorage. */
  addReview(productId: number, review: Omit<Review, 'createdAt'>) {
    const newReview: Review = {
      ...review,
      createdAt: new Date().toISOString(),
    };
    const key = String(productId);
    if (!this.reviews[key]) this.reviews[key] = [];
    this.reviews[key].push(newReview);
  }
}