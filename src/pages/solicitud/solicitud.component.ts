import { OnInit ,Component,ViewChild} from '@angular/core'; //, Input, Output, EventEmitter  
//import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
//import { Router } from '@angular/router';
import  {SERVICES } from '../../config/webservices';
//import  {MESSAGES } from '../../config/messages';

//import  {VARIABLES } from '../../config/variables';


//import  {SERVICES } from '../../config/webservices';


@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})

export class SolicitudComponent implements OnInit {
  @ViewChild('modalSolicitud') modalSolicitud:any
  aSolicitudes:any;
  oCampoSeleccionado:any;
  iIndexBolas:number=1;
  sol_comentario:any;
  acamposViejos:any
  nombreCat:any;
  oCheckFilter:any={
    "add":true,
    "update":true,
    "delete":true
  }
  registros:any="25";
  estado_solicitud:any="pendiente";
  aPaginacion:any;
  oIcons:any=
  {
    "add":{
      "tipo":"Inserción",
      "icono":"fas fa-plus-square background_bola_verde tamano_icons"
    },
    "update":{
      "tipo":"Actualización",
      "icono":"fas fa-pen-square background_bola_amarilla tamano_icons",
      
    },
    "delete":{
      "tipo":"Eliminación",
      "icono":"fas fa-minus-square background_bola_roja tamano_icons"      
    }
  }

  oEstado:any={
    "validado":{
      "estado":"Validado",
      "icono":"fas fa-check background_bola_verde",
    },
    "pendiente":{
      "estado":"Pendiente",
      "icono":"fas fa-ellipsis-h background_bola_amarilla",
    },
    "rechazado":{
      "estado":"rechazado",
      "icono":"fas fa-times background_bola_roja",
    }
  }

