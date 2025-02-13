import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { RestaurantDetailsComponent } from './pages/restaurant-details/restaurant-details.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'restaurant/:id', component: RestaurantDetailsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];
