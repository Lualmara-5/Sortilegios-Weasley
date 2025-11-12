import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../../services/products.service';
import { ProductCard } from './product-card/product-card';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = [];
  isAdmin = false;

  private productService = inject(ProductsService);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

    const u = this.userService.getUser?.() ?? null;
    this.isAdmin = u?.role === 'admin';
  }
}