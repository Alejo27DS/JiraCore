import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Para navegar al cancelar
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // IMPORTANTE: Permite usar ngModel
import { SolicitudesService } from '../../services/Solicitudes';

@Component({
  selector: 'app-Bono',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // <--- NECESARIO para que el formulario funcione
  ],
  templateUrl: './BonoNomina.Component.html',
  styleUrl: "./BonoNomina.Component.css",
})
export class BonoNominaComponent {

  // Objeto para guardar los datos del formulario
  solicitud = {
    nombreGenerador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    valorBono: 0,
    descripcion: ''
  };

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  guardarBono() {
    // Usamos el servicio genérico
    this.solicitudesService.crearSolicitud('Bono de Mera Liberalidad', this.solicitud).subscribe({
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
    // Limpiar el formulario o volver atrás
    this.router.navigate(['/nomina']);
  }
}
