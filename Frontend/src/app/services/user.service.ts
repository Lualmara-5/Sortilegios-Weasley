import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  
  private http = inject(HttpClient);

  private API_URL = 'http://localhost:3000/api/usuarios';

  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  user$ = this.userSubject.asObservable();

  constructor() {}

  // ------------------------------
  // Obtener usuario del localStorage
  // ------------------------------
  private getUserFromStorage() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getUser() {
    return this.getUserFromStorage();
  }

  // ------------------------------
  // Guardar usuario en localStorage
  // ------------------------------
  setUser(user: any) {
    console.log("USER QUE ESTOY GUARDANDO:", user);  // <-- DEBUG
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userSubject.next(user);
  }

  clearUser() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }

  // ------------------------------
  // 🔥 NUEVO: actualizar usuario en el backend
  // ------------------------------
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data).pipe(
      tap(response => {

        // Si el backend responde OK → actualizamos localStorage también
        const updatedUser = {
          ...this.getUser(),
          ...data   // alias, mail, dirección
        };

        this.setUser(updatedUser);
      })
    );
  }
}
