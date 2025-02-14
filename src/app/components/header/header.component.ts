import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faSearch = faSearch;
  @Input() logoPath: string = 'assets/images/logo.png';
  @Input() siteName: string = 'Quem tem boca';
  isLoggedIn = false;
  username: string | null = '';

  constructor(private router: Router) {}

  searchQuery: string = '';

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('userName');

    if (token) {
      this.isLoggedIn = true;
      this.username = storedUsername || 'Usuário';
    }
  }

  onSearch(): void {
    console.log('Pesquisando por:', this.searchQuery);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
