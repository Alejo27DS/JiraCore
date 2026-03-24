import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    standalone: true,
  imports: [CommonModule, RouterModule], // Importamos RouterModule para que funcionen los enlaces
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    constructor(private router: Router) {}

    logout() {
    alert('Sesión cerrada'); // Aquí borrarías el token
    this.router.navigate(['/login']);
    }
}