import { Routes } from '@angular/router'; 
import { DashboardComponent } from './Dashboard/Dashboard.Component';
import { LoginComponent } from './Login/Login.Component';
// ... importa los demás

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },

];
