import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private USERS_KEY = 'usuarios_sortilegios';
  private CURRENT_KEY = 'usuario_actual';

  constructor() {
    const savedUser = localStorage.getItem(this.CURRENT_KEY);
    if (savedUser) this.currentUserSubject.next(JSON.parse(savedUser));
  }

  register(username: string, password: string, role: 'admin' | 'user' = 'user'): boolean {
    const users = this.getUsers();

    if (users.find(u => u.username === username)) return false;

    users.push({ username, password, role });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return false;

    this.currentUserSubject.next(user);
    localStorage.setItem(this.CURRENT_KEY, JSON.stringify(user));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_KEY);
    this.currentUserSubject.next(null);
  }

  private getUsers(): User[] {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}
