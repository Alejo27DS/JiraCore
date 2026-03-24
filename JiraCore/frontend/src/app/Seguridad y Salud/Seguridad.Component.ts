import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Solo necesitas esto para los botones

@Component({
  selector: 'app-seguridad',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './Seguridad.Component.html',
  styleUrl: './Seguridad.Component.css',
})
export class SeguridadComponent {
  title = 'Módulo de Seguridad y Salud';

}
