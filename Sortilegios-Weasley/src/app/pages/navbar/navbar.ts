import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CauldronService } from '../../services/cualdron.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  currentUser: any = null;
  itemCount: number = 0;

  constructor(private router: Router, private cauldronService: CauldronService) {}

  ngOnInit() {
    this.loadCurrentUser();

    this.cauldronService.items$.subscribe((items) => {
      this.itemCount = items.length;
    });

    window.addEventListener('storage', () => this.loadCurrentUser());
    setInterval(() => this.loadCurrentUser(), 1000);
  }

  loadCurrentUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
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

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.classList.toggle('menu-open', this.menuOpen);
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.classList.remove('menu-open');
  }
}
