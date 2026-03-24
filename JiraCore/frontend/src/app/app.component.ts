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
  isAdmin: boolean =false

  constructor(private router: Router) {
    if (typeof window !== 'undefined') {
      this.isLoggedIn = !!localStorage.getItem('isLoggedIn');


      const userEmail = localStorage.getItem('UserEmail');
      if (userEmail === 'admin@bpm.com') {
        this.isAdmin = true;
      }
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const userEmail = localStorage.getItem('UserEmail');
        this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
        this.isAdmin = (userEmail === 'admin@bpm.com');
      }
    });
  }
  // ... resto del código (logout, etc)

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
