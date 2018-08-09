import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { ParkingService } from '../parking.service';
import { ModalContentComponent } from '../../shared/modal-content/modal-content.component';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {
  bsModalRef: BsModalRef;

  esMotocicleta: boolean;
  tipoVehiculo: string;
  cilindraje: string;

  ingresoForm: FormGroup;
  matcher: ErrorStateMatcher;

  constructor(private modalService: BsModalService, private parkingServ:ParkingService) { }

  ngOnInit() {
    this.createForm();
    this.triggerValidations();
    this.default();
  }

  private default(){
    this.ingresoForm.reset();
    this.esMotocicleta = false;
    this.tipoVehiculo = "C";
    this.ingresoForm.get('cilindraje').setValue('1599');
  }

  private createForm():void{
    this.ingresoForm = new FormGroup({
      placa: new FormControl('', Validators.required),
      cilindraje: new FormControl('', Validators.required),
    });
    this.matcher = new ErrorStateMatcher();    
  }

  private triggerValidations():void{
    Object.keys(this.ingresoForm.controls).forEach(field => {
      const control = this.ingresoForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
  

  changeTipoVehiculo(tipoVehiculo: string): void{
    this.tipoVehiculo = tipoVehiculo;
    if(tipoVehiculo=="M"){
      this.ingresoForm.get('cilindraje').setValue('');
      this.esMotocicleta=true;
    }else if(tipoVehiculo=="C"){
      this.ingresoForm.get('cilindraje').setValue('1599');
      this.esMotocicleta=false;
    }
  }


  registrarIngreso(): void{    
    let req = {
      "vehiculo" : {
        "placa" : this.ingresoForm.get('placa').value,
        "tipo" : this.tipoVehiculo,
        "cilindraje" : this.ingresoForm.get('cilindraje').value
      }
    };

    this.parkingServ.ingresoVehiculo(req).subscribe((resp:any) => {
      console.log(resp);
      let mensaje:string;
      let titulo:string;
      if(resp && resp.message && resp.message.length>0){
        mensaje = resp.message;
        titulo=":(";
      }else{
        mensaje = "Se registra ingreso con el número de ticket " + resp.ticket;
        titulo=":)";
      }
      
      const initialState = {
        msg: mensaje,
        title: titulo
      };    
      this.bsModalRef = this.modalService.show(ModalContentComponent, {class:"modal-dialog-centered",  initialState});
      this.bsModalRef.content.closeBtnName = 'Close';
      this.default();
    });
  }

}
