import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})  
export class SolicitudesService {
  private apiUrl = 'http://localhost:7264/api/solicitudes'; // Tu puerto de Backend

  constructor(private http: HttpClient) { }

  // Método genérico para enviar cualquier solicitud
  crearSolicitud(tipo: string, datos: any, archivo?: File) {
    const formData = new FormData();

    formData.append('tipo', tipo);
    formData.append('datos', JSON.stringify(datos)); // Convertimos el objeto a texto

    if (archivo) {
      formData.append('archivo', archivo);
    }

    return this.http.post(`${this.apiUrl}/crear`, formData);  
  }

  getPendientes() {
    return this.http.get(`${this.apiUrl}/pendientes`);
  }
}
