import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudesService } from '../services/Solicitudes';
import { AuthService } from '../Login/auth.service';

@Component({
  selector: 'app-Rrhh-Panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './RrhhPanel.component.html',
  styleUrls: ['./RrhhPanel.component.css']
})
export class RrhhPanelComponent implements OnInit {

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

  // Aunque usamos deletedIds para UI optimista, la limpieza principal se hace recargando
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
    // CORRECCIÓN: El servicio definido anteriormente no acepta argumentos
    // Si necesitas filtros en el futuro, el servicio debe aceptar un objeto { q, estado, tipo }
    this.solicitudesService.getBandejaTalentoHumano().subscribe({
      next: (response: any) => {
        // Si el backend devuelve un array directo, usa 'response'. Si devuelve un objeto { solicitudes: [...] }, usa 'response.solicitudes'.
        // Asumo la estructura actual del usuario:
        const lista = response.solicitudes || response; 

        // Filtramos visualmente los borrados
        const solicitudesFiltradas = lista.filter((s: any) =>
          !this.deletedIds.has(s.id)
        );

        this.solicitudes = solicitudesFiltradas;

        this.recalcularKpisLocales();
      },
      error: (err: any) => console.error('Error cargando bandeja', err) // Agregado :any
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

      // CORRECCIÓN: Convertimos id a String para que coincida con el tipo del servicio
      this.solicitudesService.actualizarEstado(String(id), nuevoEstado).subscribe({
        next: () => {
          console.log('Estado actualizado en DB');
        },
        error: (err: any) => { // Agregado :any
          this.solicitudes[index].estado = estadoAnterior;
          this.recalcularKpisLocales();
          alert('Error al guardar el estado. Se ha revertido el cambio.');
        }
      });
    }
  }

  recalcularKpisLocales() {
    this.kpis.total = this.solicitudes.length;
    this.kpis.pendientes = this.solicitudes.filter(s => s.estado === 'Pendiente').length;
    this.kpis.enProceso = this.solicitudes.filter(s => s.estado === 'EnProceso').length;
    this.kpis.gestionadas = this.solicitudes.filter(s => s.estado === 'Gestionada' || s.estado === 'EnviadoTecnologia').length;
  }

  eliminarDeVista(id: string) {
    if (confirm('¿Estás seguro de eliminar esta solicitud de RRHH?')) {

      // CORRECCIÓN: Convertir id a String si el servicio lo pide
      this.solicitudesService.eliminarSolicitud(String(id)).subscribe({
        next: () => {
          this.cargarDatos();
        },
        error: (err: any) => { // Agregado :any
          console.error(err);
          alert('Error al eliminar la solicitud');
        }
      });
    }
  }

  verDetalle(solicitud: any) {
    this.solicitudSeleccionada = solicitud;

    if (!this.solicitudSeleccionada.comentarios) {
      this.solicitudSeleccionada.comentarios = '';
    }

    if (typeof solicitud.datos === 'string') {
      try {
        this.solicitudSeleccionada.datosParseados = JSON.parse(solicitud.datos);
      } catch (e) { this.solicitudSeleccionada.datosParseados = solicitud.datos; }
    } else {
      this.solicitudSeleccionada.datosParseados = solicitud.datos;
    }
    this.mostrarModal = true;
  }

  guardarComentario() {
    const mensaje = (document.getElementById('comentarios') as HTMLTextAreaElement).value;
    if (!mensaje.trim()) return alert('Escribe un comentario');

    // CORRECCIÓN: Unificar argumentos en un solo objeto
    this.solicitudesService.agregarComentario({
      solicitudId: this.solicitudSeleccionada.id,
      autor: 'RRHH',
      texto: mensaje
    }).subscribe({
      next: () => {
        alert('Comentario enviado');
        this.cargarDatos();
        this.mostrarModal = false;
      },
      error: (err: any) => { // Agregado :any
        alert('Error al guardar comentario');
      }
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
      case 'EnviadoTecnologia': return 'bg-info';
      default: return 'bg-light text-dark';
    }
  }
}