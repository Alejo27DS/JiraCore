import { NgFor } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { DashboardService } from '../services/Dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor], // Importamos NgFor para usarlo en el HTML]
  templateUrl: './dashboard.component.html', 
  
})
export class DashboardComponent implements OnInit {

  // Variables para guardar los datos que vienen del Backend
  stats: any;
  activities: any[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // Llamamos al API
    this.dashboardService.getStats().subscribe(data => {
      this.stats = data; // Guardamos los datos en la variable
    });

    this.dashboardService.getActivity().subscribe(data => {
      this.activities = data;
    });
  }
}
