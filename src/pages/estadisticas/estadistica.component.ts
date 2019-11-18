import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
import  {SERVICES } from '../../config/webservices';
import * as c3 from 'c3';
import * as d3 from 'd3'

@Component({
  selector: 'estadistica_component',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})


export class EstadisticaComponent implements OnInit {
@ViewChild('mestadistica') mestadistica: ElementRef<HTMLElement>;

aUsuariosFilter:any;
textfilter:any
formEstadistica: FormGroup;
filtro:any;
aEstadistica:any;
aUsuario:any=[];
public number: number = 1000;
aRegistros:any=[];
aRegistrosCopia:any=[];
totalFechas:any=[];
nombrefecha:any=[]
contador:any;
total:any
seccion:any;
aSecciones:any=[]
consultaUsuario:any=[]
aColores:any=
[
  "#76C04E","#4F8034","#81BF4E","#5D8034","#8DE65E","#578035","#22BF4F","#178035","#6EE65E","#3B8034"
];
aIconValores:any=
[
  "fas fa-user-circle","fas fa-home","fas fa-user-friends","fas fa-heart","fas fa-balance-scale","fas fa-award","fas fa-users","fas fa-dove","fas fa-child","fas fa-handshake"
];
aIconPrincipios:any=
[
  "fas fa-brain","fas fa-american-sign-language-interpreting"
]
aIconEjes:any=
[
  "fas fa-baby","fab fa-connectdevelop","fas fa-atom", "fas fa-university", "fas fa-gavel"
];

oMes:any={
  "1":"Enero",
  "2":"Febrero",
  "3":"Marzo",
  "4":"Abril",
  "5":"Mayo",
  "6":"Junio",
  "7":"Julio",
  "8":"Agosto",
  "9":"Septiembre",
  "10":"Octubre",
  "11":"Noviembre",
  "12":"Diciembre"
}
 aAniosMes:any=[
  // {id:"2019-9","nombre":this.oMes["9"]+ " 2019"}
  ];
constructor(public  ServicesProvider: ServicesProvider, public fb: FormBuilder){

   //2019-9  Septiembre 2019
  //let iCurrentYear:any=new Date().getFullYear();
  /*let iCurrentYear:any=2022;
  let iIteradorAnios= (iCurrentYear-2019)+1;// define cuantos años han transcurrido
  let aIteradorAnios= new Array(iIteradorAnios); //array[1,2,3]
  let iMesActual:any=new Date().getMonth()+1;
  console.log(iCurrentYear,iIteradorAnios,aIteradorAnios,iMesActual);
*/

  /*let iCurrentYear:any=new Date().getFullYear();
  let iMesActual:any=new Date().getMonth()+1;*/
  let iCurrentYear:any=new Date().getFullYear();

  let iMesActual:any=new Date().getMonth()+1;
  let bTermina=false;
  let iMes=9;
  let iAnio=2019;
  while(bTermina==false){
  this.aAniosMes.push(
      {id: iAnio+"-"+(iMes),"nombre":this.oMes[iMes]+" "+ iAnio}
  )
  if( ((parseInt(iCurrentYear))==(iAnio))  &&  (iMes==iMesActual)){
    bTermina=true;
    break;
  }


  iMes=iMes+1;
  if(iMes==13){
    iAnio=iAnio+1;
    iMes=1;
  }



  }
    this.formEstadistica = fb.group({
      
        filtrarUsuario: [null, []],
        est_ano: [null, []],
        est_mes: [null, []],
        est_seccion: [null, []],
        est_usuario: [null,[]],
      });
setTimeout(()=>{
  this.formEstadistica.controls.est_ano.setValue(this.aAniosMes[this.aAniosMes.length-1].id)

})
}
ngOnInit() {
this.getEstadistica();
this.getEstadisticaTotal();
}
  
  fn_filterUsers(){

    this.aUsuariosFilter=this.aUsuario.filter((elemento:any)=>{

      return this.ServicesProvider.fn_quitarAcentos(elemento).search(this.ServicesProvider.fn_quitarAcentos(this.formEstadistica.controls.filtrarUsuario.value))!=-1;

      
    });
    //console.log(this.formEstadistica.controls.est_usuario.value)
  //  console.log(this.aUsuariosFilter[0],this.formEstadistica.controls.filtrarUsuario.value)

      if(this.formEstadistica.controls.est_usuario.value!=this.aUsuariosFilter[0]){
        this.formEstadistica.controls.est_usuario.setValue(this.aUsuariosFilter[0])
        this.getEstadisticaTotal()

       // console.log(this.aUsuariosFilter[0])
      }  
    
   
  


}



