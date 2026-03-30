import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class SolicitudesService {

  // IMPORTANTE: Asegúrate de que la URL sea la correcta
private apiUrl = 'http://localhost:7264/api/solicitudes'; 

constructor(private http: HttpClient) { }

  // Función para crear una nueva solicitud
    crearSolicitud(datosSolicitud: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, datosSolicitud);
    }
}