import { OnInit ,Component,ViewChild} from '@angular/core'; //, Input, Output, EventEmitter 
//import { ServicesProvider } from '../../providers/services';
import { ActivatedRoute } from '@angular/router';
import {VARIABLES} from '../../config/variables';
import { ServicesProvider } from '../../providers/services';
import  {SERVICES } from '../../config/webservices';
@Component({
    selector: 'det-curso-diplomado',
    templateUrl: './det-curso-diplo.component.html',
    styleUrls: ['./det-curso-diplo.component.scss']
  })

export class DetCursoDiplomadoComponent implements OnInit {
 // @ViewChild('modalCursoDiplomado') modalCursoDiplomado:any;
 @ViewChild('ModalDetCursoDip') ModalDetCursoDip: any;
  aCursosDiplomados:any=[];
  oCursoDipSeleccionado:any;
  oFacultades=VARIABLES.oFacultad;
  brochure:any;
  idCursoDip:string;
  oCursoDip:any;
  sub:any;
  oEstado_bolas=VARIABLES.oEstado_bolas;  
  fechas:any;
  filtro_fecha:any;
  fechaEspanol:any;
  checkFilters:any={
    "ingenieria":true,
    "salud":true,
    "juridicas":true,
    "sociales":true,
    "contables":true,
    "general":true
  }
    constructor(
      private ServicesProvider: ServicesProvider,
      private route: ActivatedRoute
   
    ){
      this.oFacultades["General"]={
        "icon": "fas fa-chalkboard-teacher",
        "background": "bg_general",
        "checkbox":"check_general",
        "color":"color_general"
      };

      this.route.params.subscribe(params => {
        this.idCursoDip=params['cursoDipId'];
        this.getCursoDipId();
      });
      /*
      this.sub = this.route.params
      .subscribe(v => this.oCursoDipSeleccionado =JSON.parse(v.data));
      */
     this.fechas=this.ServicesProvider.getCurrentDates();
     this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.fechas.hoy);
    }
    fn_callModalCursoDip(){
      this.ModalDetCursoDip.show();
    }
    ngOnInit(){}
    fn_indexador(){
    }
    getCursoDipId(){

      this.ServicesProvider.preloaderOn();
      this.ServicesProvider.get(SERVICES.GETCURSODIPID+this.idCursoDip,{}).then(data=>{
        this.oCursoDipSeleccionado=data.curso_diplomado;
        console.log(this.oCursoDipSeleccionado);
        this.ServicesProvider.oDifusionEnviar.nombre=this.oCursoDipSeleccionado.dip_nombre
        if(this.oCursoDipSeleccionado.dip_brochure){
          let brochure=this.oCursoDipSeleccionado.dip_brochure.split(".");
          let nombre_brochure=this.oCursoDipSeleccionado.dip_brochure.split("/");
          this.brochure=
          {
            "extension":brochure[brochure.length-1],
            "icon":this.ServicesProvider.fn_getIconMedia(this.oCursoDipSeleccionado.dip_brochure),
            "url":this.oCursoDipSeleccionado.dip_brochure,
            "nombre":nombre_brochure[nombre_brochure.length-1]
          };          
          
        }
        else{
          this.brochure=false;
        }
        this.ServicesProvider.preloaderOff();
        }, _fail => {
          this.ServicesProvider.preloaderOff();
          this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
        });
  
    }

  }