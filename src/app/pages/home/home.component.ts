import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RestaurantModel } from '../../models/restaurant.model';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../services/restaurant-service';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  restaurants: RestaurantModel[] = [];
  categories: CategoryModel[] = [];

  constructor(private restaurantService: RestaurantService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((data) => {
      this.restaurants = data;
    });

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
