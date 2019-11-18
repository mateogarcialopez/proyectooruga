import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'fechaespanol'
})
  //retorna fecha en español introducir dd/mm/yyyy | yyyy/mm/dd hh:mm:ss o 2 fechas: yyyy/mm/dd hh:mm:ss yyyy/mm/dd hh:mm:ss
  //si son iguales las 2 fechas pero no las hora la salida es al estilo Miércoles 29 de Mayo ( 08:00 am - 09:00 pm)o si no retorna  Miércoles 29 de Mayo ( 08:00 am) -  jueves 30 de Mayo ( 08:00 am)
  //retorna  Miércoles 29 de Mayo ( 08:00 am)
export class fechaespanol implements PipeTransform {
    //convertir fecha al formato yyyy-mm-dd hh:mm
    parseDate(value:any){
      let hora:any;
      let fecha_formato_T=value.split("T");
      


      if(fecha_formato_T.length>1){
        let hora_t=fecha_formato_T[1].split(".");
        let fecha=fecha_formato_T[0].split("-");
        value=fecha[2]+"/"+fecha[1]+"/"+fecha[0]+ " "+hora_t[0];
      }
      hora=value.split(" ");
      if(hora.length>1){
        var  fecha_entrante:any=hora[0].split("/");
        if(fecha_entrante[2].length>2){
          fecha_entrante = fecha_entrante[0]+"/"+fecha_entrante[1]+"/"+fecha_entrante[2];
        }
        else{
          fecha_entrante = fecha_entrante[2]+"/"+fecha_entrante[1]+"/"+fecha_entrante[0];
    
        }

        hora=hora[1].split(":");
        hora=hora[0]+":"+hora[1];

      }
      else{
        var  fecha_entrante:any=hora[0].split("/");
        if(fecha_entrante[2].length>2){
          fecha_entrante = fecha_entrante[0]+"/"+fecha_entrante[1]+"/"+fecha_entrante[2];
        }
        else{
          fecha_entrante = fecha_entrante[2]+"/"+fecha_entrante[1]+"/"+fecha_entrante[0];
    
        }

        hora="";
      }
      fecha_entrante=fecha_entrante.split("/");
      let fecha:any= new Date(fecha_entrante[2]+"/"+fecha_entrante[1]+"/"+fecha_entrante[0]);
      fecha=fecha+"";
      fecha=fecha.split(" ");

      return { "fecha":fecha ,"hora": hora}
    }


    fn_horaToAmPm(hora:any){
      hora=hora.split(":");  //8:30:00
      let inicioHora:any=parseInt(hora[0]);  //8
      if(inicioHora==0){
        
        inicioHora=
        {
          "hora":"12"+":"+hora[1], //30
          "tipo":"a.m"
        };
      }
      else if(inicioHora==12){
        inicioHora=inicioHora-12;
        inicioHora=
        {
          "hora":"12"+":"+hora[1],//30
          "tipo":"p.m"
        };
      }

      else if(inicioHora>12){
        inicioHora=inicioHora-12;
        inicioHora=
        {
          "hora":inicioHora+":"+hora[1],//30
          "tipo":"p.m"
        };
      }
      else{
        inicioHora=
        {
          "hora":inicioHora+":"+hora[1],//30
          "tipo":"a.m"
        };
      }
      return inicioHora;
    }



