import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoIngreso'
})
export class FormatoIngresoPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let fecha:Date = new Date(value);
    //"2018-08-08T19:54:00.000+0000";
    let fechaStr:string = fecha.toLocaleString();
    return fechaStr.substring(0,fechaStr.length-3);
  }

}
