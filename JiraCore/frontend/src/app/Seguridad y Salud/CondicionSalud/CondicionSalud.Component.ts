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
    fechaTentativaIngreso: '',
    correoCorporativo: '',
    diagnosticoCondicion: '',
    documento: null // Cambiado de 'archivo' a 'documento'
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
  ];

  campanias = [
    'Anla', 'Ant', 'ARN', 'Banco de La Republica', 'Dissan Ibagué',
    'Fedex', 'Feel', 'Gerencia General', 'Gerencia Operaciones',
    'Ministerio del interior', 'SIC', 'Uariv'
  ];

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  // Método para capturar el archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.condicion.documento = file;
    }
  }

  guardarCondicion() {
    // Validación de archivo
    if (!this.condicion.documento) {
      alert('Por favor adjunte el documento.');
      return;
    }

    // 1. Construimos el FormData
    const formData = new FormData();

    // Identificador del tipo de solicitud
    formData.append('tipoSolicitud', 'Condicion Especial de Salud');

    // Recorremos el objeto y agregamos los campos
    Object.keys(this.condicion).forEach(key => {
      if (key !== 'documento' && this.condicion[key] !== null && this.condicion[key] !== undefined) {
        formData.append(key, this.condicion[key]);
      }
    });

    // Agregamos el archivo explícitamente
    if (this.condicion.documento) {
      formData.append('documento', this.condicion.documento);
    }

    // 2. Enviamos al servicio (1 solo argumento)
    this.solicitudesService.crearSolicitud(formData).subscribe({
      next: (res: any) => {
        alert('Solicitud de Condición Especial enviada a Talento Humano/SSO');
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
      documento: null
    };

    const fileInput = document.getElementById('documento') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}