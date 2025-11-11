// src/app/services/reviews.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, filter, switchMap, take } from 'rxjs';

export interface Review {
  author: string;
  text: string;
  rating: number; // 1..5
  avatar?: string;
  createdAt: string; // ISO date
}

type ReviewMap = Record<number, Review[]>;

const LS_KEY = 'weasley-reviews';
const SEED_URL = 'assets/data/reviews.seed.json';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private http = inject(HttpClient);

  private cache: ReviewMap = {};
  private subjects = new Map<number, BehaviorSubject<Review[]>>();

  private ready$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.init();
  }

  private init() {
    try {
      const raw = localStorage.getItem(LS_KEY);

      // Si no hay datos → cargar seed
      if (!raw || raw.trim() === '' || raw.trim() === '{}') {
        this.http.get<ReviewMap>(SEED_URL).subscribe({
          next: (data) => {
            this.cache = data || {};
            this.persist();
            this.notifyAll();
            this.ready$.next(true);
          },
          error: () => {
            this.cache = {};
            this.persist();
            this.ready$.next(true);
          }
        });
      } else {
        this.cache = JSON.parse(raw) as ReviewMap;
        this.ready$.next(true);
      }
    } catch {
      this.cache = {};
      this.persist();
      this.ready$.next(true);
    }
  }

  private ensureReady(): Observable<boolean> {
    return this.ready$.pipe(filter(Boolean), take(1));
  }

  private notifyAll() {
    for (const [pid, subj] of this.subjects) {
      subj.next([...(this.cache[pid] ?? [])]);
    }
  }

  /** Obtener reseñas por producto como observable */
  getReviews(productId: number): Observable<Review[]> {
    if (!this.subjects.has(productId)) {
      const initial = this.cache[productId] ?? [];
      this.subjects.set(productId, new BehaviorSubject<Review[]>([...initial]));
    }
    const subj = this.subjects.get(productId)!;

    return this.ensureReady().pipe(
      switchMap(() => {
        subj.next([...(this.cache[productId] ?? [])]);
        return subj.asObservable();
      })
    );
  }

  /** Agregar reseña */
  addReview(productId: number, review: Omit<Review, 'createdAt'>): void {
    const withDate: Review = {
      ...review,
      createdAt: new Date().toISOString()
    };

    const list = this.cache[productId] ?? [];
    // Nuevas reseñas primero:
    this.cache[productId] = [withDate, ...list];
    this.persist();

    const subj = this.subjects.get(productId);
    if (subj) subj.next([...(this.cache[productId] ?? [])]);
  }

  /** Borrar reseñas y recargar seed (solo desarrollo) */
  resetDemo(): void {
    localStorage.removeItem(LS_KEY);
    this.cache = {};
    this.ready$.next(false);
    this.init();
  }

  private persist() {
    localStorage.setItem(LS_KEY, JSON.stringify(this.cache));
  }
}
