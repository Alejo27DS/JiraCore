import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitudes.component.html', // Asegúrate que este archivo sea el correcto
  styleUrls: ['./Solicitudes.Component.css'] // Usa el nombre exacto que te pide el warning
})
export class SolicitudesComponent {

  private http = inject(HttpClient);
  private router = inject(Router);

  // --- ESTA ES LA PROPIEDAD QUE FALTABA ---
  solicitud = {
    cedula: '',
    resumen: '',
    fechaInforme: '',
    cargo: '',
    correoCorporativo: '',
    campanaArea: '',
    jefeInmediato: '',
    fechaRetiro: '',
    motivoRetiro: '',
    descripcion: ''
  };

  archivoSeleccionado: File | null = null;

  // --- ESTE MÉTODO FALTABA ---
  guardarSolicitud() {
    if (!this.archivoSeleccionado) {
      alert('Por favor adjunte el documento.');
      return;
    }

    const formData = new FormData();
    Object.keys(this.solicitud).forEach(key => {
      formData.append(key, (this.solicitud as any)[key]);
    });
    formData.append('documento', this.archivoSeleccionado);

    // Ajusta la URL a tu backend
    this.http.post('https://localhost:7015/api/solicitudes', formData).subscribe({
      next: (res) => {
        alert('Solicitud guardada con éxito');
        this.limpiarFormulario();
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al guardar');
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
    }
  }

  cancelar() {
    if(confirm('¿Cancelar?')) {
      this.router.navigate(['/dashboard']);
    }
  }

  private limpiarFormulario() {
    this.solicitud = {
      cedula: '', resumen: '', fechaInforme: '', cargo: '',
      correoCorporativo: '', campanaArea: '', jefeInmediato: '',
      fechaRetiro: '', motivoRetiro: '', descripcion: ''
    };
    this.archivoSeleccionado = null;
    const fileInput = document.getElementById('documento') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}