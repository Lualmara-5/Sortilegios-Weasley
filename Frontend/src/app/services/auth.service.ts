// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// export interface User {
//   username: string;
//   password: string;
//   role: 'admin' | 'user';
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   currentUser$ = this.currentUserSubject.asObservable();

//   private USERS_KEY = 'usuarios_sortilegios';
//   private CURRENT_KEY = 'usuario_actual';

//   constructor() {
//     const savedUser = localStorage.getItem(this.CURRENT_KEY);
//     if (savedUser) this.currentUserSubject.next(JSON.parse(savedUser));
//   }

//   register(username: string, password: string, role: 'admin' | 'user' = 'user'): boolean {
//     const users = this.getUsers();

//     if (users.find(u => u.username === username)) return false;

//     users.push({ username, password, role });
//     localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
//     return true;
//   }

//   login(username: string, password: string): boolean {
//     const users = this.getUsers();
//     const user = users.find(u => u.username === username && u.password === password);
//     if (!user) return false;

//     this.currentUserSubject.next(user);
//     localStorage.setItem(this.CURRENT_KEY, JSON.stringify(user));
//     return true;
//   }

//   logout(): void {
//     localStorage.removeItem(this.CURRENT_KEY);
//     this.currentUserSubject.next(null);
//   }

//   private getUsers(): User[] {
//     const data = localStorage.getItem(this.USERS_KEY);
//     return data ? JSON.parse(data) : [];
//   }

//   get currentUser(): User | null {
//     return this.currentUserSubject.value;
//   }

//   isAdmin(): boolean {
//     return this.currentUser?.role === 'admin';
//   }

//   isLoggedIn(): boolean {
//     return !!this.currentUser;
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface User {
  id_usuario?: number;
  nickname: string;
  mail: string;
  token?: string;
  role?: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/usuarios'; // Ajusta según tu backend
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('usuario_actual');
    if (savedUser) this.currentUserSubject.next(JSON.parse(savedUser));
  }

  // Registro
  register(nickname: string, mail: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/`, { nickname, mail, password });
  }

  // Login
  login(mail: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/login`, { mail, password })
      .pipe(
        tap(user => {
          if (user.token) {
            localStorage.setItem('usuario_actual', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
        })
      );
  }

  // Logout
  logout(): void {
    localStorage.removeItem('usuario_actual');
    this.currentUserSubject.next(null);
  }

  // Obtener usuario actual
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Verificar si está logueado
  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  // Opcional: obtener headers con token para rutas protegidas
  getAuthHeaders(): HttpHeaders {
    const token = this.currentUser?.token;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }
}
