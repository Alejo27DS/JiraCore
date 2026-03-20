import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BonoNominaService } from '../services/BonoNomina';

@Component({
  selector: 'app-BonoNomina',
  standalone: true,
  imports: [NgFor], // Importamos NgFor para usarlo en el HTML]
  templateUrl: './BonoNomina.Component.html',

})
export class BonoNominaComponent implements OnInit {

  // Variables para guardar los datos que vienen del Backend
  stats: any;
  activities: any[] = [];

  constructor(private bonoNominaService: BonoNominaService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // Llamamos al API
    this.bonoNominaService.getStats().subscribe(data => {
      this.stats = data; // Guardamos los datos en la variable
    });

    this.bonoNominaService.getActivity().subscribe(data => {
      this.activities = data;
    });
  }
}
