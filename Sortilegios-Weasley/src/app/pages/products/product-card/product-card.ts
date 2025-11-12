import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../services/products.service';
import { CauldronService } from '../../../services/cualdron.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input() product!: Product;

  // 👉 nuevo: permite que el padre (catálogo) decida si mostrar botón Editar
  @Input() showEdit: boolean = false;

  constructor(private cauldronService: CauldronService) {}

  addToCauldron(product: Product) {
    this.cauldronService.addItem(product);
  }
}