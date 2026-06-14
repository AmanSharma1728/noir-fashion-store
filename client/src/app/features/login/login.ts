import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private store = inject(Store);

  email = '';
  password = '';
  error = '';
  isSeller = false;

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }

    this.store.dispatch(AuthActions.login({ email: this.email, isSeller: this.isSeller }));
  }
}
