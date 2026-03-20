import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitasSSTService } from '../services/CitasSST'; // Importamos el servicio

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CommonModule // Importar DatePipe si usas pipes, aunque arriba use la pipe en el HTML inline
  ],
  templateUrl: './CitasSST.Component.html',
  styleUrls: ['./CitasSST.Component.css']
})
export class CitasSSTComponent implements OnInit {

  // Datos del formulario
  nuevaCita: any = {
    nombrePaciente: '',
    email: '',
    fecha: '',
    motivo: ''
  };

  // Lista de citas (se llenará con el servicio)
  citasAgendadas: any[] = [];

  constructor(private router: Router, private citasService: CitasSSTService) { }

  ngOnInit(): void {
    // Cargamos las citas existentes al iniciar
    this.cargarCitas();
  }

  cargarCitas() {
    this.citasService.getCitas().subscribe(data => {
      this.citasAgendadas = data;
    });
  }

  agendarCita() {
    // Asumimos que la nueva cita entra como 'Pendiente' o 'Programada'
    this.nuevaCita.estado = 'Programada';

    // Agregamos a la lista local (simulación)
    // En un caso real, llamarías al servicio para guardar en BD
    this.citasAgendadas = [...this.citasAgendadas, this.nuevaCita];

    alert(`Cita agendada para ${this.nuevaCita.nombrePaciente}`);

    // Limpiar formulario
    this.nuevaCita = { nombrePaciente: '', email: '', fecha: '', motivo: '' };
  }

  cancelar() {
    this.nuevaCita = { nombrePaciente: '', email: '', fecha: '', motivo: '' };
    this.router.navigate(['/dashboard']); // O donde quieras volver
  }
}
