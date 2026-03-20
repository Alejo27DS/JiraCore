import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-Retiro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './Retiro.Component.html',
  styleUrls: ['./Retiro.Component.css'] // Bórralo si no existe
})
export class RetiroComponent {

  // Objeto para guardar los datos (usamos : any)
  retiro: any = {
    cedula: '',
    resumen: '',
    fechaInforme: '',
    cargo: '',
    correoCorporativo: '',
    campanaArea: '',
    jefeInmediato: '',
    fechaRetiro: '',
    motivoRetiro: '',
    descripcion: '',
    archivo: null // Aquí guardamos el archivo
  };

  constructor(private router: Router) { }

  // Método para capturar el archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.retiro.archivo = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  guardarRetiro() {
    console.log('Solicitud de retiro guardada:', this.retiro);
    console.log('Archivo adjunto:', this.retiro.archivo ? this.retiro.archivo.name : 'No adjuntado');

    alert(`Solicitud de retiro guardada para Cédula: ${this.retiro.cedula}.`);

    // (Opcional) Lógica para guardar en BD
    // this.retiroService.guardar(this.retiro).subscribe(...);

    // (Opcional) Volver al menú
    // this.router.navigate(['/nomina']);
  }

  cancelar() {
    this.retiro = {
      cedula: '',
      resumen: '',
      fechaInforme: '',
      cargo: '',
      correoCorporativo: '',
      campanaArea: '',
      jefeInmediato: '',
      fechaRetiro: '',
      motivoRetiro: '',
      descripcion: '',
      archivo: null
    };
    this.router.navigate(['/nomina']);
  }
}
