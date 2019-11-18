import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'fechanormal'
})
  //retorna fecha en  yyyy/mm/dd hh:mm:ss a partir de fecha con T
  //this.ServicesProvider.remainingDate("2019/05/20 20:00:00") yyyy-mm-dd
  //retorna  Miércoles 29 de Mayo de 2019, 20:00
export class fechanormal implements PipeTransform {

    transform(value: string): Object {

      let fecha_formato_T=value.split("T");

      if(fecha_formato_T.length>1){
        let hora_t=fecha_formato_T[1].split(".");
        let fecha=fecha_formato_T[0].split("-");
        value=fecha[2]+"/"+fecha[1]+"/"+fecha[0]+ " "+hora_t[0];
      }
      return value;
  
    }


}