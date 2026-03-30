import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReporteEmbarazoService {

  // Inyección moderna
  private http = inject(HttpClient);

  // URL de tu API .NET
  // Asegúrate de que el puerto (7264) sea el correcto (mira en Properties/launchSettings.json del backend)
  private apiUrl = 'http://localhost:7264/api/reporteembarazo'; 
  private catalogoUrl = 'http://localhost:7264/api/catalogo';

  constructor() { }

  /**
   * Envía el reporte completo (FormData) al backend
   */
  crearReporte(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  /**
   * Obtiene la lista de cargos desde la colección catalogo_cargos
   */
  obtenerCargos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.catalogoUrl}/cargos`);
  }

  /**
   * Obtiene la lista de áreas desde la colección catalogo_areas
   */
  obtenerAreas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.catalogoUrl}/areas`);
  }
}