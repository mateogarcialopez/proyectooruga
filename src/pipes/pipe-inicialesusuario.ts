import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'inicialesnombre'
})
  //retorna año, meses, dia, minutos,segundos
  //this.ServicesProvider.remainingDate("2019/05/20 20:00:00") yyyy-mm-dd

export class inicialesnombre implements PipeTransform {

    transform(value: string): any {
        let nombre=value.trim().split(" ");
        if(nombre.length==4){
          return nombre[0][0].toUpperCase()+nombre[2][0].toUpperCase();
        }
        else if(nombre.length==3 || nombre.length==2){
          return nombre[0][0].toUpperCase()+nombre[1][0].toUpperCase();
        }
        else if(nombre.length==5){
          return nombre[0][0].toUpperCase()+nombre[3][0].toUpperCase();
        }
    }
}