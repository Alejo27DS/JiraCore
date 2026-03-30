import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './adminpanel.component.html'
})
export class AdminPanelComponent implements OnInit {

  solicitudes: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.http.get<any[]>('https://localhost:7264/api/solicitudes/pendientes').subscribe(data => {
      this.solicitudes = data;
    });
  }

  aprobar(id: number) {
    alert(`Aprobando solicitud #${id}`);
    // Aquí iría la llamada para cambiar estado en el Backend
    // this.http.put(...).subscribe(...)
    this.cargarSolicitudes(); // Recargar lista
  }

  rechazar(id: number) {
    alert(`Rechazando solicitud #${id}`);
    this.cargarSolicitudes();
  }
}
