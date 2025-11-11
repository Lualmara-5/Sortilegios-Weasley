import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  currentUser: any = null;
  itemCount: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCurrentUser();

    // Verifica si cambia el localStorage (por login o logout)
    window.addEventListener('storage', () => this.loadCurrentUser());

    // También verifica cada 1 segundo en caso de cambios locales
    setInterval(() => this.loadCurrentUser(), 1000);
  }

  loadCurrentUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Soporte por si la clave es "username", "alias", "name" u otra
        this.currentUser = {
          alias: parsedUser.alias || parsedUser.username || parsedUser.name || 'Usuario',
          role: parsedUser.role || 'user',
        };
      } catch {
        this.currentUser = null;
      }
    } else {
      this.currentUser = null;
    }
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.router.navigate(['/home']);
  }
}
