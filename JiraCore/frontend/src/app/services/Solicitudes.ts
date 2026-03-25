import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class SolicitudesService {

private http = inject(HttpClient);

  // URL genérica para solicitudes. Ajusta el puerto si es necesario
private apiUrl = 'https://localhost:7015/api/solicitudes'; 

constructor() { }

/**
   * Este método acepta FormData.
   * Recuerda que en tus componentes (Campaña, Ajustes, etc.) 
   * DEBES construir el FormData antes de llamar a este método.
   */
crearSolicitud(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
}
}