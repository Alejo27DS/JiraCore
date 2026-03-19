import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router'; 
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'bpm-wireframe';

  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    // 1. Estado inicial
    if (typeof window !== 'undefined') {
      this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
    }

    this.router.events.subscribe((event) => {
      // Solo reaccionamos cuando la navegación termina completamente
      if (event instanceof NavigationEnd) {
     
        if (typeof window !== 'undefined') {
          this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
        }
      }
    });
  }

  logout() {
    // 1. Borramos la sesión
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
    }

    // 2. Actualizamos la variable inmediatamente para que el sidebar desaparezca YA
    this.isLoggedIn = false;

    // 3. Redirigimos
    this.router.navigate(['']);
  }
}
