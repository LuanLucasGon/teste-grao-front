import { Injectable } from '@angular/core';
import { DishesModel, RestaurantModel } from '../models/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, delay, distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
   private readonly API_URL = 'http://localhost:3000/restaurants';
  private readonly USE_MOCK = false;

  private readonly mockRestaurants: RestaurantModel[] = [
    {
      _id: "1",
      name: 'Restaurante sem futuro',
      category: "Comida Brasileira",
      address: "Rua não existe, 123",
      phone:"34112345678",
      rating: "5.0",
      description: 'Ao ponto! Aqui agora É refresco Bão Tché!',
      iconUrl: 'assets/images/restaurant1.png',
      coverUrl: "assets/images/coverphotos/cover1.png",
      dishes: [
        { id: '1', name: 'Strogonoff', description: 'Carne, arroz, batata frita', price: "21.21", imageUrl: 'assets/images/restaurant1.png' },
        { id: '2',name: 'Bife a cavalo', description: 'Bife, ovo, arroz', price: "25.20", imageUrl: 'assets/images/bife-a-cavalo.jpg' },
        { id: '3', name: 'Arroz carreteiro', description: 'Arroz, carnes variadas', price: "25.00", imageUrl: 'assets/images/arroz-carreteiro.jpg' },
        { id: '4', name: 'Galinhada', description: 'Arroz, frango', price: "15.00", imageUrl: 'assets/images/galinhada.jpg' },
        { id: '5', name: 'Executivo', description: 'Arroz, feijão, bife, purê', price: "21.21", imageUrl: 'assets/images/executivo.jpg' }
      ]
    },
    {
      _id: "2",
      name: 'Restaurante sem futuro',
      category: "Comida Brasileira",
      address: "Rua não existe, 123",
      phone:"34112345678",
      rating: "5.0",
      description: 'Ao ponto! Aqui agora É refresco Bão Tché!',
      iconUrl: 'assets/images/restaurant1.png',
      coverUrl: "assets/images/coverphotos/cover1.png",
      dishes: [
        { id: '1', name: 'Strogonoff', description: 'Carne, arroz, batata frita', price: "21.21", imageUrl: 'assets/images/strogonoff.jpg' },
        { id: '2',name: 'Bife a cavalo', description: 'Bife, ovo, arroz', price: "25.20", imageUrl: 'assets/images/bife-a-cavalo.jpg' },
        { id: '3', name: 'Arroz carreteiro', description: 'Arroz, carnes variadas', price: "25.00", imageUrl: 'assets/images/arroz-carreteiro.jpg' },
        { id: '4', name: 'Galinhada', description: 'Arroz, frango', price: "15.00", imageUrl: 'assets/images/galinhada.jpg' },
        { id: '5', name: 'Executivo', description: 'Arroz, feijão, bife, purê', price: "21.21", imageUrl: 'assets/images/executivo.jpg' }
      ]
    },
    {
      _id: "3",
      name: 'Restaurante sem futuro',
      category: "Comida Brasileira",
      address: "Rua não existe, 123",
      phone:"34112345678",
      rating: "5.0",
      description: 'Ao ponto! Aqui agora É refresco Bão Tché!',
      iconUrl: 'assets/images/restaurant1.png',
      coverUrl: "assets/images/coverphotos/cover1.png",
      dishes: [
        { id: '1', name: 'Strogonoff', description: 'Carne, arroz, batata frita', price: "21.21", imageUrl: 'assets/images/strogonoff.jpg' },
        { id: '2',name: 'Bife a cavalo', description: 'Bife, ovo, arroz', price: "25.20", imageUrl: 'assets/images/bife-a-cavalo.jpg' },
        { id: '3', name: 'Arroz carreteiro', description: 'Arroz, carnes variadas', price: "25.00", imageUrl: 'assets/images/arroz-carreteiro.jpg' },
        { id: '4', name: 'Galinhada', description: 'Arroz, frango', price: "15.00", imageUrl: 'assets/images/galinhada.jpg' },
        { id: '5', name: 'Executivo', description: 'Arroz, feijão, bife, purê', price: "21.21", imageUrl: 'assets/images/executivo.jpg' }
      ]
    },
    {
      _id: "4",
      name: 'Restaurante sem futuro',
      category: "Comida Brasileira",
      address: "Rua não existe, 123",
      phone:"34112345678",
      rating: "5.0",
      description: 'Ao ponto! Aqui agora É refresco Bão Tché!',
      iconUrl: 'assets/images/restaurant1.png',
      coverUrl: "assets/images/coverphotos/cover1.png",
      dishes: [
        { id: '1', name: 'Strogonoff', description: 'Carne, arroz, batata frita', price: "21.21", imageUrl: 'assets/images/strogonoff.jpg' },
        { id: '2',name: 'Bife a cavalo', description: 'Bife, ovo, arroz', price: "25.20", imageUrl: 'assets/images/bife-a-cavalo.jpg' },
        { id: '3', name: 'Arroz carreteiro', description: 'Arroz, carnes variadas', price: "25.00", imageUrl: 'assets/images/arroz-carreteiro.jpg' },
        { id: '4', name: 'Galinhada', description: 'Arroz, frango', price: "15.00", imageUrl: 'assets/images/galinhada.jpg' },
        { id: '5', name: 'Executivo', description: 'Arroz, feijão, bife, purê', price: "21.21", imageUrl: 'assets/images/executivo.jpg' }
      ]
    }
  ];

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<RestaurantModel[]> {
    return this.USE_MOCK
    ? of(this.mockRestaurants).pipe(delay(500))
    : this.http.get<{ restaurants: RestaurantModel[] }>(this.API_URL).pipe(
        map(response => response.restaurants)
      );
  }

  getRestaurantById(id: string): Observable<RestaurantModel | undefined> {
    return this.USE_MOCK
    ? of(this.mockRestaurants.find(r => r._id === id)).pipe(delay(300))
    : this.http.get<{ restaurants: RestaurantModel }>(`${this.API_URL}/${id}`).pipe(
        map(response => response.restaurants ?? undefined)
      );
  }

  getRestaurantItem(id: string): Observable<DishesModel[] | undefined> {
    return this.http.get<{ items: DishesModel[] }>(`${this.API_URL}/items/${id}`).pipe(
        map(response => response.items ?? undefined)
      );
  }

  searchRestaurant(query: string): Observable<any[]> {
    if (!query.trim()) {
      return of([]);
    }

    const teste =  this.http.get<{ restaurants: any[] }>(`${this.API_URL}/search/${query}`).pipe(
      map(response => response.restaurants ?? undefined)
    );

    return teste;
  }
}
