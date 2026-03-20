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

  // Objeto con los nombres LIMPIOS que coinciden con el HTML
  ajuste: any= {
    generador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    descripcion: ''
  };

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  guardarAjuste() {
    // Usamos el servicio genérico
    this.solicitudesService.crearSolicitud('Ajustes de Nómina', this.ajuste).subscribe({
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
    this.ajuste = {
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
