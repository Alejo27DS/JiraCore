import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DescuentoNominaService } from '../services/DescuentoNomina';

@Component({
  selector: 'app-DescuentoNomina',
  standalone: true,
  imports: [NgFor], // Importamos NgFor para usarlo en el HTML]
  templateUrl: './DescuentoNomina.Component.html',

})
export class DescuentoNominaComponent implements OnInit {

  // Variables para guardar los datos que vienen del Backend
  stats: any;
  activities: any[] = [];

  constructor(private descuentoNominaService: DescuentoNominaService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // Llamamos al API
    this.descuentoNominaService.getStats().subscribe(data => {
      this.stats = data; // Guardamos los datos en la variable
    });

    this.descuentoNominaService.getActivity().subscribe(data => {
      this.activities = data;
    });
  }
}
