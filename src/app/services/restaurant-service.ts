import { Injectable } from '@angular/core';
import { RestaurantModel } from '../models/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private readonly API_URL = 'https://api.meusite.com/restaurantes';
  private readonly USE_MOCK = true;

  private readonly mockRestaurants: RestaurantModel[] = [
    {
      id: "1",
      name: 'Restaurante sem futuro',
      address: "Rua não existe, 123",
      phone:"34112345678",
      description: 'Ao ponto! Aqui agora É refresco Bão Tché!',
      imageUrl: 'assets/images/restaurant1.png'
    },
    {
      id: "2",
      name: 'Fátia da tia Fátime',
      address: "Rua não existe, 123",
      phone:"34112345678",
      description: 'Fátima',
      imageUrl: 'assets/images/restaurant2.png'
    },
    {
      id: "3",
      name: 'Restaurante sem futuro',
      address: "Rua não existe, 123",
      phone:"34112345678",
      description: 'Ao ponto! Aqui agora É refresco Bão Tché!',
      imageUrl: 'assets/images/restaurant1.png'
    },
    {
      id: "4",
      name: 'Fátia da tia Fátime',
      address: "Rua não existe, 123",
      phone:"34112345678",
      description: 'Fátima',
      imageUrl: 'assets/images/restaurant2.png'
    }
  ];

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<RestaurantModel[]> {
    return this.USE_MOCK
      ? of(this.mockRestaurants).pipe(delay(500))
      : this.http.get<RestaurantModel[]>(this.API_URL);
  }

  getRestaurantById(id: string): Observable<RestaurantModel | undefined> {
    return this.USE_MOCK
      ? of(this.mockRestaurants.find(r => r.id === id)).pipe(delay(300))
      : this.http.get<RestaurantModel>(`${this.API_URL}/${id}`);
  }
}
