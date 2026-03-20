import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AjustesService } from '../services/AjustesNomina';

@Component({
  selector: 'app-AjustesNomina',
  standalone: true,
  imports: [NgFor], // Importamos NgFor para usarlo en el HTML]
  templateUrl: './AjustesNomina.Component.html',

})
export class AjustesNominaComponent implements OnInit {

  // Variables para guardar los datos que vienen del Backend
  stats: any;
  activities: any[] = [];

  constructor(private ajustesService: AjustesService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {   
    // Llamamos al API
    this.ajustesService.getStats().subscribe(data => {
      this.stats = data; // Guardamos los datos en la variable
    });

    this.ajustesService.getActivity().subscribe(data => {
      this.activities = data;
    });
  }
}
