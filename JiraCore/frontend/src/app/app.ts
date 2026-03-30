import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './Login/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bpm-wireframe';

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  get isRrhhPage(): boolean {
    return this.router.url.includes('/rrhh-panel');
  }

  // --- CORRECCIÓN AQUÍ: Debe buscar 'tecnologia', no 'rrhh-panel' ---
  get isTecnologiaPage(): boolean {
    return this.router.url.includes('/tecnologia');
  }
  // ------------------------------------------------------------------

  // Getter para verificación de roles (opcional pero recomendado)
  //get isTecnologia(): boolean {
  //  const user = this.authService.userSubject.value;
    // Asegúrate de que tu base de datos devuelve el rol exacto ('Tecnología', 'Tech', etc.)
  //  return user?.rol === 'Tecnologia';
 // }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
