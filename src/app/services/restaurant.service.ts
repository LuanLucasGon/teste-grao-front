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
      id: "2",
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
      id: "3",
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
      id: "4",
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
      : this.http.get<RestaurantModel[]>(this.API_URL);
  }

  getRestaurantById(id: string): Observable<RestaurantModel | undefined> {
    return this.USE_MOCK
      ? of(this.mockRestaurants.find(r => r.id === id)).pipe(delay(300))
      : this.http.get<RestaurantModel>(`${this.API_URL}/${id}`);
  }
}
