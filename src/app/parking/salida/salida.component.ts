import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModalContentComponent } from '../../shared/modal-content/modal-content.component';
import { ParkingService } from '../parking.service';
import { FormatoIngresoPipe} from '../../shared/pipe/formato-ingreso.pipe';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent implements OnInit {

  inputPlaca: string;
  inputTicket: string;
  camposVacios: boolean;

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private parkingServ:ParkingService, private formatoIngreso:FormatoIngresoPipe) { }

  ngOnInit() {
    this.clean();
  }

  private clean():void{
    this.inputPlaca = "";
    this.inputTicket = "";
    this.camposVacios = true;
  }

  public actualizaVacios(){
    if(this.inputPlaca.length>0 || this.inputTicket.length>0){
      this.camposVacios = false;
    }else{
      this.camposVacios = true;
    }
  }

  public registrarSalida(){

    let req = {
        "placa" : this.inputPlaca,
        "ticket" : this.inputTicket
    };

    this.parkingServ.salidaVehiculo(req).subscribe((resp:any) => {
      console.log(resp);
      let mensaje:string;
      let titulo:string;
      if(resp && resp.message && resp.message.length>0){
        mensaje = resp.message;
        titulo=':(';
      }else{
        mensaje = `Se registra salida de vehiculo con placa ${resp.placa}
                               ${this.formatoIngreso.transform(resp.fechaSalida)}
                    Valor a pagar: ${resp.valorPagar}`;
        titulo=':)';
      }
      
      const initialState = {
        msg: mensaje,
        title: titulo
      };    
      this.bsModalRef = this.modalService.show(ModalContentComponent, {class:"modal-dialog-centered",  initialState});
      this.bsModalRef.content.closeBtnName = 'Close';
      this.clean();
    });
  }

}
