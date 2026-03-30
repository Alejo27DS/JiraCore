import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../../services/Solicitudes';

@Component({
  selector: 'app-Accidente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './Accidente.Component.html',
  styleUrls: ['./Accidente.Component.css']
})
export class AccidenteComponent {

  // Objeto para guardar los datos
  accidente: any = {
    generador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    fechaAccidente: '',
    descripcion: '',
    documento: null
  };

  // --- LISTAS FALTANTES PARA EL HTML ---
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
  // -------------------------------------

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.accidente.documento = file;
    }
  }

  guardarAccidente() {
    if (!this.accidente.documento) {
      alert('Por favor adjunte el documento.');
      return;
    }

    const formData = new FormData();
    formData.append('tipoSolicitud', 'Accidente de Trabajo');

    Object.keys(this.accidente).forEach(key => {
      if (key !== 'documento' && this.accidente[key] !== null && this.accidente[key] !== undefined) {
        formData.append(key, this.accidente[key]);
      }
    });

    if (this.accidente.documento) {
      formData.append('documento', this.accidente.documento);
    }

    this.solicitudesService.crearSolicitud(formData).subscribe({
      next: (res: any) => {
        alert('Solicitud de Accidente enviada a RRHH');
        this.limpiarFormulario();
        this.router.navigate(['/seguridad']);
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
      this.router.navigate(['/seguridad']);
    }
  }

  private limpiarFormulario() {
    this.accidente = {
      generador: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campanaArea: '',
      fechaAccidente: '',
      descripcion: '',
      documento: null
    };
    this.router.navigate(['/seguridad']);
  }
}