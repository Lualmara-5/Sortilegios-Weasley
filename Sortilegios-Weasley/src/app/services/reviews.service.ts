import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

export interface Review {
  author: string;
  text: string;
  rating: number;   // 1..5
  avatar?: string;
  createdAt: string; // ISO
}
type ReviewMap = Record<number, Review[]>;

const LS_KEY  = 'weasley-reviews';
const SEED_URL = 'assets/data/reviews.seed.json';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private http = inject(HttpClient);

  private cache: ReviewMap = {};
  private subjects = new Map<number, BehaviorSubject<Review[]>>();

  // Señal interna para saber cuándo los datos están listos
  private ready$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.init();
  }

  /** Carga desde localStorage o siembra desde el seed */
  private init() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw || raw.trim() === '' || raw.trim() === '{}') {
        // No hay nada útil → traer seed
        this.http.get<ReviewMap>(SEED_URL).subscribe({
          next: (data) => {
            this.cache = data || {};
            this.persist();
            // notificar a observadores existentes (por si ya hay suscriptores)
            for (const [pid, subj] of this.subjects) {
              subj.next([...(this.cache[pid] ?? [])]);
            }
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

  /** Observa reseñas del producto. No emite hasta que ready$ sea true. */
  getReviews(productId: number): Observable<Review[]> {
    if (!this.subjects.has(productId)) {
      const initial = this.cache[productId] ?? [];
      this.subjects.set(productId, new BehaviorSubject<Review[]>([...initial]));
    }
    const subj = this.subjects.get(productId)!;

    return this.ready$.pipe(
      switchMap((ready) => {
        if (!ready) return subj.asObservable(); // no debería pasar, pero por seguridad
        // al estar listo, asegurar estado actualizado desde cache
        subj.next([...(this.cache[productId] ?? [])]);
        return subj.asObservable();
      })
    );
  }

  /** Agrega una reseña y persiste */
  addReview(productId: number, review: Omit<Review, 'createdAt'>): void {
    const withDate: Review = { ...review, createdAt: new Date().toISOString() };
    const list = this.cache[productId] ?? [];
    this.cache[productId] = [withDate, ...list]; // prepend
    this.persist();

    const subj = this.subjects.get(productId);
    if (subj) subj.next([...(this.cache[productId] ?? [])]);
  }

  /** (Opcional) Botón de desarrollo para limpiar y re-sembrar */
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