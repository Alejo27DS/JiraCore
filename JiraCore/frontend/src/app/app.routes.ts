import { Routes } from '@angular/router'; 
import { DashboardComponent } from './Dashboard/Dashboard.Component';
import { LoginComponent } from './Login/Login.Component';
import { NominaComponent } from './Nomina/Nomina.Component';
import { AjustesNominaComponent } from './Nomina/AjustesNomina.Component';
import { BonoNominaComponent } from './Nomina/BonoNomina.Component';
import { AuxilioRodamientoComponent } from './Nomina/AuxilioRodamiento.Component';
import { DescuentoNominaComponent } from './Nomina/DescuentoNomina.Component';
import { CesantiasComponent } from './Nomina/Cesantias.Component';



export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nomina', component: NominaComponent },
  { path: 'nomina/ajustes', component: AjustesNominaComponent },
  { path: 'nomina/bono', component: BonoNominaComponent },
  { path: 'nomina/auxiliorodamiento', component: AuxilioRodamientoComponent },
  { path: 'nomina/descuento', component: DescuentoNominaComponent },
  { path: 'nomina/cesantias', component: CesantiasComponent },

];
