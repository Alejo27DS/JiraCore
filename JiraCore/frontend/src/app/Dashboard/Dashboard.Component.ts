import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para | date

@Component({
  selector: 'app-Dashboard',
  standalone: true,
  imports: [
    CommonModule // <--- IMPORTANTE para que funcione el formato de fecha
  ],
  templateUrl: './Dashboard.Component.html',
})
export class DashboardComponent implements OnInit {

  fechaActual: Date = new Date(); // Obtiene la fecha y hora actual
  usuarioActual: string = '';
  s
  ngOnInit(): void {
    // Obtenemos el email que guardamos en el Login
    const user = localStorage.getItem('UserEmail');
    this.usuarioActual = user ? user : '';
  }
}
