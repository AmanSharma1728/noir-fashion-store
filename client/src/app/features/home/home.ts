import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  productService = inject(ProductService);

  products = this.productService.filteredProducts;

  categories$: Observable<string[]> = this.productService.getCategories();

  filterCategory(category: string) {
    if (category === 'All') this.productService.getProducts().subscribe();
    else this.productService.getProductsByCategory(category).subscribe();
  }

  ngOnInit() {
    this.productService.loadProducts();
  }
}
