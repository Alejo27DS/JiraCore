import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/Login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgFor], // Importamos NgFor para usarlo en el HTML]
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit {

  // Variables para guardar los datos que vienen del Backend
  stats: any;
  activities: any[] = [];

  constructor(private LoginService: LoginService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // Llamamos al API
    this.LoginService.getStats().subscribe(data => {
      this.stats = data; // Guardamos los datos en la variable
    });

    this.LoginService.getActivity().subscribe(data => {
      this.activities = data;
    });
  }
}
