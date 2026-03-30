import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './Login/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bpm-wireframe';

  // Aquí inyectamos el Router
  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  // --- ESTO ESTÁ DENTRO DE LA CLASE ---
  // Este getter detecta si la URL incluye rrhh-panel
  get isRrhhPage(): boolean {
    return this.router.url.includes('/rrhh-panel');
  }
  get isTecnologiaPage(): boolean {
    return this.router.url.includes('/tecnologia');
  }

  logout() {
    this.authService.logout();
    this.router.navigate([""]);
  }
}
