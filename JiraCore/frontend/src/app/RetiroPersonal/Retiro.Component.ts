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
    if (!this.retiro.archivo) {
      alert('Por favor adjunte el documento.');
      return;
    }

    const formData = new FormData();
    formData.append('tipoSolicitud', 'Retiro');

    Object.keys(this.retiro).forEach(key => {
      if (key !== 'archivo' && this.retiro[key]) {
        formData.append(key, this.retiro[key]);
      }
    });

    if (this.retiro.archivo) {
      formData.append('documento', this.retiro.archivo);
    }

    this.solicitudesService.crearSolicitud(formData).subscribe({
      next: (res: any) => {
        alert('Solicitud enviada');
        this.limpiarFormulario();
        this.router.navigate(['/retiro']);
      },
      error: (err: any) => { console.error(err); alert('Error'); }
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

    private limpiarFormulario() {
    this.retiro = {
      cedula: '',
      resumen: '',
      cargo: '',
      campanaArea: '',
      jefeInmediato: '',
      fechaRetiro: '',
      motivoRetiro: '',
      descripcion: '',
      archivo: null 
      // NOTA: Si en tu objeto usas 'documento' en lugar de 'archivo', cámbialo aquí también.
    };

    // Limpiar el input file visualmente
    const fileInput = document.getElementById('documento') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}
