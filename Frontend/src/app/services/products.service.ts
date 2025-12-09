// src/app/services/products.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map, tap, catchError } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: string;      // Ejemplos: "120000 COP", "7 galeones", "12 USD"
  unit: string;       // Ejemplos: "unidad", "frasco", "pack"
  description: string;
  category: string;   // Ejemplos: "pociones", "dulces mágicos", etc.
  image: string;      // URL o dataURL (base64)
  warning?: string;   
  stock?: number;     
}

// Interfaz para el producto del backend (ajusta según tu BD)
interface BackendProduct {
  id_producto: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: string;
  imagen: string;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private apiUrl = 'http://localhost:3000/api/catalogo';
  private jsonUrl = 'assets/data/products.json';
  private storageKey = 'weasley-products';
  private useBackend = true; // Flag para alternar entre backend y localStorage

  constructor(private http: HttpClient) {}

  /**
   * Convierte producto del backend al formato del frontend
   */
  private mapBackendToProduct(bp: BackendProduct): Product {
    return {
      id: bp.id_producto,
      name: bp.nombre,
      price: `${bp.precio} COP`, // Ajusta según tu moneda
      unit: 'unidad',
      description: bp.descripcion || '',
      category: bp.categoria || '',
      image: bp.imagen || '',
      stock: bp.stock || 0
    };
  }

  /**
   * Convierte producto del frontend al formato del backend
   */
  private mapProductToBackend(p: Product): Partial<BackendProduct> {
    // Extrae el número del precio (ej: "120000 COP" -> 120000)
    const priceNum = parseFloat(p.price.replace(/[^0-9.]/g, '')) || 0;
    
    return {
      nombre: p.name,
      precio: priceNum,
      descripcion: p.description,
      categoria: p.category,
      imagen: p.image,
      stock: p.stock || 0
    };
  }

  /**
   * Inicializa el catálogo en localStorage si aún no existe (fallback)
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

  /**
   * Obtiene todos los productos
   * Intenta desde el backend primero, si falla usa localStorage
   */
  getProducts(): Observable<Product[]> {
    if (!this.useBackend) {
      return this.ensureInitialized();
    }

    return this.http.get<BackendProduct[]>(this.apiUrl).pipe(
      map(backendProducts => backendProducts.map(bp => this.mapBackendToProduct(bp))),
      catchError(error => {
        console.warn('Backend no disponible, usando localStorage:', error);
        this.useBackend = false;
        return this.ensureInitialized();
      })
    );
  }

  /** Obtiene un producto por id */
  getProductById(id: number): Observable<Product | undefined> {
    if (!this.useBackend) {
      return this.getProducts().pipe(map(products => products.find(p => p.id === id)));
    }

    return this.http.get<BackendProduct>(`${this.apiUrl}/${id}`).pipe(
      map(bp => this.mapBackendToProduct(bp)),
      catchError(error => {
        console.warn('Backend no disponible para producto individual:', error);
        return this.getProducts().pipe(map(products => products.find(p => p.id === id)));
      })
    );
  }

  /**
   * Agrega un producto
   * Si usa backend, envía FormData para soportar imagen
   */
  addProduct(newProduct: Product, imageFile?: File): Observable<Product[]> {
    if (!this.useBackend) {
      return this.ensureInitialized().pipe(
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

    // Crear FormData para enviar al backend
    const formData = new FormData();
    const backendData = this.mapProductToBackend(newProduct);
    
    formData.append('nombre', backendData.nombre || '');
    formData.append('precio', backendData.precio?.toString() || '0');
    formData.append('descripcion', backendData.descripcion || '');
    formData.append('categoria', backendData.categoria || '');
    formData.append('stock', backendData.stock?.toString() || '0');
    
    if (imageFile) {
      formData.append('imagen', imageFile);
    } else if (newProduct.image) {
      formData.append('imagen', newProduct.image);
    }

    return this.http.post<BackendProduct>(this.apiUrl, formData).pipe(
      map(bp => [this.mapBackendToProduct(bp)]),
      catchError(error => {
        console.error('Error al agregar producto en backend:', error);
        throw error;
      })
    );
  }

  /**
   * Edita un producto existente
   */
  updateProduct(updated: Product, imageFile?: File): Observable<Product[]> {
    if (!this.useBackend) {
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

    const formData = new FormData();
    const backendData = this.mapProductToBackend(updated);
    
    formData.append('nombre', backendData.nombre || '');
    formData.append('precio', backendData.precio?.toString() || '0');
    formData.append('descripcion', backendData.descripcion || '');
    formData.append('categoria', backendData.categoria || '');
    formData.append('stock', backendData.stock?.toString() || '0');
    
    if (imageFile) {
      formData.append('imagen', imageFile);
    }

    return this.http.put<BackendProduct>(`${this.apiUrl}/${updated.id}`, formData).pipe(
      map(bp => [this.mapBackendToProduct(bp)]),
      catchError(error => {
        console.error('Error al actualizar producto en backend:', error);
        throw error;
      })
    );
  }

  /** Elimina un producto por id */
  deleteProduct(id: number): Observable<Product[]> {
    if (!this.useBackend) {
      return this.getProducts().pipe(
        map(products => {
          const next = products.filter(p => p.id !== id);
          this.saveToStorage(next);
          return next;
        })
      );
    }

    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      map(() => []), // Retorna array vacío después de eliminar
      catchError(error => {
        console.error('Error al eliminar producto en backend:', error);
        throw error;
      })
    );
  }

  /** Restaura el catálogo desde el JSON original */
  resetToDefault(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonUrl).pipe(
      tap(list => this.saveToStorage(list))
    );
  }

  /**
   * Búsqueda y filtrado
   */
  searchAndFilter(params: { q?: string; category?: string }): Observable<Product[]> {
    const { q, category } = params || {};
    
    return this.getProducts().pipe(
      map(products => {
        let result = products;
        
        if (q?.trim()) {
          const qNorm = q.trim().toLowerCase();
          result = result.filter(p =>
            (p.name || '').toLowerCase().includes(qNorm) ||
            (p.description || '').toLowerCase().includes(qNorm)
          );
        }
        
        if (category?.trim()) {
          const catNorm = category.trim().toLowerCase();
          result = result.filter(p => (p.category || '').toLowerCase() === catNorm);
        }
        
        return result;
      })
    );
  }

  /**
   * Alternar entre modo backend y localStorage (útil para desarrollo)
   */
  setBackendMode(enabled: boolean): void {
    this.useBackend = enabled;
  }

  /**
   * Verifica si el backend está disponible
   */
  checkBackendHealth(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}