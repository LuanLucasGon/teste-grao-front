import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  loginError = false;
  router = inject(Router);
  errorMessage: string = "";

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(private authService: AuthService) {
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {

        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userName', response.name);
        }
  
        this.errorMessage = '';
        this.loginError = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error("Erro no login:", err);
        this.loginError = true;
        this.errorMessage = err.error?.msg || "Erro ao fazer login. Verifique suas credenciais.";
      }
    });
  }
}
