// src/app/services/reviews.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, shareReplay, tap } from 'rxjs';

export interface Review {
  id_resena?: number;       // ID real que devuelve tu backend
  id_usuario: number;
  id_producto: number;
  calificacion: number;
  fecha?: string;
  comentario: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private http = inject(HttpClient);

  private API_URL = 'http://localhost:3000/api/resenas';

  private cache = new Map<number, BehaviorSubject<Review[]>>();

  /** Obtener reseñas de un producto */
  getReviews(productId: number): Observable<Review[]> {
    if (!this.cache.has(productId)) {
      this.cache.set(productId, new BehaviorSubject<Review[]>([]));

      this.http
        .get<Review[]>(`${this.API_URL}/producto/${productId}`)
        .subscribe(list => {
          this.cache.get(productId)!.next(list);
        });
    }

    return this.cache.get(productId)!.asObservable().pipe(shareReplay(1));
  }

  /** Obtener promedio de calificación */
  getAverage(productId: number): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/producto/${productId}/promedio`);
  }

  /** Crear nueva reseña */
  addReview(review: {
    rating: number;       // calificación
    text: string;         // comentario
    id_producto: number;  
    id_usuario: number;  
  }): Observable<any> {

    // Adaptar al formato que tu backend espera
    const body = {
      id_usuario: review.id_usuario,
      id_producto: review.id_producto,
      calificacion: review.rating,
      comentario: review.text
    };

    return this.http.post(this.API_URL, body).pipe(
      tap(() => {
        // Refrescar cache con la ruta correcta
        const subject = this.cache.get(review.id_producto);
        if (subject) {
          this.http
            .get<Review[]>(`${this.API_URL}/producto/${review.id_producto}`)
            .subscribe(list => subject.next(list));
        }
      })
    );
  }
}
