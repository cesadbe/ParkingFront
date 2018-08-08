import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  vehiculos;
  displayedColumns: string[] = ['NO', 'ticket' , 'placa', 'tipo', 'fechaIngreso'];
  constructor(private parkingServ:ParkingService) { }

  ngOnInit() {
    this.vehiculos = new MatTableDataSource([]);
    this.loadVehiculos();
  }

  loadVehiculos():void{
    this.parkingServ.consultaVehiculos().subscribe((data:any)=>{
      this.vehiculos = new MatTableDataSource(data);
      this.vehiculos.sort = this.sort;
      console.log(this.vehiculos);
    });
  }
}
