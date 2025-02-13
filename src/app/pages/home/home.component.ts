import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RestaurantModel } from '../../models/restaurant.model';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../services/restaurant-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  restaurants: RestaurantModel[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((data) => {
      this.restaurants = data;
    });
  }
}
