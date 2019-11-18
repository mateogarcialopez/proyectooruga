import { OnInit ,Component, ViewChild} from '@angular/core'; //, Input, Output, EventEmitter  
import { ServicesProvider } from '../../providers/services';
//import { Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { ServicesProvider } from '../../providers/services';
import { ActivatedRoute } from '@angular/router';
//import  {SERVICES } from '../../config/webservices';
//import { FormGroup } from '@angular/forms';
import {VARIABLES} from '../../config/variables';
import  {SERVICES } from '../../config/webservices';

@Component({
  selector: 'detalle-programa',
  templateUrl: './detalle-programa.component.html',
  styleUrls: ['./detalle-programa.component.scss']
})
export class DetalleProgramaComponent implements OnInit {
  @ViewChild('ModalDetPrograma') ModalDetPrograma: any;
  oProgramaSeleccionado:any;
  oFacultades=VARIABLES.oFacultad;
  sub:any;
  idPrograma:string;
  brochure:any;
  oEstado_bolas=VARIABLES.oEstado_bolas;  

  fechas:any;
  filtro_fecha:any;
  fechaEspanol:any;
  constructor(
    //public fb: FormBuilder,  
    //private ServicesProvider: ServicesProvider,
    //private router : Router,
    private ServicesProvider: ServicesProvider,
    private route: ActivatedRoute
  ) {


    this.route.params.subscribe(params => {
      this.idPrograma=params['programaId'];
      this.getProgramaId();
    });
    this.fechas=this.ServicesProvider.getCurrentDates();
    this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.fechas.hoy);

  }
  fn_callModalPrograma(){
    this.ModalDetPrograma.show();
  }
    ngOnInit(){

    }
    fn_indexador(){
    }

    getProgramaId(){
      this.ServicesProvider.preloaderOn();
      this.ServicesProvider.get(SERVICES.GETPROGRAMAID+this.idPrograma,{}).then(data=>{
        if(!this.ServicesProvider.parametrosSeccion){
          this.ServicesProvider.parametrosSeccion={};
        }
        this.ServicesProvider.parametrosSeccion.filtro=data.curs.prog_tipo.toLowerCase();

        this.oProgramaSeleccionado=data.curs;
        this.ServicesProvider.oDifusionEnviar.nombre=this.oProgramaSeleccionado.prog_nombre
        if(this.oProgramaSeleccionado.prog_brochure){
          let brochure=this.oProgramaSeleccionado.prog_brochure.split(".");
          let nombre_brochure=this.oProgramaSeleccionado.prog_brochure.split("/");
          this.brochure=
          {
            "extension":brochure[brochure.length-1],
            "icon":this.ServicesProvider.fn_getIconMedia(this.oProgramaSeleccionado.prog_brochure),
            "url":this.oProgramaSeleccionado.prog_brochure,
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






