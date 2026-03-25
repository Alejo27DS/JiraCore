import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  // IMPORTANTE: Revisa el puerto (5000, 7000, etc.) en tu terminal de Backend
    private apiUrl = 'http://localhost:7264/api/auth/login'; 

    constructor(private http: HttpClient) { }

  // Esta función toma el email y password y los envía al Backend
    login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.apiUrl, body);
    }
}