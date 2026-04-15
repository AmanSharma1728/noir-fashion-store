import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(Auth);

  router = inject(Router);

  email = '';
  password = '';
  error = '';
  isSeller = false;

  onSubmit() {
    //console.log('login button was clicked');

    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }

    this.authService.login(this.email, this.isSeller);
  }
}
