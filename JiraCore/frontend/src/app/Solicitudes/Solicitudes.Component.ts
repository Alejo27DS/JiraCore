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
    if (!this.solicitud.archivo) {
      alert('Por favor adjunte el documento.');
      return;
    }

    const formData = new FormData();
    formData.append('tipoSolicitud', 'Ingreso');

    Object.keys(this.solicitud).forEach(key => {
      if (key !== 'archivo' && this.solicitud[key]) {
        formData.append(key, this.solicitud[key]);
      }
    });

    if (this.solicitud.archivo) {
      formData.append('documento', this.solicitud.archivo);
    }

    this.solicitudesService.crearSolicitud(formData).subscribe({
      next: (res: any) => {
        alert('Solicitud enviada');
        this.limpiarFormulario();
        this.router.navigate(['/solicitudes']);
      },
      error: (err: any) => { console.error(err); alert('Error'); }
    });
  }

  private limpiarFormulario() {
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

    const fileInput = document.getElementById('documento') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  cancelar() {
    if(confirm('¿Estás seguro de cancelar? Se perderán los datos.')) {
      this.limpiarFormulario();
      this.router.navigate(['/dashboard']);
    }
  }
}