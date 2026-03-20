import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-Cesantias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './Cesantias.Component.html',
  styleUrls: ['./Cesantias.Component.css']
})
export class CesantiasComponent {

  // Objeto para guardar los datos (usamos : any para evitar errores de tipos)
  cesantia: any = {
    generador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    descripcion: ''
  };

  constructor(private router: Router) { }

  guardarCesantia() {
    console.log('Solicitud de cesantías guardada:', this.cesantia);
    alert(`Solicitud de retiro generada para ${this.cesantia.nombre}.`);

    // (Opcional) Lógica para guardar en BD
    // this.cesantiasService.guardar(this.cesantia).subscribe(...);

    // (Opcional) Volver al menú
    // this.router.navigate(['/nomina']);
  }

  cancelar() {
    this.cesantia = {
      generador: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campanaArea: '',
      descripcion: ''
    };
    this.router.navigate(['/nomina']);
  }
}
