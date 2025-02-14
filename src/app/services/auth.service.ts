import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/auth';
  
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.API_URL}/login`, body);
  }

  register(name: string, cpf: string, email: string, password: string, confirmPassword: string): Observable<any> {
    const body = { name, cpf, email, password, confirmPassword };
    return this.http.post<any>(`${this.API_URL}/register`, body);
  }
}
