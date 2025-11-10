import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Product {
  id: number;
  name: string;
  price: string;
  unit: string;
  description: string;
  category: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private jsonUrl = 'assets/data/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonUrl);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(p => p.id === id))
    );
  }
}