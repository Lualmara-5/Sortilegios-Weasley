import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../../services/products.service';
import { ProductCard } from './product-card/product-card';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    console.log('📦 ProductsComponent cargado');
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}
