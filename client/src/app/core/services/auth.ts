import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  email: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  private router = inject(Router);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth';

  currentUser = signal<User | null>(null);

  login(email: string, isSeller: boolean) {
    const user = {
      name: email.split('@')[0],
      email: email,
      role: isSeller ? 'seller' : 'customer',
    };

    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));

    if (isSeller) {
      this.router.navigate(['/seller']);
    } else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
