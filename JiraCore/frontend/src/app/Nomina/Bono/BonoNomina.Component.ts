import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Para navegar al cancelar
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // IMPORTANTE: Permite usar ngModel

@Component({
  selector: 'app-Bono',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // <--- NECESARIO para que el formulario funcione
  ],
  templateUrl: './BonoNomina.Component.html',
  styleUrl: "./BonoNomina.Component.css",
})
export class BonoNominaComponent {

  // Objeto para guardar los datos del formulario
  solicitud = {
    nombreGenerador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    valorBono: 0,
    descripcion: ''
  };

  constructor(private router: Router) { }

  guardarBono() {
    // Aquí iría la llamada a tu API (Service) para guardar
    console.log('Datos a guardar:', this.solicitud);
    alert('Bono guardado correctamente: ' + this.solicitud.nombre);

    // Opcional: volver a la lista de nómina
    // this.router.navigate(['/nomina']);
  }

  cancelar() {
    // Limpiar el formulario o volver atrás
    this.router.navigate(['/nomina']);
  }
}
