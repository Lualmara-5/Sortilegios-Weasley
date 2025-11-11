import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CauldronService, CartItem } from '../../services/cualdron.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  items$!: Observable<CartItem[]>;
  private router = inject(Router);

  constructor(public cauldronService: CauldronService) {
    this.items$ = this.cauldronService.items$;
  }

  increase(id: number) {
    this.cauldronService.increase(id);
  }
  decrease(id: number) {
    this.cauldronService.decrease(id);
  }
  remove(id: number) {
    this.cauldronService.removeItem(id);
  }
  clear() {
    this.cauldronService.clearCauldron();
  }

  /** Guarda snapshot del carrito en localStorage y navega a /checkout */
  goCheckout() {
    this.items$.pipe(take(1)).subscribe(items => {
      // Adaptamos el shape a lo que espera Checkout
      const snapshot = items.map(it => ({
        id: it.product.id,
        name: it.product.name,
        price: it.product.price,   // puede ser "38 USD", "5 galeones", "11 sickles", "120000 COP"
        unit: it.product.unit,
        qty: it.quantity,
        image: it.product.image
      }));
      localStorage.setItem('weasley-cart', JSON.stringify(snapshot));
      this.router.navigate(['/checkout']);
    });
  }
}