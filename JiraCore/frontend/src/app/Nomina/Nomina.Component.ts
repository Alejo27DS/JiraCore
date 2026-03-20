import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Solo necesitas esto para los botones

@Component({
  selector: 'app-nomina',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './Nomina.Component.html',
  styleUrl: './Nomina.Component.css',
})
export class NominaComponent {
  title = 'Módulo de Nómina';

}
