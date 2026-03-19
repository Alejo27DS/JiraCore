import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuxilioRodamientoService } from '../services/AuxilioRodamiento';

@Component({
  selector: 'app-AuxilioRodamiento',
  standalone: true,
  imports: [NgFor], // Importamos NgFor para usarlo en el HTML]
  templateUrl: './AuxilioRodamiento.Component.html',

})
export class AuxilioRodamientoComponent implements OnInit {

  // Variables para guardar los datos que vienen del Backend
  stats: any;
  activities: any[] = [];

  constructor(private auxilioRodamientoService: AuxilioRodamientoService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // Llamamos al API
    this.auxilioRodamientoService.getStats().subscribe(data => {
      this.stats = data; // Guardamos los datos en la variable
    });

    this.auxilioRodamientoService.getActivity().subscribe(data => {
      this.activities = data;
    });
  }
}
