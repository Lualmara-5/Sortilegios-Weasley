// src/app/services/products.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap, switchMap } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: string;      // Ejemplos: "120000 COP", "7 galeones", "12 USD"
  unit: string;       // Ejemplos: "unidad", "frasco", "pack"
  description: string;
  category: string;   // Ejemplos: "pociones", "dulces mágicos", etc.
  image: string;      // URL o dataURL (base64) en la demo
  warning?: string;   // Advertencia opcional
  stock?: number;     // Stock opcional
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private jsonUrl = 'assets/data/products.json';
  private storageKey = 'weasley-products';

  constructor(private http: HttpClient) {}

  /**
   * Inicializa el catálogo en localStorage si aún no existe.
   * Devuelve el arreglo persistido en localStorage (preferido), o el JSON base si no había nada.
   */
  private ensureInitialized(): Observable<Product[]> {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return of(parsed as Product[]);
      } catch { /* ignore and fetch */ }
    }
    return this.http.get<Product[]>(this.jsonUrl).pipe(
      tap(list => this.saveToStorage(list)),
    );
  }

  /** Lee del localStorage (sin inicializar si no hay nada) */
  private readStorage(): Product[] | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Product[]) : null;
    } catch {
      return null;
    }
  }

  /** Persistir arreglo completo en localStorage */
  private saveToStorage(products: Product[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  /** Calcula el próximo ID disponible */
  private getNextId(list: Product[]): number {
    return list.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
  }

  /** Obtiene todos los productos (si no hay en LS, siembra desde JSON) */
  getProducts(): Observable<Product[]> {
    return this.ensureInitialized();
  }

  /** Obtiene un producto por id */
  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(map(products => products.find(p => p.id === id)));
  }

  /**
   * Agrega un producto.
   * Si el objeto llega con id falso (0/undefined/null), se asigna automáticamente.
   */
  addProduct(newProduct: Product): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        const list = [...products];
        const id = newProduct?.id ? newProduct.id : this.getNextId(list);
        const toInsert: Product = { ...newProduct, id };
        list.push(toInsert);
        this.saveToStorage(list);
        return list;
      })
    );
  }

  /**
   * Edita un producto existente. Reemplaza por id.
   * Si no existe, no hace nada.
   */
  updateProduct(updated: Product): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        const idx = products.findIndex(p => p.id === updated.id);
        if (idx >= 0) {
          const next = [...products];
          next[idx] = { ...products[idx], ...updated };
          this.saveToStorage(next);
          return next;
        }
        return products;
      })
    );
  }

  /** Elimina un producto por id */
  deleteProduct(id: number): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        const next = products.filter(p => p.id !== id);
        this.saveToStorage(next);
        return next;
      })
    );
  }

  /** Restaura el catálogo desde el JSON original (útil para pruebas) */
  resetToDefault(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonUrl).pipe(
      tap(list => this.saveToStorage(list))
    );
  }

  /**
   * Búsqueda y filtrado básicos para el catálogo de administrador.
   * q: texto libre que busca en name y description (case-insensitive).
   * category: categoría exacta (si se provee).
   */
  searchAndFilter(params: { q?: string; category?: string }): Observable<Product[]> {
    const { q, category } = params || {};
    const qNorm = (q || '').trim().toLowerCase();
    const catNorm = (category || '').trim().toLowerCase();

    return this.getProducts().pipe(
      map(products => {
        let result = products;
        if (qNorm) {
          result = result.filter(p =>
            (p.name || '').toLowerCase().includes(qNorm) ||
            (p.description || '').toLowerCase().includes(qNorm)
          );
        }
        if (catNorm) {
          result = result.filter(p => (p.category || '').toLowerCase() === catNorm);
        }
        return result;
      })
    );
  }
}