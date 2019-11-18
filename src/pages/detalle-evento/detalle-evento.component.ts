

import { OnInit ,Component,ViewChild} from '@angular/core'; //, Input, Output, EventEmitter  
//import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
import { ActivatedRoute } from '@angular/router';
import  {SERVICES } from '../../config/webservices';
import  {VARIABLES } from '../../config/variables';
//import  {MESSAGES } from '../../config/messages';


@Component({
  selector: 'detalle-evento',
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.scss']
})
export class DetalleEventoComponent implements OnInit {
  @ViewChild('ModalDetEvento') ModalDetEvento: any;
  oEvento:any;
  idEvento:string;
  oEstado_bolas:any;
  brochure:any;
  constructor(

    /*public fb: FormBuilder,*/  
    //private ServicesProvider: ServicesProvider,
    //private router : Router

  //  public fb: FormBuilder,
    private ServicesProvider: ServicesProvider,
    private route:ActivatedRoute

) {
  this.oEstado_bolas=VARIABLES.oEstado_bolas;

  this.route.params.subscribe(params => {
    this.idEvento=params['eventoId'];
    this.getEventoId();
  });

  /*this.oEvento={"eventos":[{"eve_imagen":"http://proyecto-um.herokuapp.com/uploads/teatro.jpg","eve_ultima_actualizacion":"2019-05-30T16:00:23.474Z","_id":"5cef8893f15486435412e308","eve_nombre":"Muestra Curtural ","eve_lugar":"Mall principal Torre Emblematica","eve_fecha_inicio":"2019/05/31 10:00:00","eve_fecha_fin":"2019/06/01 12:00:00","eve_organizador":"Dubby","eve_extension":"312","eve_costo":0,"eve_observacion":"Muestra Curtural delas diferentes regiones dl pais asociados a la universidad de manizales","eve_estado":"pendiente","__v":0}]}
  this.oEvento.eventos;
*/
 }
 fn_callModalEvento(){
  this.ModalDetEvento.show();
}
  ngOnInit() {
  }
  fn_indexador(){
  }
  getEventoId(){
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.get(SERVICES.GETEVENTOID+this.idEvento,{}).then(data=>{
      this.oEvento=data.evento;
      this.ServicesProvider.oDifusionEnviar.nombre=this.oEvento.eve_nombre
      if(this.oEvento.eve_brochure){
        let brochure=this.oEvento.eve_brochure.split(".");
        let nombre_brochure=this.oEvento.eve_brochure.split("/");
        this.brochure=
        {
          "extension":brochure[brochure.length-1],
          "icon":this.ServicesProvider.fn_getIconMedia(this.oEvento.eve_brochure),
          "url":this.oEvento.eve_brochure,
          "nombre":nombre_brochure[nombre_brochure.length-1]
        };          
        
      }else{
        this.brochure=false;
      }

      this.ServicesProvider.preloaderOff();
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });

  }
    

}

