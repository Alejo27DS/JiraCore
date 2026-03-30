import { Component, OnInit } from '@angular/core'; // 1. Importamos OnInit
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
// 2. Implementamos la interfaz OnInit
export class EmbarazoComponent implements OnInit {

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
    fechaReporte: '',
    fechaIngreso: '',
    archivo: null
  };

  // Listas para los selects
  solicitantes = [
    { valor: 'pepito perez', texto: 'pepito' },
    { valor: 'juan', texto: 'juan' },
    { valor: 'laura', texto: 'laura' },
    { valor: 'sofia', texto: 'sofia' }
  ];

  // 3. Inicializamos el array vacío. Ya no escribimos la lista manual aquí.
  cargos: string[] = [];

  campanias = [
    'Anla', 'Ant', 'ARN', 'Banco de La Republica', 'Dissan Ibagué',
    'Fedex', 'Feel', 'Gerencia General', 'Gerencia Operaciones',
    'Ministerio del interior', 'SIC', 'Uariv'
  ];

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  // 4. Agregamos el ciclo de vida ngOnInit para cargar los datos al iniciar
  ngOnInit(): void {
    this.cargarCargos();
  }

  // Método auxiliar para llamar al servicio
  cargarCargos() {
    this.solicitudesService.obtenerCargos().subscribe({
      next: (datos) => {
        this.cargos = datos; // Llenamos el array con lo que viene de la BD
      },
      error: (err) => {
        console.error('Error cargando cargos:', err);
        // Opcional: Si falla, podrías cargar una lista por defecto aquí para que no quede vacío
        // this.cargos = ['Error al cargar', 'Consulte al admin'];
      }
    });
  }

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
        this.router.navigate(['/nomina']);
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
    this.router.navigate(['/seguridad']);
  }
}
