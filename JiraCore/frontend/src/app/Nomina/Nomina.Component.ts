import { NgFor } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { NominaService } from '../services/Nomina';

@Component({
  selector: 'app-Nomina',
  standalone: true,
  imports: [NgFor], // Importamos NgFor para usarlo en el HTML]
  templateUrl: './Nomina.Component.html',

})
export class NominaComponent implements OnInit {

  // Variables para guardar los datos que vienen del Backend
  stats: any;
  activities: any[] = [];

  constructor(private nominaService: NominaService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // Llamamos al API
    this.nominaService.getStats().subscribe(data => {
      this.stats = data; // Guardamos los datos en la variable
    });

    this.nominaService.getActivity().subscribe(data => {
      this.activities = data;
    });
  }
}
