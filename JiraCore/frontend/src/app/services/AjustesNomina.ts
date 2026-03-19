import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjustesService {
  // Asegúrate de poner la URL correcta de tu API (usualmente https://localhost:5062/...)
  private apiUrl = 'https://localhost:7263/api/dashboard';

  constructor(private http: HttpClient) { }

  getStats() {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

  getActivity() {
    return this.http.get<any[]>(`${this.apiUrl}/activity`);
  }
}
