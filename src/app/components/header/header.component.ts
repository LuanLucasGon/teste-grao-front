import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faSearch = faSearch;
  isLoggedIn = false;
  username: string | null = '';
  searchResults: any[] = [];
  query: string = '';
  showDropdown = false;

  constructor(private router: Router, private restaurantService: RestaurantService) {}

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('userName');

    if (token) {
      this.isLoggedIn = true;
      this.username = storedUsername || 'Usuário';
    }
  }

  onSearch(): void {
    this.restaurantService.searchRestaurant(this.query).subscribe(results => {
      this.searchResults = results;
      this.showDropdown = true;
    });
  }

  hideDropdownWithDelay(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  goToDetail(item: any) {
    this.router.navigate([`/restaurant/${item}`]);
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
