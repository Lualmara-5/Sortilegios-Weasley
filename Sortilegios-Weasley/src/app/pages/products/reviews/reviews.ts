import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { ReviewsService, Review } from '../../../services/reviews.service';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class ProductReviews {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private reviewsSvc: ReviewsService = inject(ReviewsService);

  productId$: Observable<number> = this.route.paramMap.pipe(
    map(params => Number(params.get('id')))
  );

  reviews$: Observable<Review[]> = this.productId$.pipe(
    switchMap(id => this.reviewsSvc.getReviews(id))
  );
}