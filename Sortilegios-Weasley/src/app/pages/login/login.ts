import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  alias: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.length === 0) {
      const admins = [
        { alias: 'GeorgeWeasley01', password: 'lordkakadura123', role: 'admin' },
        { alias: 'FredWeasley02', password: 'elministerioapesta123', role: 'admin' },
      ];
      localStorage.setItem('users', JSON.stringify(admins));
    }
  }

  onLogin() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.alias === this.alias && u.password === this.password
    );

    if (!user) {
      this.errorMsg = 'Alias o hechizo incorrecto. ¡Revisa tus encantamientos!';
      return;
    }

    const currentUser = { username: user.alias, role: user.role };
    this.userService.setUser(currentUser);
    this.router.navigate(['/home']);
  }
}
