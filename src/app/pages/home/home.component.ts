import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RestaurantModel } from '../../models/restaurant.model';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../services/restaurant.service';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/category.model';
import { PromotionModel } from '../../models/promotion.model';
import { PromotionService } from '../../services/promotion.service';
import { MenuModel } from '../../models/menu.model';
import { MenuService } from '../../services/menu.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  restaurants: RestaurantModel[] = [];
  categories: CategoryModel[] = [];
  promotions: PromotionModel[] = [];
  menuItens: MenuModel[] = [];

  constructor(private restaurantService: RestaurantService, private categoryService: CategoryService, private promotionService: PromotionService, private menuService: MenuService) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((data) => {
      console.log(data);
      this.restaurants = data;
    });

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    this.promotionService.getPromotions().subscribe((data) => {
      this.promotions = data;
    });

    this.menuService.getMenu().subscribe((data) => {
      this.menuItens = data;
    });

  }
}
