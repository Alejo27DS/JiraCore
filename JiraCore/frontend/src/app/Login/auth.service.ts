import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // IMPORTANTE: Cambia esta URL por la de tu API real de Login en ASP.NET
  // Asegúrate de que tienes un controlador 'AuthController' con la ruta 'api/auth'
  private apiUrl = 'https://localhost:7264/api/auth/login';

  // BehaviorSubject para mantener el estado
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkSession(); // Llamamos esto al iniciar
  }

  // --- ESTE MÉTODO FALTABA EN TU SNIPPET ---
  private checkSession() {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('userSession');
      if (storedUser) {
        // Recuperamos la sesión guardada
        this.userSubject.next(JSON.parse(storedUser));
      }
    }
  }
  // ---------------------------------------

  // Método actualizado para recibir email/password y llamar a la API
  login(email: string, password: string): Observable<any> {
    // Hacemos el POST a tu backend
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      // 'tap' nos permite ejecutar código (guardar datos) sin afectar la respuesta
      tap((response) => {
        console.log("DATOS RECIBIDOS DE LA BD:", response);

        // Guardamos la respuesta completa (token, usuario, roles, etc.)
        this.userSubject.next(response);

        if (typeof window !== 'undefined') {
          localStorage.setItem('userSession', JSON.stringify(response));
          localStorage.setItem('isLoggedIn', 'true');
        }
      })
    );
  }

  logout() {
    this.userSubject.next(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userSession');
      localStorage.removeItem('isLoggedIn');
    }
  }

  get isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  get isAdmin(): boolean {
    const user = this.userSubject.value;
    if (!user) return false;

    return user.rol?.toUpperCase() === 'ADMIN';
  }

  get isRrhh(): boolean {
    const user = this.userSubject.value;
    if (!user) return false;
    return user.rol?.toUpperCase() === 'RRHH';
  }

  get isTecnologia(): boolean {
    const user = this.userSubject.value;
    if (!user) return false;
    // IMPORTANTE: Asegúrate que en tu BD el rol sea 'Tecnología' (con mayúscula)
    return user.rol?.toUpperCase() === 'TECNOLOGIA';
  }
}
