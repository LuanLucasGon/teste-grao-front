import { Injectable } from '@angular/core';
import { MenuModel } from '../models/menu.model';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly API_URL = 'https://api.meusite.com/restaurantes';
  private readonly USE_MOCK = true;

  private readonly mocksMenu: MenuModel[] = [
    {
      id: "1",
      title: 'Shushi',
      subtitle: "Takaro!",
      price: "R$ 100,00",
      imageUrl: 'assets/images/categories/japonesa.png'
    },
    {
      id: "2",
      title: 'Tacos',
      subtitle: "É refresco",
      price: "R$ 100,00",
      imageUrl: 'assets/images/categories/mexicana.png'
    },
    {
      id: "3",
      title: 'Churrasco',
      subtitle: "Ao ponto!",
      price: "R$ 100,00",
      imageUrl: 'assets/images/categories/churrasco.png'
    },
  ];

  constructor(private http: HttpClient) { }

  getMenu(): Observable<MenuModel[]> {
    return this.USE_MOCK
      ? of(this.mocksMenu).pipe(delay(500))
      : this.http.get<MenuModel[]>(this.API_URL);
  }
}
