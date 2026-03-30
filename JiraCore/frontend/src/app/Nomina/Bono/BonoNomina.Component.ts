import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../../services/Solicitudes';

@Component({
  selector: 'app-Bono',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './BonoNomina.Component.html',
  styleUrl: "./BonoNomina.Component.css",
})
export class BonoNominaComponent {

  // CAMBIO: Volví a llamarlo 'solicitud' para que coincida con tu HTML
  solicitud: any = {
    nombreGenerador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    valorBono: 0,
    descripcion: '',
    documento: null
  };

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.solicitud.documento = file; // CAMBIO: this.solicitud
      console.log('Archivo seleccionado:', file.name);
    }
  }

  guardarBono() {
    if (!this.solicitud.documento) { // CAMBIO: this.solicitud
      alert('Por favor adjunte el documento.');
      return;
    }

    const formData = new FormData();
    formData.append('tipoSolicitud', 'Bono de Mera Liberalidad');

    Object.keys(this.solicitud).forEach(key => { // CAMBIO: this.solicitud
      if (key !== 'documento' && this.solicitud[key] !== null && this.solicitud[key] !== undefined) {
        formData.append(key, this.solicitud[key]);
      }
    });

    if (this.solicitud.documento) { // CAMBIO: this.solicitud
      formData.append('documento', this.solicitud.documento);
    }

    this.solicitudesService.crearSolicitud(formData).subscribe({
      next: (res: any) => {
        console.log("Respuesta del servidor:", res);
        alert('Solicitud enviada a Administración/RRHH');
        this.limpiarFormulario();
        this.router.navigate(['/nomina']);
      },
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

  private limpiarFormulario() {
    this.solicitud = { // CAMBIO: this.solicitud
      nombreGenerador: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campanaArea: '',
      valorBono: 0,
      descripcion: '',
      documento: null
    };

    const fileInput = document.getElementById('documento') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}