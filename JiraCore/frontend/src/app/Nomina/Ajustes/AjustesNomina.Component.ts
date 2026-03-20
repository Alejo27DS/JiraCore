import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-Ajustes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './AjustesNomina.Component.html',
  styleUrl: "./AjustesNomina.Component.css",
})
export class AjustesNominaComponent {

  // Objeto con los nombres LIMPIOS que coinciden con el HTML
  ajuste = {
    generador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    descripcion: ''
  };

  constructor(private router: Router) { }

  guardarAjuste() {
    console.log('Ajuste guardado:', this.ajuste);
    alert(`Ajuste guardado para ${this.ajuste.nombre}.`);

    // (Opcional) Guardar en BD
    // this.ajusteService.guardar(this.ajuste).subscribe(...);

    // (Opcional) Volver al menú
    // this.router.navigate(['/nomina']);
  }

  cancelar() {
    this.ajuste = {
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
