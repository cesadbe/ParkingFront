import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', loadChildren: './parking/parking.module#ParkingModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);