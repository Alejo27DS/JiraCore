import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../../services/Solicitudes';

@Component({
  selector: 'app-Ajustes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './AjustesNomina.Component.html',
  styleUrl: "./AjustesNomina.Component.css",
})
export class AjustesNominaComponent {

  // Objeto con los datos + la propiedad para el archivo
  ajuste: any = {
    generador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    descripcion: '',
    documento: null // Agregado para guardar el archivo seleccionado
  };

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  // Método para capturar el archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.ajuste.documento = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  guardarAjuste() {
    // Validación simple
    if (!this.ajuste.documento) {
      alert('Por favor adjunte el documento.');
      return;
    }

    // 1. Construimos el FormData
    const formData = new FormData();

    // Identificador del tipo de solicitud
    formData.append('tipoSolicitud', 'Ajustes de Nómina');

    // Recorremos el objeto y agregamos los campos
    Object.keys(this.ajuste).forEach(key => {
      if (key !== 'documento' && this.ajuste[key]) {
        formData.append(key, this.ajuste[key]);
      }
    });

    // Agregamos el archivo explícitamente
    if (this.ajuste.documento) {
      formData.append('documento', this.ajuste.documento);
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

  // Método para limpiar formulario y resetear el input file
  private limpiarFormulario() {
    this.ajuste = {
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