    transform(value: string,mostar_hora?:string): Object {


      
      if(value){


        //esto es para fechas duplicadas
        //yyyy/mm/dd hh:mm:ss yyyy/mm/dd hh:mm:ss
        let bFechasDuplicadas=false;
        let aFechasDuplicadas=value.split(" ");
        let horasFechasduplicadas:any="";
        let bFechasMultiples=false; //determina si vienen 2 fechas
        if(aFechasDuplicadas.length==4){
          bFechasMultiples=true;
          horasFechasduplicadas=aFechasDuplicadas[1]+"-"+aFechasDuplicadas[3]; //las horas de la fecha duplicada
          if(aFechasDuplicadas[0]==aFechasDuplicadas[2]){
            bFechasDuplicadas=true;
            //value=aFechasDuplicadas[0];
          }
          
        }
        if(bFechasMultiples){
          let fechas=value.split(" ");

          var fecha1:any=this.parseDate(fechas[0]+" "+fechas[1]);
          var fecha2:any=this.parseDate(fechas[2]+" "+fechas[3]);
        }
        else{
          var fecha1:any=this.parseDate(value);

        }

        

    
        let oDias:any={
          "tue":"Martes",
          "wed":"Miércoles",
          "thu":"Jueves",
          "fri":"Viernes",
          "sat":"Sabado",
          "mon": "Lunes",
          "sun":"Domingo"
        }
    
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
        //      return  (oDias[fecha[0].toLowerCase()]+" "+ fecha[2]+" de "+ oMes[fecha[1].toLowerCase()]+" de "+ fecha[3]) + ", "+ (hora);
        if(mostar_hora){
          if(mostar_hora=='no_hora'){
            return  (oDias[fecha1.fecha[0].toLowerCase()]+" "+ fecha1.fecha[2]+" de "+ oMes[fecha1.fecha[1].toLowerCase()]) ;
          }
          else{

            let inicioHora=this.fn_horaToAmPm(fecha1.hora);
            if(bFechasMultiples){
              let inicioHora2=this.fn_horaToAmPm(fecha2.hora);
              return  (oDias[fecha1.fecha[0].toLowerCase()]+" "+ fecha1.fecha[2]+" de "+ oMes[fecha1.fecha[1].toLowerCase()]) + " ("+ (inicioHora.hora+ " "+inicioHora.tipo)+")" + " - "+
               (oDias[fecha2.fecha[0].toLowerCase()]+" "+ fecha2.fecha[2]+" de "+ oMes[fecha2.fecha[1].toLowerCase()]) + " ("+ (inicioHora2.hora+ " "+inicioHora2.tipo)+")";
            }
            else{
              return  (oDias[fecha1.fecha[0].toLowerCase()]+" "+ fecha1.fecha[2]+" de "+ oMes[fecha1.fecha[1].toLowerCase()]) + " ("+ (inicioHora.hora+ " "+inicioHora.tipo)+")";
            }

            
          }
        }
        else{
          if(bFechasDuplicadas){  
            let aHoras=[];
            horasFechasduplicadas=horasFechasduplicadas.split("-");
            for(var i in horasFechasduplicadas){

              let inicioHora=this.fn_horaToAmPm(horasFechasduplicadas[i]);
              aHoras.push(inicioHora);
            }


            return  (oDias[fecha1.fecha[0].toLowerCase()]+" "+ fecha1.fecha[2]+" de "+ oMes[fecha1.fecha[1].toLowerCase()]) + " ("+ (aHoras[0].hora+ " "+aHoras[0].tipo + " - "+aHoras[1].hora+ " "+aHoras[1].tipo)+")";

          }
          let inicioHora=this.fn_horaToAmPm(fecha1.hora);
          if(bFechasMultiples){
            let inicioHora2=this.fn_horaToAmPm(fecha2.hora);
            return  (oDias[fecha1.fecha[0].toLowerCase()]+" "+ fecha1.fecha[2]+" de "+ oMes[fecha1.fecha[1].toLowerCase()]) + " ("+ (inicioHora.hora+ " "+inicioHora.tipo)+")" + " - "+
             (oDias[fecha2.fecha[0].toLowerCase()]+" "+ fecha2.fecha[2]+" de "+ oMes[fecha2.fecha[1].toLowerCase()]) + " ("+ (inicioHora2.hora+ " "+inicioHora2.tipo)+")";
          }
          else{
            return  (oDias[fecha1.fecha[0].toLowerCase()]+" "+ fecha1.fecha[2]+" de "+ oMes[fecha1.fecha[1].toLowerCase()]) + " ("+ (inicioHora.hora+ " "+inicioHora.tipo)+")";
          }
        }

    

      }
      else{
        return '';
      }

    }

  

  


 
}