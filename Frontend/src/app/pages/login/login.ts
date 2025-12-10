// Frontend/src/app/pages/login/login.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  mail: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    this.errorMsg = '';

    if (!this.mail || !this.password) {
      this.errorMsg = 'Debes ingresar correo y contraseña.';
      return;
    }

    this.authService.login(this.mail, this.password).subscribe({
      next: user => {
        console.log('Usuario logueado:', user);
        // AuthService ya guardó currentUser en localStorage
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error('Error en login:', err);
        this.errorMsg = 'Email o contraseña incorrectos. Revisa tus datos.';
      }
    });
  }
}