import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../../services/Solicitudes';

@Component({
  selector: 'app-Auxilio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './AuxilioRodamiento.Component.html',
  styleUrls: ['./AuxilioRodamiento.Component.css'],
})
export class AuxilioRodamientoComponent {

  // Objeto para guardar los datos
  auxilio = {
    generador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    valorAuxilio: 0, // Inicializado en 0
    descripcion: ''
  };

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  guardarAuxilio() {
    // Usamos el servicio genérico
    this.solicitudesService.crearSolicitud('Auxio de Rodamiento', this.auxilio).subscribe({
      next: (res: any) => {
        console.error("Respuesta del servidor:", res)
        alert('Solicitud enviada a Administración/RRHH');
        this.router.navigate(['/nomina']);
      },
      error: (err) => {
        console.error('Error al enviar', err);
        alert('Error de conexión');
      }
    });
  }

  cancelar() {
    this.auxilio = {
      generador: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campanaArea: '',
      valorAuxilio: 0,
      descripcion: ''
    };
    this.router.navigate(['/nomina']);
  }
}
