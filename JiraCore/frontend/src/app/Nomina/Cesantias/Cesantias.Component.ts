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

  // Objeto para guardar los datos (usamos : any para evitar errores de tipos)
  cesantia: any = {
    generador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    descripcion: ''
  };

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  guardarCesantias() {
    // Usamos el servicio genérico
    this.solicitudesService.crearSolicitud('Retiro de Cesantias', this.cesantia).subscribe({
      next: (res: any) => {
        console.error("Respuesta del servidor:", res)
        alert('Solicitud enviada a Administración/RRHH');
        this.router.navigate(['/nomina']);
      },
      error: (err) => {
        console.error('Error al enviar', err);
        alert('Error de conexión');
      }
    });
  }

  cancelar() {
    this.cesantia = {
      generador: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campanaArea: '',
      descripcion: ''
    };
    this.router.navigate(['/nomina']);
  }
}
