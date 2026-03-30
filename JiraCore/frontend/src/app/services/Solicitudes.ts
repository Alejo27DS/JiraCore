import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private http = inject(HttpClient);
  
  // Ajusta al puerto correcto
  private apiUrl = 'https://localhost:7015/api/solicitudes'; 
  private catalogoUrl = 'https://localhost:7015/api/catalogo';

  constructor() { }

  // --- MÉTODOS GENÉRICOS PARA FORMULARIOS (FormData) ---

  crearSolicitud(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  // --- MÉTODOS PARA PANELES (RRHH y TIC) ---

  getBandejaTalentoHumano(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bandeja/talento-humano`);
  }

  getBandejaTecnologia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bandeja/tecnologia`);
  }

  actualizarEstado(id: string, nuevoEstado: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/estado`, { estado: nuevoEstado });
  }

  eliminarSolicitud(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  agregarComentario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${data.id}/comentarios`, data);
  }

  // --- MÉTODOS PARA CATÁLOGOS (Para Embarazo) ---

  obtenerCargos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.catalogoUrl}/cargos`);
  }
  
  obtenerAreas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.catalogoUrl}/areas`);
  }

}