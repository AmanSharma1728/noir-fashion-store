import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, FooterComponent],
  templateUrl: './app.html',
  // styleUrl: './app.scss',
  styleUrls: ['../styles.scss'],
})
export class App {
  // protected readonly title = signal('noir');
  // private productService = inject(ProductService);
  // ngOnInit() {
  //   const dataStream$ = this.productService.getProducts();
  //   dataStream$.subscribe({
  //     //success
  //     next: (data) => {
  //       console.log(data);
  //     },
  //     //failure
  //     error: (err) => {
  //       console.error(err);
  //     },
  //   });
  // }
}
