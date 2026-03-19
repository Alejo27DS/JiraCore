import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CesantiasService } from '../services/Cesantias';

@Component({
  selector: 'app-Cesantias',
  standalone: true,
  imports: [NgFor], // Importamos NgFor para usarlo en el HTML]
  templateUrl: './Cesantias.Component.html',

})
export class CesantiasComponent implements OnInit {

  // Variables para guardar los datos que vienen del Backend
  stats: any;
  activities: any[] = [];

  constructor(private cesantiasService: CesantiasService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // Llamamos al API
    this.cesantiasService.getStats().subscribe(data => {
      this.stats = data; // Guardamos los datos en la variable
    });

    this.cesantiasService.getActivity().subscribe(data => {
      this.activities = data;
    });
  }
}