  oNombreseIconos:any=
    {
      "Evento": {
        "eve_imagen": {
          "icono": "",
          "_nombre": "Imágen"
        },
        "eve_brochure": {
          "icono": "",
          "_nombre": "Brochure"
        },
        "eve_nombre": {
          "icono": "far fa-calendar-check",
          "_nombre": "Nombre de Evento"
        },
        "eve_organizador": {
          "icono": "fas fa-user",
          "_nombre": "Organizador"
        },
        "eve_fecha_inicio": {
          "icono": "fas fa-calendar-day",
          "_nombre": "Fecha Inicio"
        },
        "eve_fecha_fin": {
          "icono": "fas fa-calendar-day",
          "_nombre": "Fecha Fin"
        },
        "eve_extension": {
          "icono": "fas fa-phone-square",
          "_nombre": "Extensión"
        },
        "eve_costo": {
          "icono": "fas fa-dollar-sign",
          "_nombre": "Costo"
        }

    },
    "curso_diplomado":{
      "dip_facultad":{
        "icono": "fas fa-university",
        "_nombre": "Facultad"
      },
      "dip_nombre":{
        "icono": "fas fa-book-open",
        "_nombre": "Nombre"
      },
      "dip_nivel":{
        "icono": "fas fa-user",
        "_nombre": "Nivel"
      },
      "dip_horario":{
        "icono": "far fa-calendar-check",
        "_nombre": "Horario"
      },
      "dip_observacion":{
        "icono": "far fa-comment-alt",
        "_nombre": "Observación"
      },
      "dip_requisito":{
        "icono": "fas fa-list-ol ",
        "_nombre": "Requisito"
      },
      "dip_oferta":{
        "icono": "far fa-calendar-alt",
        "_nombre": "Oferta"
      },
      "dip_fechainscripcion":{
        "icono": "fas fa-calendar ",
        "_nombre": "Fecha de Inscripción"
      },
      "dip_fechalimiteinscripcion":{
        "icono": "fas fa-hourglass-end",
        "_nombre": "Fecha Límite"
      },
      "dip_costo":{
        "icono": "fas fa-dollar-sign",
        "_nombre": "Costo"
      },
      "dip_duracion":{
        "icono": "fas fa-stopwatch",
        "_nombre": "Costo"
      },
      "dip_tipoestudio":{
        "icono": "fas fa-award",
        "_nombre": "Tipo de Estudio"
      },
      "dip_img":{
        "icono": "",
        "_nombre": "Imagen"
      },
      "dip_brochure":{
        "icono": "",
        "_nombre": "Archivo"
      },
      "dip_periodicidad":{
        "icono": "fas fa-clock",
        "_nombre": "Frecuencia"
      }
    },
    "curs":{
      "prog_nombre":{
        "icono": "fas fa-book",
        "_nombre": "Nombre"
      },
      "prog_snies":{
        "icono": "far fa-address-card",
        "_nombre": "SNIES"
      },
      "prog_registro_calificado":{
        "icono": "far fa-file-alt ",
        "_nombre": "Registro Calificado"
      },
      "prog_acreditacion_de_alta_calidad":{
        "icono": "fas fa-medal",
        "_nombre": "Acreditación de Alta Calidad"
      },
      "prog_titulo_otorgado":{
        "icono": "fas fa-user-graduate",
        "_nombre": "Titulo Otorgado"
      },
      "prog_duracion_estimada":{
        "icono": "fas fa-stopwatch",
        "_nombre": "Duración"
      },
      "prog_numero_de_creditos":{
        "icono": "fas fa-hockey-puck",
        "_nombre": "Créditos"
      },
      "prog_intensidad_horaria":{
        "icono": "far fa-clock",
        "_nombre": "Intensidad Horaria"
      },
      "prog_valor_matricula":{
        "icono": "fas fa-dollar-sign",
        "_nombre": "Valor de la Matrícula"
      },
      "prog_contacto":{
        "icono": "fas fa-user-tie",
        "_nombre": "Contacto"
      },
      "prog_correo":{
        "icono": "far fa-envelope",
        "_nombre": "Correo"
      },
      "prog_facultad":{ 
        "icono": "fas fa-atom",
        "_nombre": "Facultad"
      },
      "prog_tipo":{
        "icono": "fas fa-equals",
        "_nombre": "Tipo de programa"
      },
      "prog_tipo_posgrado":{
        "icono": "fas fa-equals",
        "_nombre": "Tipo de Posgrado"
      },
      "prog_jornada":{
        "icono": "fas fa-cloud-sun",
        "_nombre": "Jornada"
      },
      "prog_modalidad_de_formacion":{
        "icono": "fas fa-portrait",
        "_nombre": "Modalidad de Formación"
      },
      "prog_beca_bien":{
        "icono": "fas fa-medal",
        "_nombre": "Beca Biena"
      },
      "prog_opcion_grado":
      {
        "icono": "fas fa-medal",
        "_nombre": "Opción Grado"
      },
      "prog_requisitos":
      {
        "icono": "fas fa-medal",
        "_nombre": "Requisitos"
      },"prog_ext":
      {
        "icono": "fas fa-phone",
        "_nombre": "Extensión"
      },

    /*
      "prog_img":{
        "icono":"",
        "_nombre": "Imagen"
      }
      
      /*,
      "prog_brochure":{
        "icono":"",
        "_nombre": "Brochure"
      },
      */
    },"beca":{
      "bec_titulo":{
        "icono": "fas fa-book",
        "_nombre": "Nombre"
      },
      "bec_descuento":{
        "icono": "far fa-address",
        "_nombre": "Descuento"
      },
      "bec_descripcion":{
        "icono": "fas fa-align-justify",
        "_nombre": "Descripcion"
      },
      "bec_tipo":{
        "icono": "fas fa-address-card",
        "_nombre": "Tipo de Beca"
      },
      "bec_condiciones":{
        "icono": "far fa-comment-alt",
        "_nombre": "Condiciones"
      }
    },"proceso":{
      "pro_descripcion":{
        "icono": "fas fa-book-open",
        "_nombre": "Descripción"
      },
      "pro_observacion":{
        "icono": "far fa-comment-alt",
        "_nombre": "Observación"
      },
      "pro_nombre":{
        "icono": "fas fa-address-card",
        "_nombre": "Nombre"
      },
      "pro_costo":{
        "icono": "fas fa-dollar-sign",
        "_nombre": "Costo"
      },
    },"calendario":{
      "cal_nombre":{
        "icono": "fas fa-book",
        "_nombre": "Nombre"
      },
      "cal_costo":{
        "icono": "far fa-hand-holding-usd",
        "_nombre": "Costo"
      },
      "cal_fecha_inicio":{
        "icono": "fas fa-calendar-day",
        "_nombre": "Fecha Inicio"
      },
      "cal_fecha_fin":{
        "icono": "fas fa-cal_fecha_fin",
        "_nombre": "Fecha Fin"
      },
      "cal_fecha_unica":{
        "icono": "fas fa-calendar-day",
        "_nombre": "Fecha Única"
      },
      "cal_fecha_hasta":{
        "icono": "fas fa-cal_fecha_fin",
        "_nombre": "Fecha Hasta"
      },
      "cal_categoria":{
        "icono": "fas fa-calendar-day",
        "_nombre": "Categoria"
      },
      "cal_year":{
        "icono": "fas fa-cal_fecha_fin",
        "_nombre": "Año"
      },
      "cal_numero_periodo":{
        "icono": "fas fa-calendar-day",
        "_nombre": "Periodo"
      }
    },
      "dependencia":{
        "dep_descripcion":{
          "icono": "fas fa-align-justify",
          "_nombre": "Descripción dependencia"
        },
        "dep_areas":{
          "icono": "fas fa-layer-group",
          "_nombre": "Áreas",
          "descripcion":
          {
            "icono": "fas fa-align-justify",
            "_nombre": "Descripción"
          },
          "extension":
          {
            "icono": "fas fa-phone",
            "_nombre": "Extensión"
          },     
          "nombre":
          {
            "icono": "fas fa-layer-group",
            "_nombre": "Nombre"
          },
          "responsables":{
            "icono": "fas fa-user",
            "_nombre": "Responsables",
            "nombre":{
              "icono": "fas fa-user",
              "_nombre": "Nombre",
            },
            "Correo":{
              "icono": "fas fa-envelope",
              "_nombre": "Correo",
            },
            "cargo":{
              "icono": "fas fa-cogs",
              "_nombre": "Cargo",
            }



          }     
        },
        "dep_nombre":{
          "icono": "fas fa-address-book",
          "_nombre": "Nombre dependencia"
        },
        "dep_servicios":{
          "icono": "fas fa-list-ul",
          "_nombre": "Servicios dependencia",
          "concepto":{
            "icono": "fas fa-calendar-day",
            "_nombre": "Nombre de servicio"
          ,
          "items":{
            "icono": "fas fa-calendar-day",
            "_nombre": "servicio"
          }}

        }
        

      },
      "servicio":{
        "ser_area":
        {
          "icono": "fas fa-layer-group",
          "_nombre": "Área"
        },
        "ser_descripcion":
        {
          "icono": "fas fa-align-justify",
          "_nombre": "Descripción"
        },
        "ser_integrantes":
        {
          "icono": "fas fa-users",
          "_nombre": "Integrantes",
          "extension_users":{
            "icono": "",
            "_nombre": "",
            "cargo":{
              "icono": "fas fa-cogs",
              "_nombre": "Cargo",
            },
            "correo":{
              "icono": "fas fa-envelope",
              "_nombre": "Correo",
            },            
            "ext":{
              "icono": "fas fa-phone",
              "_nombre": "extensión users",
            },    
            "nombre":{
              "icono": "fas fa-user",
              "_nombre": "Nombre",
            }   
            
          }
        },
        "ser_items":
        {
          "icono": "fas fa-calendar-day",
          "_nombre": "Nombre de servicio"
        }
      },
      "directorio":{
        "dir_nombre":
        {
          "icono": "fas fa-book",
          "_nombre": "Nombre"
        },
        "dir_extension":
        {
          "icono": "fas fa-phone",
          "_nombre": "Extensión"
        },
        "dir_categoria":
        {
          "icono": "fas fa-users",
          "_nombre": "Categoria",
        },
        "dir_facultad":
        {
          "icono": "fas fa-atom",
          "_nombre": "Facultad",
        }
      
      }

    

  }

