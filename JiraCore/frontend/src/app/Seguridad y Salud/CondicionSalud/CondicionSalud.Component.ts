import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../../services/Solicitudes';

@Component({
  selector: 'app-CondicionSalud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './CondicionSalud.Component.html',
  styleUrls: ['./CondicionSalud.Component.css']
})
export class CondicionSaludComponent {

  // Objeto para guardar los datos
  condicion: any = {
    solicitanteEnNombreDe: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campaniaArea: '',
    numeroContacto: '',
    fechaTentativaIngreso: '', // Campo específico
    correoCorporativo: '',
    diagnosticoCondicion: '', // Campo específico
    archivo: null
  };

  // Listas para los selects (Mismas que en el ejemplo anterior)
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
    // ... Agrega aquí el resto de cargos completos si lo necesitas ...
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
      this.condicion.archivo = file;
      console.log('Archivo seleccionado:', file.name);
    }
  };

  guardarCondicion() {
    // Usamos el servicio genérico
    this.solicitudesService.crearSolicitud('Condicion Especial de Salud', this.condicion).subscribe({
      next: (res: any) => {
        console.log("Respuesta del servidor:", res);
        alert('Solicitud de Condición Especial enviada a Talento Humano/SSO');
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
    this.condicion = {
      solicitanteEnNombreDe: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campaniaArea: '',
      numeroContacto: '',
      fechaTentativaIngreso: '',
      correoCorporativo: '',
      diagnosticoCondicion: '',
      archivo: null
    };
    this.router.navigate(['/seguridad']);
  }
}
