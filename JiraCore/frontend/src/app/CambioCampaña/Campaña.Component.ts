import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../services/Solicitudes'; // <--- Ajusta esta ruta según tu estructura de carpetas

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
    console.log('Datos a enviar:', this.cambio);

    // Usamos el servicio genérico para enviar los datos al Backend
    this.solicitudesService.crearSolicitud('Cambio de Campaña', this.cambio, this.cambio.documento).subscribe({
      next: (res: any) => {
        console.log('Éxito:', res);
        alert('Solicitud enviada a Administración/RRHH');
        this.router.navigate(['/nomina']);
      },
      error: (err) => {
        console.error('Error al enviar:', err);
        alert('Error de conexión al servidor.');
      }
    });
  }

  cancelar() {
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
    this.router.navigate(['/dashboard']);
  }
}
