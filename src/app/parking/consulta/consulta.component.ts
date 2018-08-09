import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  vehiculos:MatTableDataSource<any>;
  longitud=0;
  displayedColumns: string[] = ['ticket' , 'placa', 'tipo', 'fechaIngreso'];
  constructor(private parkingServ:ParkingService) { }

  ngOnInit() {
    
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.loadVehiculos();
    this.vehiculos.paginator = this.paginator;
    this.vehiculos.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.vehiculos.filter = filterValue;
  }
  loadVehiculos():void{
    this.longitud=0;
    this.vehiculos = new MatTableDataSource([]);
    this.parkingServ.consultaVehiculos().subscribe((data:any)=>{
      this.vehiculos = new MatTableDataSource(data);
      this.vehiculos.sort = this.sort;
      this.longitud = data.length;
    });
  }
}
