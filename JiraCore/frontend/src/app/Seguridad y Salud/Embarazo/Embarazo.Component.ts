import { Component, OnInit } from '@angular/core'; // <--- Agregado OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { ReporteEmbarazoService } from '../../services/reporte-embarazo.service';

// Interfaz que define los datos del formulario
export interface ReporteEmbarazo {
  solicitanteEnNombreDe: string;
  resumen: string;
  cedula: string;
  nombre: string;
  cargo: string;
  campaniaArea: string;
  numeroContacto: string;
  correoCorporativo: string;
  fechaReporte: string;
  fechaIngreso: string;
}

@Component({
  selector: 'app-reporte-embarazo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './embarazo.component.html',
  styleUrls: ['./embarazo.component.css']
})
export class EmbarazoComponent implements OnInit { // <--- Implementa OnInit

  // --- INYECCIONES ---
  private reporteService = inject(ReporteEmbarazoService);
  private router = inject(Router); 

  // --- MODELO DE DATOS ---
  reporte: ReporteEmbarazo = {
    solicitanteEnNombreDe: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campaniaArea: '',
    numeroContacto: '',
    correoCorporativo: '',
    fechaReporte: '',
    fechaIngreso: ''
  };

  archivoSeleccionado: File | null = null;

  // --- DATOS PARA LOS SELECTORES ---

  solicitantes = [
    { valor: 'mi', texto: 'Mí mismo' },
    { valor: 'jefe', texto: 'Mi Jefe Inmediato' },
    { valor: 'rrhh', texto: 'Recursos Humanos' }
  ];

  // CAMBIO: Arrays vacíos, se llenan desde la BD en ngOnInit
  cargos: string[] = []; 
  campanias: string[] = []; 

  // --- CICLO DE VIDA ---
  ngOnInit(): void {
    this.cargarCargosDesdeBD();
    this.cargarAreasDesdeBD();
  }

  // --- MÉTODOS DE CARGA DE DATOS ---

  cargarCargosDesdeBD() {
    this.reporteService.obtenerCargos().subscribe({
      next: (data: any[]) => {
        console.log('Cargos recibidos:', data);
        // Mapeamos el campo 'nombre_cargo' de MongoDB
        this.cargos = data.map(item => item.nombreCargo);
      },
      error: (err : any) => {
        console.error('Error cargando catálogo:', err);
        this.cargos = ['Error al cargar cargos'];
      }
    });
  }

  cargarAreasDesdeBD() {
    this.reporteService.obtenerAreas().subscribe({
      next: (data: any[]) => {
        console.log('Áreas recibidas:', data);
        // Mapeamos el campo 'nombre_area' de MongoDB
        this.campanias = data.map(item => item.nombreArea);
      },
      error: (err : any) => {
        console.error('Error cargando áreas:', err);
        this.campanias = ['Error al cargar áreas'];
      }
    });
  }

  // --- MÉTODOS DEL FORMULARIO ---

  guardarReporte() {
    if (!this.archivoSeleccionado) {
      alert('Por favor adjunte el documento PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('solicitanteEnNombreDe', this.reporte.solicitanteEnNombreDe);
    formData.append('resumen', this.reporte.resumen);
    formData.append('cedula', this.reporte.cedula);
    formData.append('nombre', this.reporte.nombre);
    formData.append('cargo', this.reporte.cargo);
    formData.append('campaniaArea', this.reporte.campaniaArea);
    formData.append('numeroContacto', this.reporte.numeroContacto);
    formData.append('correoCorporativo', this.reporte.correoCorporativo);
    formData.append('fechaReporte', this.reporte.fechaReporte);
    formData.append('fechaIngreso', this.reporte.fechaIngreso);
    formData.append('documento', this.archivoSeleccionado);

    this.reporteService.crearReporte(formData).subscribe({
      next: (response) => {
        console.log('✅ Éxito:', response);
        alert('¡Reporte enviado con éxito!');
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error('❌ Error:', err);
        alert('Ocurrió un error al guardar el reporte. Revisa la consola.');
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Por favor subir solo archivos PDF.');
        return;
      }
      this.archivoSeleccionado = file;
    }
  }

  cancelar() {
    if(confirm('¿Estás seguro de cancelar? Se perderán los datos.')) {
      this.limpiarFormulario();
    }
  }

  private limpiarFormulario() {
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
      fechaIngreso: ''
    };
    this.archivoSeleccionado = null;
    
    const fileInput = document.getElementById('documento') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
} 