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
  faMapMarker = faMapMarkerAlt;
  faPhone = faPhone;
  faStar = faStar;

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService) {
    const restaurantId = this.route.snapshot.paramMap.get('id');
    if (restaurantId) {
      this.restaurantService.getRestaurantById(restaurantId).subscribe((data) => {
        if (data) {
          this.restaurant = data;
        } else {
          console.error('Nenhum restaurante encontrado.');
        }
      });
    }
    console.log(`Carregando detalhes do restaurante ID: ${restaurantId}`);
  }
}
