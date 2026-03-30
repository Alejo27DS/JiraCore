import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../services/Solicitudes'; // <--- 1. Importar el servicio

@Component({
  selector: 'app-Solicitudes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './Solicitudes.Component.html',
  styleUrl: './Solicitudes.Component.css',
})
export class SolicitudesComponent {

  solicitud: any = {
    cedula: '',
    resumen: '',
    fechaInforme: '',
    cargo: '',
    correoCorporativo: '',
    campanaArea: '',
    jefeInmediato: '',
    fechaRetiro: '', // Si este campo no aplica a ingreso, déjalo o quítalo del HTML
    motivoRetiro: '',
    descripcion: '',
    archivo: null
  };

  // <--- 2. Inyectar el servicio en el constructor
  constructor(
    private router: Router,
    private solicitudesService: SolicitudesService
  ) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.solicitud.archivo = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  guardarSolicitud() {
    // <--- 3. Usar el servicio real para enviar al Backend
    // Pasamos el TIPO como 'Ingreso' para que el Backend lo apruebe automáticamente
    this.solicitudesService.crearSolicitud('Ingreso', this.solicitud, this.solicitud.archivo).subscribe({
      next: (res: any) => {
        console.log("Respuesta del servidor:", res);
        alert('Solicitud de Ingreso enviada a Talento Humano');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error al enviar', err);
        alert('Error de conexión');
      }
    });
  }

  cancelar() {
    this.solicitud = {
      cedula: '',
      resumen: '',
      fechaInforme: '',
      cargo: '',
      correoCorporativo: '',
      campanaArea: '',
      jefeInmediato: '',
      fechaRetiro: '',
      motivoRetiro: '',
      descripcion: '',
      archivo: null
    };
    this.router.navigate(['/dashboard']);
  }
}
