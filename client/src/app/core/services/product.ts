import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { Search } from './search';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //HttpClient will talk to the backend
  private http = inject(HttpClient);

  //search service
  searchService = inject(Search);

  //backend url
  private apiUrl = 'http://localhost:3000/api';

  products = signal<Product[]>([]);

  filteredProducts = computed(() => {
    const query = this.searchService.searchQuery().toLowerCase().trim();

    if (!query) return this.products();

    return this.products().filter((product) => {
      const title = product.title.toLowerCase();
      const category = product.category.toLowerCase();
      return title.includes(query) || category.includes(query);
    });
  });

  //api methods
  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl + '/products')
      .pipe(tap((data) => this.products.set(data)));
  }

  loadProducts() {
    this.getProducts().subscribe();
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + '/products/' + id);
  }

  getCategories() {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getProductsByCategory(category: string) {
    return this.http
      .get<Product[]>(`${this.apiUrl}/products/category/${category}`)
      .pipe(tap((data) => this.products.set(data)));
  }

  addProduct(productData: any) {
    return this.http.post<Product>(`${this.apiUrl}/products`, productData).pipe(
      tap((newProduct) => {
        this.products.update((current) => [...current, newProduct]);
      })
    );
  }
}
