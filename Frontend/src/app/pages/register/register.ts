// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router'; // 🔥

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink], // 🔥 Añadido RouterLink
//   templateUrl: './register.html',
//   styleUrls: ['./register.css'],
// })
// export class Register {
//   alias: string = '';
//   password: string = '';
//   confirmPassword: string = '';
//   errorMsg: string = '';
//   successMsg: string = '';

//   constructor(private router: Router) {}

//   onRegister() {
//     const users = JSON.parse(localStorage.getItem('users') || '[]');

//     if (!/^[a-zA-Z0-9_]{3,30}$/.test(this.alias)) {
//       this.errorMsg = 'El alias debe tener entre 3 y 30 letras o números.';
//       this.successMsg = '';
//       return;
//     }

//     if (this.password.length < 5 || this.password.length > 30) {
//       this.errorMsg = 'El hechizo debe tener entre 5 y 30 caracteres.';
//       this.successMsg = '';
//       return;
//     }

//     if (this.password !== this.confirmPassword) {
//       this.errorMsg = 'Los hechizos no coinciden.';
//       this.successMsg = '';
//       return;
//     }

//     if (users.some((u: any) => u.alias === this.alias)) {
//       this.errorMsg = 'Ese alias mágico ya existe.';
//       this.successMsg = '';
//       return;
//     }

//     users.push({ alias: this.alias, password: this.password, role: 'user' });
//     localStorage.setItem('users', JSON.stringify(users));

//     this.errorMsg = '';
//     this.successMsg = '¡Tu identidad mágica ha sido creada!';

//     setTimeout(() => this.router.navigate(['/login']), 1500);
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  nickname: string = '';
  mail: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onRegister() {
    // Validaciones locales
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(this.nickname)) {
      this.errorMsg = 'El alias debe tener entre 3 y 30 letras o números.';
      this.successMsg = '';
      return;
    }

    if (this.password.length < 5 || this.password.length > 30) {
      this.errorMsg = 'La contraseña debe tener entre 5 y 30 caracteres.';
      this.successMsg = '';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      this.successMsg = '';
      return;
    }

    // Llamada al backend
    this.authService.register(this.nickname, this.mail, this.password).subscribe({
      next: res => {
        this.errorMsg = '';
        this.successMsg = '¡Usuario registrado correctamente!';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: err => {
        console.error(err);
        this.errorMsg = 'Error registrando usuario. Quizás el email ya existe.';
        this.successMsg = '';
      }
    });
  }
}
