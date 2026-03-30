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

  deletedIds: Set<number> = new Set<number>(); 


  constructor(
    private solicitudesService: SolicitudesService,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  // --- MODIFICAR ESTE MÉTODO ---
  cargarDatos() {
    this.solicitudesService.getBandejaTalentoHumano(
      this.filtros.q, this.filtros.estado, this.filtros.tipo
    ).subscribe({
      next: (response: any) => {
        // ===========================================
        // AQUÍ ESTÁ EL TRUCO: Filtramos lo que vino de la BD
        // para eliminar los que el usuario ya borró de la vista.
        // ===========================================
        const solicitudesFiltradas = response.solicitudes.filter((s: any) =>
          !this.deletedIds.has(s.id)
        );

        this.solicitudes = solicitudesFiltradas;

        // Recalculamos KPIs basados en la lista filtrada
        this.kpis = {
          total: this.solicitudes.length,
          pendientes: this.solicitudes.filter(s => s.estado === 'Pendiente').length,
          enProceso: this.solicitudes.filter(s => s.estado === 'EnProceso').length,
          gestionadas: this.solicitudes.filter(s => s.estado === 'Gestionada' || s.estado === 'EnviadoTecnologia').length
        };
      },
      error: (err) => console.error('Error cargando bandeja', err)
    });
  }

  filtrar() {
    this.cargarDatos();
  }

  // --- ACTUALIZACIÓN INMEDIATA (Optimistic UI) ---
  cambiarEstado(id: number, nuevoEstado: string) {
    // 1. Buscamos el índice de la solicitud en la lista local
    const index = this.solicitudes.findIndex(s => s.id === id);

    if (index !== -1) {
      const estadoAnterior = this.solicitudes[index].estado;

      // 2. Actualizamos el estado en la lista local INMEDIATAMENTE
      this.solicitudes[index].estado = nuevoEstado;

      // 3. Recalculamos los contadores al instante
      this.recalcularKpisLocales();

      // 4. Llamamos al Backend para guardar el cambio real
      this.solicitudesService.actualizarEstado(id, nuevoEstado).subscribe({
        next: () => {
          // Éxito: Ya está actualizado visualmente, no necesitamos hacer nada más.
          console.log('Estado actualizado en DB');
        },
        error: (err) => {
          // Si falla la DB, REVERTIMOS el cambio visual (Rollback)
          this.solicitudes[index].estado = estadoAnterior;
          this.recalcularKpisLocales();
          alert('Error al guardar el estado en el servidor. Se ha revertido el cambio.');
        }
      });
    }
  }

  // Método auxiliar para recalcular los KPIs sin pedir a la BD
  recalcularKpisLocales() {
    this.kpis.total = this.solicitudes.length;
    this.kpis.pendientes = this.solicitudes.filter(s => s.estado === 'Pendiente').length;
    this.kpis.enProceso = this.solicitudes.filter(s => s.estado === 'EnProceso').length;
    this.kpis.gestionadas = this.solicitudes.filter(s => s.estado === 'Gestionada' || s.estado === 'EnviadoTecnologia').length;
  }

  eliminarDeVista(id: string) {
    if (confirm('¿Estás seguro de eliminar esta solicitud de RRHH? (Esto se guardará en la base de datos)')) {

      // ELIMINAMOS LA LÓGICA ANTIGUA (deletedIds, filter) -----------------

      // 1. Llamamos al servicio para borrar en MongoDB (Soft Delete)
      this.solicitudesService.eliminarSolicitud(id).subscribe({
        next: () => {
          // 2. Si el backend responde OK, simplemente recargamos los datos
          // El backend ya no nos enviará el borrado, así que desaparece de la lista
          this.cargarDatos();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar la solicitud');
        }
      });

      // -------------------------------------------------------------------
    }
  }

  verDetalle(solicitud: any) {
    this.solicitudSeleccionada = solicitud;

    // Si no tiene comentarios, iniciamos la propiedad
    if (!this.solicitudSeleccionada.comentarios) {
      this.solicitudSeleccionada.comentarios = '';
    }

    // Parseamos los datos
    if (typeof solicitud.datos === 'string') {
      try {
        this.solicitudSeleccionada.datosParseados = JSON.parse(solicitud.datos);
      } catch (e) { this.solicitudSeleccionada.datosParseados = solicitud.datos; }
    } else {
      this.solicitudSeleccionada.datosParseados = solicitud.datos;
    }
    this.mostrarModal = true;
  }

  // En RrhhPanel.component.ts

  guardarComentario() {
    const mensaje = (document.getElementById('comentarios') as HTMLTextAreaElement).value;
    if (!mensaje.trim()) return alert('Escribe un comentario');

    // LLAMAMOS AL SERVICIO (En vez de solo alertar)
    this.solicitudesService.agregarComentario(
      this.solicitudSeleccionada.id,
      'RRHH', // Autor es RRHH
      mensaje
    ).subscribe({
      next: () => {
        alert('Comentario enviado a Tecnologia');
        this.cargarDatos(); // Recargamos para verlo en la lista/comentarios
        this.mostrarModal = false;
      },
      error: () => alert('Error al guardar comentario')
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
