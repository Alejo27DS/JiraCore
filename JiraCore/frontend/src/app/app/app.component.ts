import { Component } from '@angular/core';
// 1. Importamos estas dos cosas del Router
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  // 2. Asegúrate de que 'standalone' esté en true
  standalone: true,
  // 3. Agregamos RouterOutlet y RouterLink aquí
  imports: [
    RouterOutlet,
    RouterLink
  ],
  // 4. Verifica que apunte a tu archivo 'app.html'
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent { 
  title = 'bpm-wireframe';
}
