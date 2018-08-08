
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component'
import { ConsultaComponent } from './consulta/consulta.component'
import { IngresoComponent } from './ingreso/ingreso.component'
import { SalidaComponent } from './salida/salida.component'

export const routes: Routes = [
  { path: '', component: HomeComponent }, // default route of the module
  { path: 'ingreso', component: IngresoComponent },
  { path: 'consulta', component: ConsultaComponent },
  { path: 'salida', component: SalidaComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);