import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../../services/Solicitudes';

@Component({
  selector: 'app-Cesantias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './Cesantias.Component.html',
  styleUrls: ['./Cesantias.Component.css']
})
export class CesantiasComponent {

  // Objeto para guardar los datos + archivo
  cesantia: any = {
    generador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    descripcion: '',
    documento: null // Agregado para el archivo
  };

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  // Método para capturar el archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.cesantia.documento = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  guardarCesantias() {
    // Validación simple
    if (!this.cesantia.documento) {
      alert('Por favor adjunte el documento.');
      return;
    }

    // 1. Construimos el FormData
    const formData = new FormData();

    // Identificador del tipo de solicitud
    formData.append('tipoSolicitud', 'Retiro de Cesantías');

    // Recorremos el objeto y agregamos los campos
    Object.keys(this.cesantia).forEach(key => {
      if (key !== 'documento' && this.cesantia[key] !== null && this.cesantia[key] !== undefined) {
        formData.append(key, this.cesantia[key]);
      }
    });

    // Agregamos el archivo explícitamente
    if (this.cesantia.documento) {
      formData.append('documento', this.cesantia.documento);
    }

    // 2. Enviamos al servicio (1 solo argumento)
    this.solicitudesService.crearSolicitud(formData).subscribe({
      next: (res: any) => {
        console.log("Respuesta del servidor:", res); // Corregido de console.error
        alert('Solicitud enviada a Administración/RRHH');
        this.limpiarFormulario();
        this.router.navigate(['/nomina']);
      },
      // Agregamos :any al error
      error: (err: any) => {
        console.error('Error al enviar', err);
        alert('Error de conexión');
      }
    });
  }

  cancelar() {
    if(confirm('¿Estás seguro de cancelar?')) {
      this.limpiarFormulario();
      this.router.navigate(['/nomina']);
    }
  }

  // Método para limpiar
  private limpiarFormulario() {
    this.cesantia = {
      generador: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campanaArea: '',
      descripcion: '',
      documento: null
    };

    const fileInput = document.getElementById('documento') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}