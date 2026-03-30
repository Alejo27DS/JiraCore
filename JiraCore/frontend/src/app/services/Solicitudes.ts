import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private apiUrl = 'https://localhost:7264/api/solicitudes'; // Tu puerto de Backend

  // --- AGREGADO: Definimos la URL específica para Cargos ---
  // Asegúrate que en tu backend (ASP.NET) el controlador se llame "CargosController"
  private apiUrlCargos = 'https://localhost:7264/api/Cargos';

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

  // Método para traer las aprobadas (para RRHH)
  getAprobadas() {
    return this.http.get(`${this.apiUrl}/aprobadas`);
  }

  // Método para cambiar estado (para que el botón de Aprobar funcione)
  actualizarEstado(id: number, estado: string) {
    return this.http.post(`${this.apiUrl}/actualizar-estado`, { id, estado });
  }

  // --- AGREGA ESTE MÉTODO FALTANTE ---
  eliminarSolicitud(id: string) {
    // Enviamos el ID como string porque MongoDB lo maneja así
    return this.http.post(`${this.apiUrl}/eliminar`, { id: id, estado: 'Deleted' });
  }
  // En Solicitudes.service.ts

  // Método para la Bandeja de Talento Humano
  getBandejaTalentoHumano(q: string, estado: string, tipo: string) {
    // Construimos los parámetros de consulta (Query Params)
    let params = new HttpParams();
    if (q) params = params.set('q', q);
    if (estado) params = params.set('estado', estado);
    if (tipo) params = params.set('tipo', tipo);

    return this.http.get(`${this.apiUrl}/talento-humano`, { params });
  }

  // --- MÉTODO CORREGIDO ---
  obtenerCargos(): Observable<string[]> {
    // Ahora esta variable existe porque la definimos arriba
    return this.http.get<string[]>(this.apiUrlCargos);
  }
  // Método para la Bandeja de Tecnología
  getBandejaTecnologia() {
    return this.http.get(`${this.apiUrl}/tecnologia`);
  }

  // Método para guardar comentarios
  agregarComentario(id: string, autor: string, mensaje: string) {
    return this.http.post(`${this.apiUrl}/agregar-comentario`, { id, autor, mensaje });
  }
}
