import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService, Product } from '../../../services/products.service';
import { Observable, map, switchMap, shareReplay } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private products = inject(ProductsService);

  product$: Observable<Product | undefined> = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),        
    switchMap(id => this.products.getProductById(id)),
    shareReplay(1)
  );
}