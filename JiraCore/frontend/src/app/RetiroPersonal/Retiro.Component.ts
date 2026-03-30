import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../services/Solicitudes'; // <--- 1. Importar el servicio

@Component({
  selector: 'app-Retiro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './Retiro.Component.html',
  styleUrls: ['./Retiro.Component.css']
})
export class RetiroComponent {

  retiro: any = {
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

  // <--- 2. Inyectar el servicio en el constructor
  constructor(
    private router: Router,
    private solicitudesService: SolicitudesService
  ) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.retiro.archivo = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  guardarRetiro() {
    // <--- 3. Usar el servicio real enviando 'Retiro' como tipo
    this.solicitudesService.crearSolicitud('Retiro', this.retiro, this.retiro.archivo).subscribe({
      next: (res: any) => {
        console.log("Respuesta del servidor:", res);
        alert('Solicitud de Retiro enviada a Talento Humano');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error al enviar', err);
        alert('Error de conexión');
      }
    });
  }

  cancelar() {
    this.retiro = {
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
