// Frontend/src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface User {
  id_usuario: number;
  nickname: string;
  mail: string;
  role: 'admin' | 'user' | string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/usuarios';
  private STORAGE_KEY = 'currentUser';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem(this.STORAGE_KEY);
    if (savedUser) {
      try {
        this.currentUserSubject.next(JSON.parse(savedUser) as User);
      } catch {
        this.currentUserSubject.next(null);
      }
    }
  }

  // Registro
  register(nickname: string, mail: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.API_URL}`, { nickname, mail, password });
  }

  // Login
  login(mail: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/login`, { mail, password }).pipe(
      tap(user => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  // Usuario actual
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  // Headers con token para llamadas protegidas (si las usan)
  getAuthHeaders(): HttpHeaders {
    const token = this.currentUser?.token;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }
}