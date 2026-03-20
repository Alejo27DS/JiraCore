import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasSSTService {

  constructor() { }

  // Datos simulados para que la tabla no salga vacía
  getCitas(): Observable<any[]> {
    return of([
      {
        nombrePaciente: 'Juan Pérez',
        email: 'juan.perez@ejemplo.com',
        fecha: '2023-10-25T10:30',
        motivo: 'Chequeo general',
        estado: 'Atendida'
      },
      {
        nombrePaciente: 'Maria Gomez',
        email: 'maria.gomez@ejemplo.com',
        fecha: '2023-10-26T14:00',
        motivo: 'Dolor de cabeza',
        estado: 'Programada'
      },
      {
        nombrePaciente: 'Carlos Ruiz',
        email: 'carlos.ruiz@ejemplo.com',
        fecha: '2023-10-27T09:00',
        motivo: 'Revisión laborales',
        estado: 'Pendiente'
      }
    ]);
  }
}
