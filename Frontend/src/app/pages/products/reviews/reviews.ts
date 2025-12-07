import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { ReviewsService, Review } from '../../../services/reviews.service';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class ProductReviews {
  private route = inject(ActivatedRoute);
  private reviewsSvc = inject(ReviewsService);

  reviews$: Observable<Review[]> = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    filter(id => !!id), // ⬅ evita id = null o 0
    switchMap(id => this.reviewsSvc.getReviews(id))
  );
}
