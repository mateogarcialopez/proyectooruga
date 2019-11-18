

import { OnInit ,Component} from '@angular/core'; //, Input, Output, EventEmitter  
//import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
import { Router } from '@angular/router';
//import  {SERVICES } from '../../config/webservices';
///import  {VARIABLES } from '../../config/variables';
//import  {MESSAGES } from '../../config/messages';


@Component({
  selector: 'institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.scss']
})
export class InstitucionComponent implements OnInit {
  aInstituciones:any;
  public number: number = 1000;
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

  oProgramas:any=
  {
    "Doctorados": "doctorado",
    "Especializaciones": "especializacion",
    "Maestrías": "maestria",
    "Posdoctorados": "posdoctorado",
    "Pregrados_presenciales": "presencial",
    "Pregrados_virtuales": "virtual",
    "Tecnicos": "tecnico",
    "Tecnologos": "tecnologia"
  }

  //@ViewChild ("clickscroll") clickscroll:any;
  //@ViewChildren('acc') acc: QueryList<ElementRef>

  
  
  constructor(

    private ServicesProvider: ServicesProvider,
    private router:Router
 /*   public fb: FormBuilder,/
    /*,
    private route:ActivatedRoute*/

) {
 
 }
  ngOnInit() {


    this.getInstituciones();

  }
  fn_indexador(){
  }

  fn_redirigirPrograma(curs:any){
    if(!this.ServicesProvider.parametrosSeccion){
      this.ServicesProvider.parametrosSeccion={};
    }
    this.ServicesProvider.parametrosSeccion.filtro=this.oProgramas[curs];
    this.router.navigate(["curs"]);
  }


  getInstituciones(){
    /*
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.get(SERVICES.INSTITUCION,{}).then(data=>{
      this.aInstituciones=data.Institucion;
      console.log(this.aInstituciones);
      this.ServicesProvider.preloaderOff();
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
*/
  }
    

}