  constructor(
    //public fb: FormBuilder,
   private ServicesProvider: ServicesProvider

) {
  /*this.formEvento = fb.group({
    eve_nombre: ['', [Validators.required]],
    eve_lugar: ['', Validators.required],
    eve_fecha:['', [Validators.required]],
    eve_hora:['', [Validators.required]],
    eve_organizador:['', [Validators.required]],
    eve_imagen:['', []],
    eve_extension:['', [Validators.required]],
    eve_costo:['', [Validators.required]],
    eve_duracion:['', [Validators.required]],
    eve_comentario: ['', []]
  });*/
    this.fn_getSolicitudes();

/*
    this.aSolicitudes=[
      {
        "tipo_solicitud": "add",
        "fecha_actualizacion": "22/05/2019 08:00:00",
        "categoria":"Evento",
        "usuario_genera": "Duvan Ospina",
        "campos":{
            "eve_comentario": "Deben traer computador y lápiz",
            "eve_nombre":"Psicosemana",
            "eve_lugar":"Torre Emblemática",
            "eve_fecha":"23/05/2019 20:00:00",
            "eve_organizador":"Alejandro Londoño Valencia",
            "eve_imagen":"../../assets/img/psicologia.jpeg",
            "eve_extension":"0035",
            "eve_costo":50000,
            "eve_duracion":"4 horas"
        }
      },
      {
        "tipo_solicitud": "update",
        "fecha_actualizacion": "22/05/2019 08:00:00",
        "categoria":"Evento",
        "usuario_genera": "Duvan Ospina",
        "campos":{
          "campos_viejos":{
            "eve_comentario": "Deben traer computador y lápiz",
            "eve_nombre":"Psicosemana",
            "eve_lugar":"Torre Emblemática",
            "eve_fecha":"23/05/2019 20:00:00",
            "eve_organizador":"Alejandro Londoño Valencia",
            "eve_imagen":"../../assets/img/psicologia.jpeg",
            "eve_extension":"0035",
            "eve_costo":50000,
            "eve_duracion":"4 horas"
          },
          "campos_nuevos":{
            "eve_nombre":"Semana de Ingeniería",
            "eve_lugar":"Sala C102",
            "eve_organizador":"Guillermo Orlando Sierra",
            "eve_duracion":"6 horas"

          }


        }


      },
      {
        "tipo_solicitud": "delete",
        "fecha_actualizacion": "22/05/2019 08:00:00",
        "categoria":"Evento",
        "usuario_genera": "Duvan Ospina",
        "campos":{
            "eve_comentario": "Deben traer computador y lápiz",
            "eve_nombre":"Psicosemana",
            "eve_lugar":"Torre Emblemática",
            "eve_fecha":"17/05/2019 20:00:00",
            "eve_organizador":"Guillermo Orlando Sierra",
            "eve_imagen":"../../assets/img/psicologia.jpeg",
            "eve_extension":"0035",
            "eve_costo":50000,
            "eve_duracion":"4 horas"
        }
      }


    ]*/


 }
 fn_indexador(){
 }

