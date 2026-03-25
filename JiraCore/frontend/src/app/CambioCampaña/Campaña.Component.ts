import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../services/Solicitudes'; // Asegúrate que este archivo exista

@Component({
  selector: 'app-campaña',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Campaña.Component.html',
  styleUrls: ['./Campaña.Component.css']
})
export class CampañaComponent {

  // Objeto para capturar los datos
  cambio: any = {
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    ultimoDiaLaborado: '',
    correoElectronicoSupervisor: '',
    nuevaUbicacion: '',
    observaciones: '',
    documento: null
  };

  // Inyectar Router y Servicio
  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  // Método para capturar el archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.cambio.documento = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  guardarCambio() {
    // 1. Validación básica
    if (!this.cambio.documento) {
      alert('Por favor adjunte el documento soporte.');
      return;
    }

    // 2. Preparamos el FormData (Esto es lo que pide el servicio nuevo)
    const formData = new FormData();

    // Agregamos un identificador del tipo de solicitud para el Backend
    formData.append('tipoSolicitud', 'Cambio de Campaña');

    // Recorremos el objeto 'cambio' y agregamos cada campo al FormData
    Object.keys(this.cambio).forEach(key => {
      // No agregamos 'documento' aquí porque lo hacemos explícitamente abajo
      // para asegurar que el archivo se adjunte correctamente
      if (key !== 'documento' && this.cambio[key]) {
        formData.append(key, this.cambio[key]);
      }
    });

    // 3. Agregamos el archivo explícitamente
    if (this.cambio.documento) {
      formData.append('documento', this.cambio.documento);
    }

    // 4. Enviamos al servicio (Solo 1 argumento: el FormData)
    this.solicitudesService.crearSolicitud(formData).subscribe({
      next: (res: any) => {
        console.log('Éxito:', res);
        alert('Solicitud enviada a Administración/RRHH');
        this.limpiarFormulario();
        this.router.navigate(['/nomina']);
      },
      // Agregamos :any para evitar el error TS7006
      error: (err: any) => {
        console.error('Error al enviar:', err);
        alert('Error de conexión al servidor.');
      }
    });
  }

  cancelar() {
    if(confirm('¿Estás seguro de cancelar?')) {
      this.limpiarFormulario();
      this.router.navigate(['/nomina']);
    }
  }

  // Método auxiliar para limpiar
  private limpiarFormulario() {
    this.cambio = {
      cedula: '',
      nombre: '',
      cargo: '',
      campanaArea: '',
      ultimoDiaLaborado: '',
      correoElectronicoSupervisor: '',
      nuevaUbicacion: '',
      observaciones: '',
      documento: null
    };

    // Limpiar el input file visualmente
    const fileInput = document.getElementById('documento') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}