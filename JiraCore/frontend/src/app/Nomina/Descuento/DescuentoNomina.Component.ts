import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../../services/Solicitudes';

@Component({
  selector: 'app-Descuento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './DescuentoNomina.Component.html',
  styleUrls: ['./DescuentoNomina.Component.css']
})
export class DescuentoNominaComponent {

  // Objeto para guardar los datos
  // Cambié 'archivo' por 'documento' para coincidir con el Backend
  descuento: any = {
    generador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    valorDescuento: 0,
    descripcion: '',
    documento: null 
  };

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  // Método para capturar el archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.descuento.documento = file; // Guardamos en 'documento'
      console.log('Archivo seleccionado:', file.name);
    }
  }

  guardarDescuento() {
    // Validación simple
    if (!this.descuento.documento) {
      alert('Por favor adjunte el documento.');
      return;
    }

    // 1. Construimos el FormData
    const formData = new FormData();

    // Identificador del tipo de solicitud
    formData.append('tipoSolicitud', 'Descuento de Nómina');

    // Recorremos el objeto y agregamos los campos
    Object.keys(this.descuento).forEach(key => {
      if (key !== 'documento' && this.descuento[key] !== null && this.descuento[key] !== undefined) {
        formData.append(key, this.descuento[key]);
      }
    });

    // Agregamos el archivo explícitamente
    if (this.descuento.documento) {
      formData.append('documento', this.descuento.documento);
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
    this.descuento = {
      generador: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campanaArea: '',
      valorDescuento: 0,
      descripcion: '',
      documento: null
    };

    const fileInput = document.getElementById('documento') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}