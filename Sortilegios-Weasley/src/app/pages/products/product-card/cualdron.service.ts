import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../products.service';

@Injectable({
  providedIn: 'root'
})
export class CauldronService {
  private items: Product[] = [];
  private itemsSubject = new BehaviorSubject<Product[]>([]);

  items$ = this.itemsSubject.asObservable();

  addItem(product: Product) {
    this.items.push(product);
    this.itemsSubject.next(this.items);
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.itemsSubject.next(this.items);
  }

  clearCauldron() {
    this.items = [];
    this.itemsSubject.next([]);
  }

  getTotal(): string {
    // Aquí podrías convertir sickles/galeones a una unidad común más adelante.
    return `${this.items.length} productos en el caldero`;
  }
}
