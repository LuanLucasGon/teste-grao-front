import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly API_URL = 'https://api.meusite.com/restaurantes';
  private readonly USE_MOCK = true;

    private readonly mocksCategories: CategoryModel[] = [
      {
        id: "1",
        name: 'Japonesa',
        imageUrl: 'assets/images/categories/japonesa.png'
      },
      {
        id: "2",
        name: 'Mexicana',
        imageUrl: 'assets/images/categories/mexicana.png'
      },
      {
        id: "3",
        name: 'Pizza',
        imageUrl: 'assets/images/categories/pizza.png'
      },
      {
        id: "4",
        name: 'Churrasco',
        imageUrl: 'assets/images/categories/churrasco.png'
      },
      {
        id: "5",
        name: 'Brasileira',
        imageUrl: 'assets/images/categories/brasileira.png'
      }
    ];

  constructor(private http: HttpClient) { }

    getCategories(): Observable<CategoryModel[]> {
      return this.USE_MOCK
        ? of(this.mocksCategories).pipe(delay(500))
        : this.http.get<CategoryModel[]>(this.API_URL);
    }

}
