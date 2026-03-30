import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor complete los campos correctamente.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log("Login exitoso", response);

        if (typeof window !== 'undefined') {
          localStorage.setItem('isLoggedIn', 'true');
        }

        // --- REDIRECCIÓN SEGÚN ROL ---
        const rol = response.rol;

        if (rol === 'RRHH') {
          this.router.navigate(['/rrhh-panel']);

        } else if (rol === 'ADMIN') {
          this.router.navigate(['/admin-panel']);

        } else if (rol === 'TECNOLOGIA') { // <--- AGREGADO ESTO
          this.router.navigate(['/tecnologia']); // Redirige a Tecnología

        } else {
          // Usuario Normal
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Correo o contraseña incorrectos';
        console.error(err);
      }
    });
  }
}