 isArray(obj : any ) {
  return Array.isArray(obj)
}
  isString(obj:any){
    return typeof obj;

  }

isObject(obj : any){

  return typeof obj;

}

 fn_getSolicitudes(){

  //this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.filtro_fecha);
/*
  this.ServicesProvider.preloaderOn();
  this.ServicesProvider.get(SERVICES.GETSOLICITUDES,{"filtro":this.estado_solicitud, "add":this.oCheckFilter.add,"update":this.oCheckFilter.update,"delete":this.oCheckFilter.delete,limit:this.registros,page:this.iIndexBolas}).then(data=>{
    let totalitems=data.total_items;
    let paginas=Math.ceil(totalitems/this.registros);
    paginas=paginas>=5?5:paginas;
    let bolas:any=[];
    for(var i=1; i<=paginas;i++ ){
      bolas.push(i);
    }
    this.aPaginacion={
      "total":totalitems,
      "paginasTotales":Math.ceil(totalitems/this.registros),
      "paginas":paginas,
      "bolas": bolas
    };
    /*this.aPaginacion={
      "total":totalitems,
      "paginas":paginas>=4?4:paginas,
      "bolas": new Array(paginas>=4?4:paginas)
    };*/
    /*
    this.aSolicitudes=data.solicitudes;

    if(this.estado_solicitud=="pendiente" ){
      this.ServicesProvider.numNotificaciones=data.total_items;


      //generar notificaciones en la barra
      this.ServicesProvider.fn_getSolicitudes().then((data:any)=>{
        
        this.ServicesProvider.aNotificaciones=[];
        this.ServicesProvider.numNotificaciones=data.total_items;
        for(var i=0;i<=data.solicitudes.length-1;i++){
          if(i==3){
            break;
          }
          this.ServicesProvider.aNotificaciones.push(data.solicitudes[i]);
        }
        }, (_fail:any) => {
      });

    }
    this.ServicesProvider.preloaderOff();
    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });

*/
}

