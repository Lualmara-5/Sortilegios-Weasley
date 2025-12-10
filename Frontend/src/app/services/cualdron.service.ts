import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './products.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CauldronService {
  private items: CartItem[] = [];
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  addItem(product: Product) {
    const existing = this.items.find(i => i.product.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }

    this.itemsSubject.next([...this.items]);
  }

  increase(id: number) {
    const item = this.items.find(i => i.product.id === id);
    if (item) {
      item.quantity++;
      this.itemsSubject.next([...this.items]);
    }
  }

  decrease(id: number) {
    const item = this.items.find(i => i.product.id === id);
    if (!item) return;

    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(id);
      return;
    }

    this.itemsSubject.next([...this.items]);
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.product.id !== id);
    this.itemsSubject.next([...this.items]);
  }

  clearCauldron() {
    this.items = [];
    this.itemsSubject.next([]);
  }
  // 🪙 Convert price string → COP
  private convertPriceToCOP(price: string): number {
    const [amountStr, type] = price.split(' ');
    const amount = Number(amountStr);

    const rates: Record<string, number> = {
      galleon: 50000,
      galleons: 50000,
      sickle: 3000, 
      sickles: 3000,
      knut: 100,
      knuts: 100
    };

    return amount * (rates[type.toLowerCase()] || 0);
  }
    // --- añadir en CauldronService ---
  /** Conversión pública: cadena de precio -> valor en COP (reusa la lógica privada) */
  public priceStringToCOP(price: string): number {
    return this.convertPriceToCOP(price);
  }


  // 💰 Total final en COP
  getTotalCOP(): number {
    return this.items.reduce((sum, item) =>
      sum + (this.convertPriceToCOP(item.product.price) * item.quantity),
      0
    );
  }
}
