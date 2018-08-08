import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './parking.routing'
import { IngresoComponent } from './ingreso/ingreso.component';
import { SalidaComponent } from './salida/salida.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    routing
  ],
  declarations: [IngresoComponent, SalidaComponent, ConsultaComponent, HomeComponent]
})
export class ParkingModule { }
