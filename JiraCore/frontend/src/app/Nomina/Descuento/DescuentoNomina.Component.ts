import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../../services/Solicitudes';


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
  descuento: any = {
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

  constructor(private router: Router, private solicitudesService: SolicitudesService) { }

  // Método para capturar el archivo cuando el usuario lo selecciona
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.descuento.archivo = file;
      console.log('Archivo seleccionado:', file.name);
    }
  };

  guardarDescuento() {
    // Usamos el servicio genérico
    this.solicitudesService.crearSolicitud('Descuento de Nomina', this.descuento).subscribe({
      next: (res: any) => {
        console.error("Respuesta del servidor:", res)
        alert('Solicitud enviada a Administración/RRHH');
        this.router.navigate(['/nomina']);
      },
      error: (err) => {
        console.error('Error al enviar', err);
        alert('Error de conexión');
      }
    });
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
