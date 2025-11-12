import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap, switchMap } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: string;
  unit: string;
  description: string;
  category: string;
  image: string;
  warning?: string;
  stock?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private jsonUrl = 'assets/data/products.json';
  private storageKey = 'weasley-products';

  constructor(private http: HttpClient) {}

  /** 🔹 Obtiene productos: primero del localStorage, si no, del JSON */
  getProducts(): Observable<Product[]> {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      return of(JSON.parse(stored));
    } else {
      return this.http.get<Product[]>(this.jsonUrl).pipe(
        tap(products => this.saveToStorage(products)) // guarda el json inicial
      );
    }
  }

  /** 🔹 Guarda la lista completa de productos en localStorage */
  private saveToStorage(products: Product[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  /** 🔹 Obtiene un producto por id */
  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  /** 🔹 Agrega un nuevo producto */
  addProduct(newProduct: Product): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        const updated = [...products, newProduct];
        this.saveToStorage(updated);
        return updated;
      })
    );
  }

  /** 🔹 Edita un producto existente */
  updateProduct(updated: Product): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        const index = products.findIndex(p => p.id === updated.id);
        if (index !== -1) {
          products[index] = updated;
          this.saveToStorage(products);
        }
        return products;
      })
    );
  }

  /** 🔹 Elimina un producto */
  deleteProduct(id: number): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        const filtered = products.filter(p => p.id !== id);
        this.saveToStorage(filtered);
        return filtered;
      })
    );
  }

  /** 🔹 Resetea los productos al JSON original (para pruebas) */
  resetToDefault(): void {
    this.http.get<Product[]>(this.jsonUrl).subscribe(products => {
      this.saveToStorage(products);
    });
  }
}