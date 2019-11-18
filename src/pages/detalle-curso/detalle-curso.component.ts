import { OnInit ,Component} from '@angular/core'; //, Input, Output, EventEmitter 
//import { ServicesProvider } from '../../providers/services';
import { ActivatedRoute } from '@angular/router';
//import {VARIABLES} from '../../config/variables';
import { ServicesProvider } from '../../providers/services';
import  {SERVICES } from '../../config/webservices';

@Component({
  selector: 'detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.scss']
})
export class DetalleCursoComponent implements OnInit {
    idCurso:string;
    oCursoSeleccionado:any;
    brochure:any;
    constructor(
        private ServicesProvider: ServicesProvider,
        private route: ActivatedRoute
     
      ){
        this.route.params.subscribe(params => {
          this.idCurso=params['cursoId'];
        });
      }

  ngOnInit() {
      this.getCursoId();
  }

  getCursoId(){

    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.get(SERVICES.CURSOS+"/"+this.idCurso,{}).then(data=>{
        console.log(data.curso);
        this.oCursoSeleccionado=data.curso;

      this.ServicesProvider.preloaderOff();
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });

  }



}