  getEstadistica(){
    //Desarrollar Filtros 
    this.aUsuario.length=0;
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.get(SERVICES.ESTADISTICA,{}).then(data=>{
    this.aEstadistica=data.registros;
    this.fnUsuarioxConsulta();
   // console.log(this.aEstadistica);
    this.aEstadistica.filter((reg:any)=>{
    this.aUsuario.push(reg.re_usuario);
      return reg.re_usuario
    });



      this.ServicesProvider.preloaderOff();
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
 }

 getEstadisticaTotal(){
  this.contador=0;
  this.fn_ordenarArreglo(3)
  this.ServicesProvider.get(SERVICES.ESTADISTICA_TOTAL,{}).then(data=>{
   
  //  console.log(data)
    if(this.seccion==1 && this.formEstadistica.controls.est_usuario.value!=null){
      setTimeout(()=>{
        this.formEstadistica.controls.est_seccion.setValue(null)
        this.seccion=0;
      })

  
    }
    //Para Todas las secciones y todos los usuarios
    this.total=data.secciones.Total_consultas.contador
    if(this.formEstadistica.controls['est_seccion'].value==null && this.formEstadistica.controls['est_usuario'].value==null){
      this.aRegistros.length=0;
      this.aRegistrosCopia=[]
      this.aSecciones=[]
    for(var i in data.secciones[this.formEstadistica.controls.est_ano.value]){
      if(data.secciones[this.formEstadistica.controls.est_ano.value][i].contador!=null){
      this.aRegistros.push([i,data.secciones[this.formEstadistica.controls.est_ano.value][i].contador])
      this.aRegistrosCopia.push([i,data.secciones[this.formEstadistica.controls.est_ano.value][i].contador])
      this.contador=data.secciones[this.formEstadistica.controls.est_ano.value].total
      this.aSecciones.push(i)
    }
  }

  //Para todos los usuarios con una seccion en especifico
} else if(this.formEstadistica.controls['est_seccion'].value!=null && this.formEstadistica.controls['est_usuario'].value==null){

    this.seccion=1;
    this.aRegistros=this.aRegistrosCopia;
  let dataN=this.aRegistros.filter((reg:any)=>{

    return reg[0]==this.formEstadistica.controls['est_seccion'].value
  });

 this.aRegistros=dataN

 this.contador=this.aRegistros[0][1]

  //para todas las secciones con un usaurio en especifico
}else if(this.formEstadistica.controls['est_seccion'].value==null && this.formEstadistica.controls['est_usuario'].value!=null){

  this.aRegistros.length=0;
  let dataO=this.aEstadistica.filter((reg:any)=>{

    return reg.re_usuario==this.formEstadistica.controls['est_usuario'].value
  });

  let dataN=dataO[0].re_aniomes.filter((reg:any)=>{
     return reg[this.formEstadistica.controls['est_ano'].value]
  });

  this.aRegistrosCopia=[]
  this.aSecciones=[]
  for(var i in dataN[0][this.formEstadistica.controls['est_ano'].value].secciones){
   this.aRegistros.push([dataN[0][this.formEstadistica.controls['est_ano'].value].secciones[i].nombre,dataN[0][this.formEstadistica.controls['est_ano'].value].secciones[i].consultas])
   this.aRegistrosCopia.push([dataN[0][this.formEstadistica.controls['est_ano'].value].secciones[i].nombre,dataN[0][this.formEstadistica.controls['est_ano'].value].secciones[i].consultas])
   this.contador=this.contador+dataN[0][this.formEstadistica.controls['est_ano'].value].secciones[i].consultas;
   this.aSecciones.push(dataN[0][this.formEstadistica.controls['est_ano'].value].secciones[i].nombre)
}


}
//para un usuario en especifico con una seccion en especifico
else if(this.formEstadistica.controls['est_seccion'].value!=null && this.formEstadistica.controls['est_usuario'].value!=null){

this.seccion=1;
  this.aRegistros.length=0;
  let dataO=this.aEstadistica.filter((reg:any)=>{

    return reg.re_usuario==this.formEstadistica.controls['est_usuario'].value
  });

  let dataN=dataO[0].re_aniomes.filter((reg:any)=>{
 
    return reg[this.formEstadistica.controls['est_ano'].value]
  });

  for(var i in dataN[0][this.formEstadistica.controls['est_ano'].value].secciones){
   this.aRegistros.push([dataN[0][this.formEstadistica.controls['est_ano'].value].secciones[i].nombre,dataN[0][this.formEstadistica.controls['est_ano'].value].secciones[i].consultas])
   this.aRegistrosCopia=this.aRegistros;


}
this.aSecciones=[]
let dataS=this.aRegistros.filter((reg:any)=>{
  this.aSecciones.push(reg[0])

  return reg[0]==this.formEstadistica.controls['est_seccion'].value
});

this.aRegistros.length=0;
this.aRegistros.push(dataS[0]);
this.contador=dataS[0][1]


}
this.fn_ordenarArreglo(1);
document.getElementById('chart')!.offsetHeight;
var elem = document.getElementById("chart");

elem!.getBoundingClientRect();
document.getElementById('chart')!.clientHeight;
  setTimeout(()=>{
    c3.generate({
      bindto:'#chart',
     
     
      data: {
          columns:this.aRegistros,
          type: 'bar',
          colors: {
            Directorios: '#7B241C',
            Dependencias: '#1A5276',
            Eventos: '#117864',
            Programas: '#9A7D0A',
            Becas: '#797D7F',
            Procesos: '#212F3C',
            Calendario: '#9E6161',
            Servicios: '#4A235A'
          },
         
        
      },
      bar: {
        width: {
            ratio: 0.4 // this makes bar width 50% of length between ticks
        }
      },
    
      grid: {
          y: {
              show:true
          },
           x: {
              show:true
          }
      },
      axis: {
        x: {
            type: 'category',
            categories:this.aUsuariosFilter
        }
    }
    });
  })


this.totalFechas=[["Consultas totales"]]
for (var i in data.secciones){
  if(i!="Total_consultas"){
  this.totalFechas[0].push(data.secciones[i].total)
  this.oMes[i.split('-')[1]]
  }
}
for(let i in this.aAniosMes){
  this.nombrefecha.push(this.aAniosMes[i].nombre)
}
c3.generate({
  bindto:'#line',
  
  data: {
    columns: this.totalFechas
  },
  axis: {
    x: {
        type: 'category',
        categories:this.nombrefecha
    }
}

});
  }, _fail => {
    this.ServicesProvider.preloaderOff();
    this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
  });
 }



fnUsuarioxConsulta(){
  this.consultaUsuario=[]
  var copia:any=[]
  //var usuario:any;
  setTimeout(()=>{
  for(let i in this.aEstadistica){    
  
      this.aEstadistica[i].re_aniomes.filter((reg:any)=>{
        if(reg[this.formEstadistica.controls['est_ano'].value]!=undefined){
       this.consultaUsuario.push([this.aEstadistica[i].re_usuario,reg[this.formEstadistica.controls['est_ano'].value]]);
        }
       
       return reg[this.formEstadistica.controls['est_ano'].value]
       });
}
//console.log(this.consultaUsuario)
  for(let i in this.consultaUsuario){
    let consultatotal=0
    for(let j in this.consultaUsuario[i][1].secciones){
     consultatotal=consultatotal+this.consultaUsuario[i][1].secciones[j]["consultas"];
     
    }

    copia.push([this.consultaUsuario[i][0],consultatotal])
 
    /*
    if(this.consultaUsuario[i][1].secciones.length>1){
      console.log("si")
    }else{
      console.log("No")
    }*/

  }
  this.consultaUsuario=copia;
  this.aUsuariosFilter.length=0;
  this.aUsuario.length=0;
  for(let i in this.consultaUsuario){
    this.aUsuario.push(this.consultaUsuario[i][0])
  }
 // console.log(this.aUsuariosFilter)
  //console.log(this.consultaUsuario)
  this.aUsuariosFilter=this.aUsuario.slice(0);
  this.fn_ordenarArreglo(3)
/*
  setTimeout(()=>{
    var offsetHeight = document.getElementById('usuario').offsetHeight;
    console.log(offsetHeight)
    var offsetHeight = document.getElementById('contenedor-usuario').offsetHeight;
    console.log(offsetHeight)
  },2000)
*/
this.fn_ordenarArreglo(2);
this.consultaUsuario.unshift(
  ['x', 'Usuarios']
)
let tamanoPie = document.getElementById('usuario');

var width = tamanoPie!.offsetWidth;
var tamano= width+(this.consultaUsuario.length-1)*30
//console.log(width)
let query:any
query = d3.transpose(this.consultaUsuario);
  c3.generate({
    size:{
      width:tamano
    },
    bindto:'#usuario',
    data: {
        x : 'x',
       columns:query,
   
        type: 'bar'
    },
    axis: {
      x: {
        type: 'category', // this needed to load string x value
        tick: {
                rotate: -45,
                multiline: false
        },
        height: 130
      }
    },
    subchart:{
        show:false
    },
    

    
});


})
  
}



fn_ordenarArreglo(opcion:any){
if(opcion==1){


let copia:any=[]
 for(let i in this.aRegistros){

copia.push(this.aRegistros[i][1]);

  }
  copia.sort((b:any,a:any)=>a-b);  // [ 1, 5, 40, 200 ]
   let copiaRegistros= this.aRegistros;
   this.aRegistros=[]



for(let i in copia){
  for(let j in copiaRegistros){
    if(copia[i]==copiaRegistros[j][1]){

      this.aRegistros.push(copiaRegistros[j])
      copiaRegistros.splice( j, 1 );
    }
  }
}
}else if (opcion==2){
  
  let copia:any=[]
   for(let i in this.consultaUsuario){
  
  copia.push(this.consultaUsuario[i][1]);
  
    }
    copia.sort((b:any,a:any)=>a-b);  // [ 1, 5, 40, 200 ]
     let copiaRegistros= this.consultaUsuario;
     this.consultaUsuario=[]
  
  
  
  for(let i in copia){
    for(let j in copiaRegistros){
      if(copia[i]==copiaRegistros[j][1]){
  
        this.consultaUsuario.push(copiaRegistros[j])
        copiaRegistros.splice( j, 1 );
      }
    }
  }

}  else if(opcion==3){
  let copia:any=[]
  for(let i in this.aUsuariosFilter){
 
 copia.push(this.aUsuariosFilter[i][0]);
 
   }
   copia.sort();
    let copiaRegistros= this.aUsuariosFilter;
    this.aUsuariosFilter=[]
 
 
 
 for(let i in copia){
   for(let j in copiaRegistros){
     if(copia[i]==copiaRegistros[j][0]){
 
       this.aUsuariosFilter.push(copiaRegistros[j])
       copiaRegistros.splice( j, 1 );
     }
   }
 }
  

}
 }
/*
 fn_ordenarArregloUsuario(){

  let copia:any=[]
   for(let i in this.consultaUsuario){
  
  copia.push(this.consultaUsuario[i][1]);
  
    }
    copia.sort((b:any,a:any)=>a-b);  // [ 1, 5, 40, 200 ]
     let copiaRegistros= this.consultaUsuario;
     this.consultaUsuario=[]
  
  
  
  for(let i in copia){
    for(let j in copiaRegistros){
      if(copia[i]==copiaRegistros[j][1]){
  
        this.consultaUsuario.push(copiaRegistros[j])
        copiaRegistros.splice( j, 1 );
      }
    }
  }
   }


   
 fn_ordenarUsuario(){
console.log(this.aUsuariosFilter)
  let copia:any=[]
   for(let i in this.aUsuariosFilter){
  
  copia.push(this.aUsuariosFilter[i][0]);
  
    }
    copia.sort();
     let copiaRegistros= this.aUsuariosFilter;
     this.aUsuariosFilter=[]
  
  
  
  for(let i in copia){
    for(let j in copiaRegistros){
      if(copia[i]==copiaRegistros[j][0]){
  
        this.aUsuariosFilter.push(copiaRegistros[j])
        copiaRegistros.splice( j, 1 );
      }
    }
  }
   }
*/
fnSeteaDropdown(){
  this.formEstadistica.controls.est_seccion.setValue(null)
}
fn_resetDropDown(){


    this.formEstadistica.controls.est_seccion.setValue(null)
    this.formEstadistica.controls.est_usuario.setValue(null)


}

}

