import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CauldronService } from '../../services/cualdron.service';
import { Product } from '../../services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart {

  items$!: Observable<Product[]>; // ✅ Declarar, no asignar aún

  constructor(private cauldronService: CauldronService) {
    this.items$ = this.cauldronService.items$; // ✅ Ahora se puede usar this.cauldronService
  }

  remove(id: number) {
    this.cauldronService.removeItem(id);
  }

  clear() {
    this.cauldronService.clearCauldron();
  }
}
