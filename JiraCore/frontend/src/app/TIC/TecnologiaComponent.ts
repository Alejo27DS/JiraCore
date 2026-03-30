import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SolicitudesService } from '../services/Solicitudes';
import { AuthService } from '../Login/auth.service';

@Component({
  selector: 'app-tecnologia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Tecnologia.Component.html',
  styleUrls: ['./Tecnologia.Component.css']
})
export class TecnologiaComponent implements OnInit {

  solicitudes: any[] = [];
  mostrarModal: boolean = false;
  solicitudSeleccionada: any = null;

  // KPIs
  kpis = { total: 0, pendientes: 0, enProceso: 0, gestionadas: 0 };

  // Filtros
  filtros = { q: '', estado: '', tipo: '' };
  estados = ['EnviadoTecnologia', 'EnProcesoTecnologia', 'GestionadaTecnologia'];
  tipos = ['Ingreso', 'Retiro']; // Solo estos según tu requerimiento

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
        this.solicitudes = response.solicitudes || [];
        this.kpis = response.kpis || this.kpis;
      },
      error: (err) => console.error('Error cargando bandeja tecnologia', err)
    });
  }

  filtrar() {
    this.cargarDatos();
  }

  cambiarEstado(id: number, nuevoEstado: string) {
    this.solicitudesService.actualizarEstado(id, nuevoEstado).subscribe({
      next: () => {
        this.cargarDatos();
      },
      error: (err) => alert('Error al cambiar estado')
    });
  }

  verDetalle(solicitud: any) {
    this.solicitudSeleccionada = solicitud;
    if (!this.solicitudSeleccionada.comentarios) this.solicitudSeleccionada.comentarios = [];
    this.mostrarModal = true;
  }

  // --- NUEVO: Método para responder/comentar ---
  guardarComentario() {
    const mensaje = (document.getElementById('nuevoComentario') as HTMLTextAreaElement).value;
    if (!mensaje.trim()) return alert('Escribe un mensaje');

    this.solicitudesService.agregarComentario(
      this.solicitudSeleccionada.id,
      'Tecnología',
      mensaje
    ).subscribe({
      next: () => {
        alert('Respuesta enviada a RRHH');
        this.cargarDatos(); // Recarga para ver el comentario en el chat
        this.mostrarModal = false;
      },
      error: () => alert('Error al enviar respuesta')
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
      case 'EnviadoTecnologia': return 'bg-secondary'; // Gris (Llegó de RRHH)
      case 'EnProcesoTecnologia': return 'bg-primary'; // Azul (Configurando PC)
      case 'GestionadaTecnologia': return 'bg-success'; // Verde (Listo para Nomina)
      default: return 'bg-light text-dark';
    }
  }
}
