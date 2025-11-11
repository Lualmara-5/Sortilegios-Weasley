import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './products.service';

export interface Deseo {
  id: number;
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Deseo[] = [];
  private deseosSubject = new BehaviorSubject<Deseo[]>([]);
  deseos$ = this.deseosSubject.asObservable();

  private products: Product[] = [];

  constructor(private http: HttpClient) {
    // Cargar productos del JSON solo si los vas a usar para validar existencia
    this.http.get<Product[]>('assets/data/products.json').subscribe(data => {
      this.products = data;
      this.cargarDesdeLocalStorage();
    });
  }

  /** Carga la lista de deseos guardada del almacenamiento local */
  private cargarDesdeLocalStorage() {
    try {
      const guardado = localStorage.getItem('wishlist');
      if (guardado) {
        this.wishlist = JSON.parse(guardado);
        this.deseosSubject.next(this.wishlist);
      }
    } catch (error) {
      console.error('Error cargando wishlist:', error);
      this.wishlist = [];
    }
  }

  /** Agrega un nuevo producto a la lista de deseos */
  agregarDeseo(producto: Product) {
    const existe = this.wishlist.some(d => d.id === producto.id);
    if (!existe) {
      const nuevoDeseo: Deseo = {
        id: producto.id,
        name: producto.name,
        image: producto.image
      };
      this.wishlist.push(nuevoDeseo);
      this.actualizarDeseos();
    }
  }

  /** Elimina un producto de la lista de deseos por ID */
  eliminarDeseo(id: number) {
    this.wishlist = this.wishlist.filter(d => d.id !== id);
    this.actualizarDeseos();
  }

  /** Sincroniza la lista actual con el BehaviorSubject y localStorage */
  private actualizarDeseos() {
    this.deseosSubject.next([...this.wishlist]); // copia segura
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  /** Devuelve la lista actual de deseos */
  obtenerDeseos(): Deseo[] {
    return [...this.wishlist];
  }

  /** Limpia toda la lista de deseos */
  limpiarDeseos() {
    this.wishlist = [];
    this.actualizarDeseos();
  }
}
