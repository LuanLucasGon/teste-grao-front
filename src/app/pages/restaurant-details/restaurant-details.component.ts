import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faMapMarkerAlt, faPhone, faStar } from '@fortawesome/free-solid-svg-icons';
import { RestaurantService } from '../../services/restaurant.service';
import { RestaurantModel } from '../../models/restaurant.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-restaurant-details',
  imports: [CommonModule, FontAwesomeModule, HeaderComponent],
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss'
})
export class RestaurantDetailsComponent {
  restaurant: any = {};
  dishes: any = [];
  faMapMarker = faMapMarkerAlt;
  faPhone = faPhone;
  faStar = faStar;
  restaurantId: string | null;

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService) {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.restaurantId) {
      this.restaurantService.getRestaurantById(this.restaurantId).subscribe((data) => {
        if (data) {
          this.restaurant = data;
        } else {
          console.error('Nenhum restaurante encontrado.');
        }
      });

      this.restaurantService.getRestaurantItem(this.restaurantId).subscribe((data) => {
        if (data) {
          this.dishes = data;
        } else {
          console.error('Nenhum restaurante encontrado.');
        }
      });
    }

  }
}
