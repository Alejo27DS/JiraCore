import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Login.Component.html',
  styleUrl: './Login.Component.css'
  // styleUrls eliminados para evitar errores
})
export class LoginComponent {
  // Variables vacías al inicio
  email = '';
  password = '';
  rememberMe = false;

  // Inyectamos el Router
  constructor(private router: Router) { }

  // Función que se ejecuta al dar clic en el botón
  onLogin() {
    console.log('Intentando login con:', this.email);

    if (this.email && this.password) {
      // Verificamos si estamos en el navegador
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
      }
      this.router.navigate(['/dashboard']);
    }
    else {
      alert("Porfavor ingresa usuario y contraseña")
    }
  }
}

