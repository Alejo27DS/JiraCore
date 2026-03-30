import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudesService } from '../services/Solicitudes';
import { AuthService } from '../Login/auth.service';

@Component({
  selector: 'app-Tecnologia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Tecnologia.component.html',
  styleUrls: ['./Tecnologia.component.css']
})
export class TecnologiaComponent implements OnInit {

  solicitudes: any[] = [];
  mostrarModal: boolean = false;
  solicitudSeleccionada: any = null;

  kpis = {
    total: 0,
    pendientes: 0,
    enProceso: 0,
    gestionadas: 0
  };

  filtros = { q: '', estado: '', tipo: '' };
  estados = ['Pendiente', 'EnProceso', 'Gestionada'];
  tipos = ['Nomina', 'Solicitudes', 'Retiro', 'Campaña', 'SST', 'Seguridad', 'Embarazo', 'Accidente', 'CondicionSalud', 'Ingreso'];

  deletedIds: Set<number> = new Set<number>(); 

  constructor(
    private solicitudesService: SolicitudesService,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.solicitudesService.getBandejaTecnologia().subscribe({
      next: (response: any) => {
        const lista = response.solicitudes || response;
        const solicitudesFiltradas = lista.filter((s: any) => !this.deletedIds.has(s.id));
        this.solicitudes = solicitudesFiltradas;
        this.recalcularKpisLocales();
      },
      error: (err: any) => console.error('Error cargando bandeja tecnológica', err)
    });
  }

  filtrar() {
    this.cargarDatos();
  }

  cambiarEstado(id: number, nuevoEstado: string) {
    const index = this.solicitudes.findIndex(s => s.id === id);
    if (index !== -1) {
      const estadoAnterior = this.solicitudes[index].estado;
      this.solicitudes[index].estado = nuevoEstado;
      this.recalcularKpisLocales();

      // CORRECCIÓN: Convertir id a String
      this.solicitudesService.actualizarEstado(String(id), nuevoEstado).subscribe({
        next: () => console.log('Estado actualizado en DB'),
        error: (err: any) => {
          this.solicitudes[index].estado = estadoAnterior;
          this.recalcularKpisLocales();
          alert('Error al cambiar estado');
        }
      });
    }
  }

  recalcularKpisLocales() {
    this.kpis.total = this.solicitudes.length;
    this.kpis.pendientes = this.solicitudes.filter(s => s.estado === 'Pendiente').length;
    this.kpis.enProceso = this.solicitudes.filter(s => s.estado === 'EnProceso').length;
    this.kpis.gestionadas = this.solicitudes.filter(s => s.estado === 'Gestionada' || s.estado === 'EnviadoRRHH').length;
  }

  eliminarDeVista(id: string) {
    if (confirm('¿Eliminar esta solicitud?')) {
      this.solicitudesService.eliminarSolicitud(String(id)).subscribe({
        next: () => this.cargarDatos(),
        error: (err: any) => alert('Error al eliminar')
      });
    }
  }

  verDetalle(solicitud: any) {
    this.solicitudSeleccionada = solicitud;
    if (!this.solicitudSeleccionada.comentarios) this.solicitudSeleccionada.comentarios = '';
    if (typeof solicitud.datos === 'string') {
      try { this.solicitudSeleccionada.datosParseados = JSON.parse(solicitud.datos); } 
      catch (e) { this.solicitudSeleccionada.datosParseados = solicitud.datos; }
    } else {
      this.solicitudSeleccionada.datosParseados = solicitud.datos;
    }
    this.mostrarModal = true;
  }

  guardarComentario() {
    const mensaje = (document.getElementById('comentarios') as HTMLTextAreaElement).value;
    if (!mensaje.trim()) return alert('Escribe un comentario');

    // CORRECCIÓN: Unificar argumentos en un objeto
    this.solicitudesService.agregarComentario({
      solicitudId: this.solicitudSeleccionada.id,
      autor: 'Tecnología',
      texto: mensaje
    }).subscribe({
      next: () => {
        alert('Comentario enviado');
        this.cargarDatos();
        this.mostrarModal = false;
      },
      error: (err: any) => alert('Error al guardar comentario')
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.solicitudSeleccionada = null;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'Pendiente': return 'bg-secondary';
      case 'EnProceso': return 'bg-primary';
      case 'Gestionada': return 'bg-success';
      case 'EnviadoRRHH': return 'bg-info';
      default: return 'bg-light text-dark';
    }
  }
}