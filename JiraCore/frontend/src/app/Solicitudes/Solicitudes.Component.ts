import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../services/Solicitudes';


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

  // Objeto para guardar los datos (usamos : any para evitar errores de tipos)
  solicitud: any = {
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
    archivo: null // Aquí guardamos el archivo
  };

  constructor(private router: Router) { }

  // Método para capturar el archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.solicitud.archivo = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  guardarSolicitud() {
    console.log('Solicitud guardada:', this.solicitud);
    console.log('Archivo adjunto:', this.solicitud.archivo ? this.solicitud.archivo.name : 'No adjuntado');

    alert(`Solicitud guardada para Cédula: ${this.solicitud.cedula}.`);

    // (Opcional) Lógica para guardar en BD
    // this.solicitudService.guardar(this.solicitud).subscribe(...);

    // (Opcional) Volver al menú
    // this.router.navigate(['/nomina']);
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
    this.router.navigate(['/nomina']);
  }
}
