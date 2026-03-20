import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-Auxilio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './AuxilioRodamiento.Component.html',
  styleUrls: ['./AuxilioRodamiento.Component.css'],
})
export class AuxilioRodamientoComponent {

  // Objeto para guardar los datos
  auxilio = {
    generador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    valorAuxilio: 0, // Inicializado en 0
    descripcion: ''
  };

  constructor(private router: Router) { }

  guardarAuxilio() {
    console.log('Auxilio guardado:', this.auxilio);
    alert(`Auxilio de rodamiento guardado para ${this.auxilio.nombre}. Valor: ${this.auxilio.valorAuxilio}`);

    // (Opcional) Lógica para guardar en BD
    // this.rodamientoService.guardar(this.auxilio).subscribe(...);

    // (Opcional) Volver al menú
    // this.router.navigate(['/nomina']);
  }

  cancelar() {
    this.auxilio = {
      generador: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campanaArea: '',
      valorAuxilio: 0,
      descripcion: ''
    };
    this.router.navigate(['/nomina']);
  }
}
