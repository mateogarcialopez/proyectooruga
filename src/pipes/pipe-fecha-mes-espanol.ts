import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'fecha_mes_espanol'
})
  //retorna fecha en español introducir dd/mm/yyyy
  // yyyy/mm/dd => Mayo
export class fecha_mes_espanol implements PipeTransform {

  
    transform(value: string): Object {
      let fecha:any= new Date(value);
      fecha=fecha+"";
      fecha=fecha.split(" ");
      let oMes:any={
        "jan":"Enero",
        "feb":"Febrero",
        "mar":"Marzo",
        "apr":"Abril",
        "may":"Mayo",
        "jun":"Junio",
        "jul":"Julio",
        "aug":"Agosto",
        "sep":"Septiembre",
        "oct":"Octubre",
        "nov":"Noviembre",
        "dec":"Diciembre"
      }      
      return  (oMes[fecha[1].toLowerCase()]);
  
    }

  

  


 
}