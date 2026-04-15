import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { Cart } from '../../core/services/cart';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(Cart);

  product$: Observable<Product> | undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.product$ = this.productService.getProductById(id);
  }

  addToCart(product: Product) {
    //console.log('Adding to cart:', product.name);
    this.cartService.addToCart(product);
    alert('Added to Bag!');
  }
}
