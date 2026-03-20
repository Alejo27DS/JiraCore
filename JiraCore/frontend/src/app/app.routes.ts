import { Routes } from '@angular/router'; 
import { DashboardComponent } from './Dashboard/Dashboard.Component';
import { LoginComponent } from './Login/Login.Component';
import { NominaComponent } from './Nomina/Nomina.Component';
import { AjustesNominaComponent } from './Nomina/Ajustes/AjustesNomina.Component';
import { BonoNominaComponent } from './Nomina/Bono/BonoNomina.Component';
import { AuxilioRodamientoComponent } from './Nomina/AuxilioRodamiento/AuxilioRodamiento.Component';
import { DescuentoNominaComponent } from './Nomina/Descuento/DescuentoNomina.Component';
import { CesantiasComponent } from './Nomina/Cesantias/Cesantias.Component';
import { SolicitudesComponent } from './Solicitudes/Solicitudes.Component';
import { RetiroComponent } from './RetiroPersonal/Retiro.Component';
import { CitasSSTComponent } from './SST/CitasSST.Component';



export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nomina', component: NominaComponent },
  { path: 'nomina-ajustes', component: AjustesNominaComponent },
  { path: 'nomina-bono', component: BonoNominaComponent },
  { path: 'nomina-auxiliorodamiento', component: AuxilioRodamientoComponent },
  { path: 'nomina-descuento', component: DescuentoNominaComponent },
  { path: 'nomina-cesantias', component: CesantiasComponent },
  { path: 'solicitudes', component: SolicitudesComponent },
  { path: 'retiro', component: RetiroComponent },
  { path: 'sst', component: CitasSSTComponent },

];
