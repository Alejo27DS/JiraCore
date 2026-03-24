import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../../services/Solicitudes';

@Component({
  selector: 'app-ReporteEmbarazo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './Embarazo.Component.html',
  styleUrls: ['./Embarazo.Component.css']
})
export class EmbarazoComponent {

  // Objeto para guardar los datos
  reporte: any = {
    solicitanteEnNombreDe: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campaniaArea: '',
    numeroContacto: '',
    correoCorporativo: '',
    fechaReporte: '', // Campo específico: Fecha del reporte
    fechaIngreso: '', // Campo específico: Fecha de ingreso
    archivo: null
  };

  // Listas para los selects
  solicitantes = [
    { valor: 'pepito perez', texto: 'pepito' },
    { valor: 'juan', texto: 'juan' },
    { valor: 'laura', texto: 'laura' },
    { valor: 'sofia', texto: 'sofia' }
  ];

  cargos = [
    'ACCOUNT EXECUTIVE', 'Administrador Operativo de Infraestructura', 'AGENTE',
    'AGENTE BACKUP', 'ANALISTA CONTABLE', 'COORDINADOR', 'GERENTE GENERAL',
    'LIDER DE SALUD Y SEGURIDAD EN EL TRABAJO', 'TEAM LEADER'
    // ... Agrega aquí el resto de la lista completa si lo necesitas ...
  ];

  campanias = [
    'Anla', 'Ant', 'ARN', 'Banco de La Republica', 'Dissan Ibagué',
    'Fedex', 'Feel', 'Gerencia General', 'Gerencia Operaciones',
    'Ministerio del interior', 'SIC', 'Uariv'
    // ... Agrega aquí el resto de áreas completas si lo necesitas ...
  ];

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  // Método para capturar el archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.reporte.archivo = file;
      console.log('Archivo seleccionado:', file.name);
    }
  };

  guardarReporte() {
    // Usamos el servicio genérico
    this.solicitudesService.crearSolicitud('Reporte de Embarazo', this.reporte).subscribe({
      next: (res: any) => {
        console.log("Respuesta del servidor:", res);
        alert('Reporte de embarazo enviado a Talento Humano/SSO');
        this.router.navigate(['/nomina']); // Ajusta la ruta
      },
      error: (err) => {
        console.error('Error al enviar', err);
        alert('Error de conexión');
      }
    });
  }

  cancelar() {
    // Reseteamos el objeto
    this.reporte = {
      solicitanteEnNombreDe: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campaniaArea: '',
      numeroContacto: '',
      correoCorporativo: '',
      fechaReporte: '',
      fechaIngreso: '',
      archivo: null
    };
    this.router.navigate(['/nomina']);
  }
}
