import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; // 🔥

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // 🔥 Añadido RouterLink
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  alias: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private router: Router) {}

  onRegister() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (!/^[a-zA-Z0-9_]{3,30}$/.test(this.alias)) {
      this.errorMsg = 'El alias debe tener entre 3 y 30 letras o números.';
      this.successMsg = '';
      return;
    }

    if (this.password.length < 5 || this.password.length > 30) {
      this.errorMsg = 'El hechizo debe tener entre 5 y 30 caracteres.';
      this.successMsg = '';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Los hechizos no coinciden.';
      this.successMsg = '';
      return;
    }

    if (users.some((u: any) => u.alias === this.alias)) {
      this.errorMsg = 'Ese alias mágico ya existe.';
      this.successMsg = '';
      return;
    }

    users.push({ alias: this.alias, password: this.password, role: 'user' });
    localStorage.setItem('users', JSON.stringify(users));

    this.errorMsg = '';
    this.successMsg = '¡Tu identidad mágica ha sido creada!';

    setTimeout(() => this.router.navigate(['/login']), 1500);
  }
}
