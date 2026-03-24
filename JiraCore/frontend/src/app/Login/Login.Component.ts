import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';                  
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Importamos lo necesario para formularios
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Definimos los campos del formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Esta función se ejecuta al hacer clic en "Ingresar"
  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor complete los campos correctamente.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      // --- AQUÍ ESTÁ EL CAMBIO QUE DEBES PEGAR ---
      next: (response) => {
        console.log('Login exitoso', response);
        
        // 1. GUARDAR EL ESTADO EN EL NAVEGADOR (Vital!)
        if (typeof window !== 'undefined') {
          localStorage.setItem('isLoggedIn', 'true');
        }

        // 2. Notificar al sistema para que actualice la vista
        this.router.navigate(['/dashboard']); 
      },
      // ------------------------------------------------------
      error: (err) => {
        this.errorMessage = 'Correo o contraseña incorrectos';
        console.error(err);
      }
    });
  }
}