  ngOnInit() {
 
    //this.registros;

  }

  fn_callModalSolicitud(item:any){
    this.sol_comentario='';
    this.oCampoSeleccionado=item;
    console.log(this.oCampoSeleccionado)
    this.modalSolicitud.show();
  }
  fn_mostrarNombre(){}

  fn_verificarSolicitudes(accion:string){

    let oSendSolicitud=
    {
      "SolicitudId":this.oCampoSeleccionado._id,
      "sol_comentario":this.sol_comentario,
      "accion":accion
      }
      
    this.ServicesProvider.post(SERVICES.EJECUTARSOLICITUD+""+this.oCampoSeleccionado._id, oSendSolicitud,true,localStorage.getItem("token")).then(data=>{
      if(data.message.toLowerCase()=="registro afectado" || data.message.toLowerCase()=="solicitud rechazada" ){
        this.modalSolicitud.hide();
        this.ServicesProvider.fn_generarAlerta("Éxito", 'Operación exitosa');
        this.fn_getSolicitudes();
      } 
      else{
        this.ServicesProvider.fn_generarAlerta("error", data.message);
        this.modalSolicitud.hide();
        this.fn_getSolicitudes();

      }
      //this.aDetalleAvance.unshift();
      //this.router.navigate(["home"]);
      this.ServicesProvider.preloaderOff();  

      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
  
  }    


  fn_setBolas(index:any){
    this.iIndexBolas=index;
    let auxBolas:any=[];
    let contadorMax5=0;
    //let auxarray:any=new Array(this.aPaginacion.paginas);

     if(this.aPaginacion.paginasTotales-this.iIndexBolas<=3){
       auxBolas[0]=this.aPaginacion.paginasTotales-4;
       auxBolas[1]=this.aPaginacion.paginasTotales-3;
       auxBolas[2]=this.aPaginacion.paginasTotales-2;
       auxBolas[3]=this.aPaginacion.paginasTotales-1;
       auxBolas[4]=this.aPaginacion.paginasTotales;

     }
     else{
      for(var i:any=this.iIndexBolas; i<= this.aPaginacion.paginasTotales; i++){
        contadorMax5++;
 
        if(contadorMax5<=5){
          auxBolas.push(i);
        }

      }
     }
     /*console.log(this.aPaginacion.paginasTotales , " ", this.iIndexBolas);
     if(this.aPaginacion.paginasTotales-this.iIndexBolas<=4 && this.iIndexBolas>=6){
      console.log("acaaa");
      let disminuir=-4;
      let aumentar=0;
      for(var i:any=this.iIndexBolas; i<= this.aPaginacion.paginasTotales; i++){
        contadorMax5++;
 
        if(contadorMax5<=5){
          auxBolas[aumentar]=this.aPaginacion.paginasTotales+disminuir;
          disminuir=disminuir+1;
        }

      }


    }
    else if(this.iIndexBolas<=3){

       console.log("por aca")
       for(var i:any=0; i< this.aPaginacion.paginasTotales; i++){
        contadorMax5++;
        if(contadorMax5<=5){
          auxBolas[i]=i+1;
     

        }
  

      }
    }

    else if(this.iIndexBolas<=6 && this.aPaginacion.paginasTotales-this.iIndexBolas<=4){

    }

      
     else{
      console.log("eu")
      let aumentar=-2;
      for(var i:any=0; i< this.aPaginacion.paginasTotales; i++){
        contadorMax5++;
        if(contadorMax5<=5){
          auxBolas[i]=this.iIndexBolas+aumentar;
          aumentar++;
  

        }
  

      }


     }
    
*/
  



    this.aPaginacion.bolas=auxBolas;

    this.fn_getSolicitudes()
  }




}

