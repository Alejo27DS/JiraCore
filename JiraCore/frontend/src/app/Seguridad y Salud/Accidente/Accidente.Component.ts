import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importante para [(ngModel)]
import { SolicitudesService } from '../../services/Solicitudes'; // Asegúrate de la ruta correcta

@Component({
  selector: 'app-Accidentes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './Accidente.Component.html',
  styleUrls: ['./Accidente.Component.css']
})
export class AccidenteComponent {

  // Objeto para guardar los datos (Estructura similar a tu ejemplo de Descuento)
  accidente: any = {
    solicitanteEnNombreDe: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campaniaArea: '',
    numeroContacto: '',
    fechaAccidente: '',
    correoCorporativo: '',
    descripcionHechos: '',
    archivo: null
  };

  // Listas para los selects (para no llenar el HTML de opciones)
  solicitantes = [
    { valor: 'pepito perez', texto: 'pepito' },
    { valor: 'juan', texto: 'juan' },
    { valor: 'laura', texto: 'laura' },
    { valor: 'sofia', texto: 'sofia' }
  ];

  // Lista de cargos (recortada por brevedad, agrega todos los que tenías)
  cargos = [
    'ACCOUNT EXECUTIVE', 'Administrador Operativo de Infraestructura', 'AGENTE',
    'AGENTE BACKUP', 'ANALISTA CONTABLE', 'COORDINADOR', 'GERENTE GENERAL',
    'LIDER DE SALUD Y SEGURIDAD EN EL TRABAJO', 'TEAM LEADER'
    // ... Agrega aquí el resto de cargos de tu lista original ...
  ];

  // Lista de campañas/áreas
  campanias = [
    'Anla', 'Ant', 'ARN', 'Banco de La Republica', 'Dissan Ibagué',
    'Fedex', 'Feel', 'Gerencia General', 'Gerencia Operaciones',
    'Ministerio del interior', 'SIC', 'Uariv'
    // ... Agrega aquí el resto de áreas de tu lista original ...
  ];

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  // Método para capturar el archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.accidente.archivo = file;
      console.log('Archivo seleccionado:', file.name);
    }
  };

  guardarAccidente() {
    // Usamos el servicio genérico igual que en tu ejemplo
    this.solicitudesService.crearSolicitud('Accidente de Trabajo', this.accidente).subscribe({
      next: (res: any) => {
        console.log("Respuesta del servidor:", res);
        alert('Solicitud de Accidente enviada a Seguridad/SST');
        this.router.navigate(['/nomina']); // Ajusta la ruta si es diferente
      },
      error: (err) => {
        console.error('Error al enviar', err);
        alert('Error de conexión');
      }
    });
  }

  cancelar() {
    // Reseteamos el objeto
    this.accidente = {
      solicitanteEnNombreDe: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campaniaArea: '',
      numeroContacto: '',
      fechaAccidente: '',
      correoCorporativo: '',
      descripcionHechos: '',
      archivo: null
    };
    this.router.navigate(['/seguridad']);
  }
}
