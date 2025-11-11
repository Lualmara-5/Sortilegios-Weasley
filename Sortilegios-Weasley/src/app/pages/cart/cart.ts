import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CauldronService, CartItem } from '../../services/cualdron.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  items$!: Observable<CartItem[]>;

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
}
