import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  url:string = 'http://localhost:8080';
  pathIngresoParqueadero:string = '/api/ingreso';
  patchConsultaVehiculos:string = '/api/consulta';

  constructor(private http: HttpClient) { }

  ingresoVehiculo(vehiculo:any){
    return this.http.post(this.url+this.pathIngresoParqueadero, vehiculo);
  }

  consultaVehiculos(){
    return this.http.get(this.url+this.patchConsultaVehiculos);
  }
}
