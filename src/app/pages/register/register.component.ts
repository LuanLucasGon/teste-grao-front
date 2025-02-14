import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = '';
  cpf: string ='';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  errorMessage: string = "";
  registerError = false;
  router = inject(Router);

  constructor(private authService: AuthService){}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.authService.register(this.name, this.cpf, this.email, this.password, this.confirmPassword).subscribe({
      next: (response) => {

        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userName', response.name);
        }
  
        this.errorMessage = '';
        this.registerError = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Erro no login:", err);
        this.registerError = true;
        this.errorMessage = err.error?.msg || "Erro ao fazer login. Verifique suas credenciais.";
      }
    });
  }
}
