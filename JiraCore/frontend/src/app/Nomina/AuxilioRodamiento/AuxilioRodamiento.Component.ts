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

  // Objeto para guardar los datos + archivo
  auxilio: any = {
    generador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    valorAuxilio: 0, 
    descripcion: '',
    documento: null // Agregado para el archivo
  };

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  // Método para capturar el archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.auxilio.documento = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  guardarAuxilio() {
    // Validación simple
    if (!this.auxilio.documento) {
      alert('Por favor adjunte el documento.');
      return;
    }

    // 1. Construimos el FormData
    const formData = new FormData();

    // Identificador del tipo de solicitud (Corregido "Auxio" a "Auxilio")
    formData.append('tipoSolicitud', 'Auxilio de Rodamiento');

    // Recorremos el objeto y agregamos los campos
    Object.keys(this.auxilio).forEach(key => {
      if (key !== 'documento' && this.auxilio[key] !== null && this.auxilio[key] !== undefined) {
        formData.append(key, this.auxilio[key]);
      }
    });

    // Agregamos el archivo explícitamente
    if (this.auxilio.documento) {
      formData.append('documento', this.auxilio.documento);
    }

    // 2. Enviamos al servicio (1 solo argumento)
    this.solicitudesService.crearSolicitud(formData).subscribe({
      next: (res: any) => {
        console.log("Respuesta del servidor:", res);
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
    this.auxilio = {
      generador: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campanaArea: '',
      valorAuxilio: 0,
      descripcion: '',
      documento: null
    };

    const fileInput = document.getElementById('documento') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}