import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-Descuento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './DescuentoNomina.Component.html',
  styleUrls: ['./DescuentoNomina.Component.css']
})
export class DescuentoNominaComponent {

  // Objeto para guardar los datos
  descuento: any= {
    generador: '',
    resumen: '',
    cedula: '',
    nombre: '',
    cargo: '',
    campanaArea: '',
    valorDescuento: 0,
    descripcion: '',
    archivo: null
  };

  constructor(private router: Router) { } 

  // Método para capturar el archivo cuando el usuario lo selecciona
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.descuento.archivo = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  guardarDescuento() {
    console.log('Descuento guardado:', this.descuento);
    console.log('Archivo adjunto:', this.descuento.archivo ? this.descuento.archivo.name : 'No adjuntado');

    alert(`Descuento guardado para ${this.descuento.nombre}. Valor: ${this.descuento.valorDescuento}`);

    // (Opcional) Para subir archivos reales, necesitarías usar FormData en tu Servicio
    // const formData = new FormData();
    // formData.append('file', this.descuento.archivo);
    // this.descuentoService.subir(formData).subscribe(...);

    // (Opcional) Volver al menú
    // this.router.navigate(['/nomina']);
  }

  cancelar() {
    this.descuento = {
      generador: '',
      resumen: '',
      cedula: '',
      nombre: '',
      cargo: '',
      campanaArea: '',
      valorDescuento: 0,
      descripcion: '',
      archivo: null
    };
    this.router.navigate(['/nomina']);
  }
}
