import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bpm-wireframe';
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router) {
    if (typeof window !== 'undefined') {
      this.isLoggedIn = !!localStorage.getItem('isLoggedIn');

      // --- AGREGA ESTA LÓGICA ---
      const userEmail = localStorage.getItem('UserEmail');
      if (userEmail === '') {
        this.isAdmin = true;
      }
    }
  }
  // ... resto del código (logout, etc)

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
    }

    this.router.navigate([""]);
  }
}
