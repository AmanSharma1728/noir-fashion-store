import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './seller.html',
  styleUrl: './seller.scss',
})
export class Seller {
  fb = inject(FormBuilder);
  productService = inject(ProductService);
  router = inject(Router);

  productForm = this.fb.group({
    title: ['', Validators.required],
    price: ['', Validators.required],
    category: ['jackets', Validators.required],
    image: ['', Validators.required],
    description: [''],
  });

  onSubmit() {
    if (this.productForm.invalid) return;
    this.productService.addProduct(this.productForm.value).subscribe({
      next: () => {
        alert('Product added successfully.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Error adding product');
      },
    });
  }
}
