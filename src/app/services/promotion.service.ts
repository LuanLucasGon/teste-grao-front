import { Injectable } from '@angular/core';
import { PromotionModel } from '../models/promotion.model';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private readonly API_URL = 'https://api.meusite.com/restaurantes';
  private readonly USE_MOCK = true;

  private readonly mocksPromotions: PromotionModel[] = [
    {
      id: "1",
      title: 'Macarrão na Chapa',
      price: "R$ 26,90",
      imageUrl: 'assets/images/promotions/macarrao.jpg'
    },
    {
      id: "2",
      title: 'Macarrão na Chapa',
      price: "R$ 26,90",
      imageUrl: 'assets/images/promotions/macarrao.jpg'
    },
    {
      id: "3",
      title: 'Macarrão na Chapa',
      price: "R$ 26,90",
      imageUrl: 'assets/images/promotions/macarrao.jpg'
    }
  ];

  constructor(private http: HttpClient) { }

  getPromotions(): Observable<PromotionModel[]> {
    return this.USE_MOCK
      ? of(this.mocksPromotions).pipe(delay(500))
      : this.http.get<PromotionModel[]>(this.API_URL);
  }
}
