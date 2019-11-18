import { OnInit ,Component, ViewChild,ViewChildren,QueryList,ElementRef} from '@angular/core'; //, Input, Output, EventEmitter 
import { ServicesProvider } from '../../providers/services';
import  {SERVICES } from '../../config/webservices';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import  {MESSAGES } from '../../config/messages';
import  {VARIABLES } from '../../config/variables';
@Component({
  
  selector: 'becas',
  templateUrl: './becas.component.html',
  styleUrls: ['./becas.component.scss']
})

export class BecasComponent implements OnInit {
  @ViewChild('modalBeca') modalBeca: any;
  oEstado_bolas=VARIABLES.oEstado_bolas;
  aBecas:any=[];
  aNuevos:any[];
  preview:any=false;
  bSaveEdit=false;
  oBecas:any={};
  formBeca: FormGroup;
  condiciones:any;
  selectcondiciones: any = [];
  oBecaOriginal:any;
  index_beca:any;
  fechaEspanol:any;
  fechas:any;
  filtro_fecha:any;
  @ViewChild("scrollbeca") scrollbeca:any;
  @ViewChildren("acc_becas") acc_becas: QueryList<ElementRef>

  /*
  public becas_content = {
    mensajes_iniciales: [
      {
        icon: 'medal',
        contenido: 'Existen 55 tipos de Becas, Beneficios e Incentivos, el 44% de de éstas son tipo Beneficio'
      },
      {
        icon: 'hand-point-up',
        contenido: 'Sólo se otorga por estudiante un beneficio a la vez'
      }
    ],
    tipos_beca: [
      {
        tipo: 'Becas de ingreso',
        becas: [
          {
            titulo: 'Becas Bien',
            icon: 'thumbs-up',
            color: 'verde',
            descuento: 'Hasta de un 60%',
            descripcion: 'Becas para estudiantes que ingresen a jornada nocturna. Estas becas se diseñaron para estudiantes que trabajan en horario diurno y que sólo pueden acceder al proceso formativo universitario en horario nocturno',
            condiciones: [
              'Si un estudiante cae en Rendimiento Académico Insuficiente (RAI) el semestre siguiente debe pagar las materias que perdió, una vez superadas éstas puede retomar la Beca',
              'Si un estudiante se demora en culminar su proceso de estudia las Becas Bien cubre hasta 2 semestres más'
            ]
          },
          {
            titulo: 'Beca para Estudiantes de Alto Rendimiento Deportivo',
            icon: 'futbol',
            color: 'naranja',
            descuento: '50%',
            descripcion: 'Reconocimiento del 50% del valor de la matrícula a estudiantes que se destaque a nivel deportivo en diferentes disciplinas',
            condiciones: []
          },
          {
            titulo: 'Beca para Estudiantes destacados a nivel Cultural',
            icon: 'palette',
            color: 'rojo',
            descuento: '50%',
            descripcion: 'Se otorga el 50% de descuento en el valor de la matrícula para estudiantes que se desempeñen en artes escénicas (Teatro y Danza), instrumentista y de canto',
            condiciones: [
              'Los estudiantes deben ser destacados que representen alguna institución, banda o grupo'
            ]
          },
          {
            titulo: 'Beca para Comunidades Indígenas, Afro colombianas',
            icon: 'campground',
            color: 'amarillo',
            descuento: '25%',
            descripcion: 'La universidad otorga un (1) cupo y beca por valor del 25% del valor de la matricula durante el proceso formativo, en programas de pregrado',
            condiciones: [
              'La Beca cobija solamente a comunidades de Caldas, Quindío y Risaralda'
            ]
          },
          {
            titulo: 'Exoneración para núcleo familiar primer grado de consaguinidad',
            icon: 'users',
            color: 'azul',
            descuento: '5%',
            descripcion: 'Se exonera del 5% del valor de la matrícula para cada uno de los integrantes del mismo grupo familiar ( padres y hermanos)',
            condiciones: []
          },
          {
            titulo: 'Convenios empresariales',
            icon: 'building',
            color: 'gris',
            descuento: '',
            descripcion: 'Existen unos convenios con empresas, instituciones, cooperativas, etc en las cuales se otorgan unos beneficios adicionales a sus empleados',
            condiciones: [
              'Banco Agrario',
              'Policia',
              'Fiscalía',
              'Alcaldía',
              'Bienestar Familiar',
              'Gobernación de Caldas',
              'CODAS',
              'Universidad de Caldas',
              'Coofes'
            ]
          },
          {
            titulo: 'Póliza de accidentes',
            icon: 'exclamation-circle',
            color: 'amarillo',
            descuento: '',
            descripcion: 'Los estudiantes de la Universidad poseen una póliza de accidentes que tiene una cobertura a nivel Nacional con Seguros del Estado',
            condiciones: []
          },
        ]
      },
      {
        tipo: 'Becas estudiantes antiguos',
        becas: [
          {
            titulo: 'Beca por situación económica',
            icon: 'hand-holding-usd',
            color: 'verde',
            descuento: '50%',
            descripcion: 'Reconocimiento del 50% del valor de la matrícula durante un periodo académico',
            condiciones: [
              'Se otorga a partir de segundo semestre',
              'El estudiante debe haber cursado todas las asignaturas de extensión',
              'El estudiante debe tener un promedio de 4',
              'El estudiante realiza solicitud cada semestre durante los primeros quince días hábiles posteriores a su matrícula',
              'La Universidad otorga 20 becas semestrales',
              'Art. 110 y 111 del Reglamento Estudiantil'
            ]
          },
          {
            titulo: 'Beca para estudiantes deportistas destacados',
            icon: 'basketball-ball',
            color: 'naranja',
            descuento: 'Hasta del 100%',
            descripcion: 'Se otorga auxilio ecónomico a los deportistas que estén representando la Universidad y obentegan posiciones destacadas, de la siguiente manera:',
            condiciones: [
              'Juegos Interuniversitarios el 20% para el campeón sobre su valor de la matrícula',
              'Fase zonal juegos universitarios el 40% sobre el valor de la matrícula',
              'Juegos nacionales para el campeón 100% del valor de la matrícula y el 70% para el subcampeón'
            ]
          },
          {
            titulo: 'Becas culturales',
            icon: 'guitar',
            color: 'rojo',
            descuento: '50%',
            descripcion: 'Reconocimientos del 50% del valor de la matrícula a estudiantes que hacen parte de Extensión cultural',
            condiciones: [
              'Los estudiantes deben llevar como mínimo 1 año en alguno de los grupos'
            ]
          },
          {
            titulo: 'Beca Representantes Estudiantiles',
            icon: 'university',
            color: 'gris',
            descuento: 'Hasta del 100%',
            descripcion: 'La Universidad establece un estímulo para los estudiantes representantes a los consejos',
            condiciones: [
              'Se otorga el 100 % del valor de la matrícula a los representantes principales y suplentes al consejo Superior',
              '70% al consejo Académico',
              '40% al consejo de Facultad',
              '20% para representantes a los comités de curs',
              'Estos beneficios por un tiempo de duración al período por el cual fueron elegidos'
            ]
          },
          {
            titulo: 'Beneficio para hijos y conyugues de empleados',
            icon: 'child',
            color: 'azul',
            descuento: '50%',
            descripcion: 'Beneficio del 50% para hijos y conyugues de empleados (Personal docente y administrativo). Esta es una convención colectiva apoyada por los sindicatos ASODEN y ASPROFUM',
            condiciones: [
              'Que cursen sus estudios dentro de la universidad de Manizales.',
              'Administrativos: solo pregrado',
              'Docentes: Pregrado y posgrado'
            ]
          },
          {
            titulo: 'Monitorías',
            icon: 'id-card',
            color: 'gris',
            descuento: 'Hasta del 70%',
            descripcion: 'Beneficio para estudiantes que cumplen funciones de monitoría',
            condiciones: [
              'Se otorga una beca del  70% estudiantes que cumplen funciones de monitor administrativo durante 20 horas semanales',
              'Se otorga una beca del  35% estudiantes que cumplen funciones de monitor administrativo durante 10 horas semanales',
              'Se otorga una beca del  35% estudiantes que cumplen funciones de monitor académico durante 10 horas semanales',
              'Este beneficio se otorga a partir de 4 semestre'
            ]
          },
          {
            titulo: 'Becas por Excelencia Académica',
            icon: 'award',
            color: 'amarillo',
            descuento: 'Hasta del 70%',
            descripcion: 'Se otorga a (3) estudiantes con los mejores promedios por 70%, 50% y 30% del valor de la matrícula',
            condiciones: [
              'Aplica a partir de 2016'
            ]
          },
          {
            titulo: 'Becas para alimentación',
            icon: 'apple-alt',
            color: 'rojo',
            descuento: '',
            descripcion: 'Se otorga un subsidio por alimentación (almuerzos) durante todo el semestre para aquellos estudiantes que necesitan contar con un apoyo institucional para su sostenimiento.',
            condiciones: [
              'Aplica a partir de 2016'
            ]
          },
          {
            titulo: 'Beneficio para graduados',
            icon: 'graduation-cap',
            color: 'gris',
            descuento: '10%',
            descripcion: 'Beneficio del 10% en estudios de pregrado o posgrado de egresados',
            condiciones: []
          }
        ]
      }
    ]
  }
  */
  constructor(private ServicesProvider: ServicesProvider, public fb: FormBuilder){
    this.formBeca = fb.group({
      bec_tipo: ['', [Validators.required]],
      bec_titulo: ['', [Validators.required]],
      bec_descuento:['', [Validators.required]], 
      bec_condiciones: ['', []],
      bec_descripcion: ['', []]
    });
    this.fechas=this.ServicesProvider.getCurrentDates();
    this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.fechas.hoy);
  }
  ngOnInit() {
    this.fn_getBecas();
  }


fn_indexador(){
  setTimeout(()=>{
    if(this.ServicesProvider.parametrosSeccion){
      this.index_beca=this.ServicesProvider.parametrosSeccion.id;
      setTimeout(()=>{
        var elmnt:any = document.getElementById(this.index_beca);
        elmnt.scrollIntoView();

          for(var i in this.acc_becas["_results"]){
            if(this.acc_becas["_results"][i].nativeElement.id==this.index_beca){
              let el:HTMLElement=this.acc_becas["_results"][i].nativeElement;
                  el.click();
            }
          }
      })
    }
  })
}

//OBTENER PROGRAMAS

fn_getBecas(){
  //this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.filtro_fecha);

  this.ServicesProvider.preloaderOn();
  //se transforma fecha a yyyy-mm-dd
  //let fecha=this.fechas.hoy.split("/")
  this.ServicesProvider.get(SERVICES.GETBECAS,{}).then(data=>{

    let json:any={
      "mensajes_iniciales":[
        {
          icon: 'medal',
          contenido: 'Existen 55 tipos de Becas, Beneficios e Incentivos, el 44% de éstas son tipo Beneficio'
        },
        {
          icon: 'hand-point-up',
          contenido: 'Sólo se otorga por estudiante un beneficio a la vez'
        }
      ],
      "tipos_beca":[
        {
          "tipo": "Becas de ingreso",
          "becas": []
          
        },
        {
          "tipo": "Becas estudiantes antiguos",
          "becas": []
        }
      ]
    }
   for(var i in data.becas){
      if(data.becas[i].bec_tipo=="Becas de ingreso"){
        json.tipos_beca[0].becas.push(data.becas[i]);
      }
      else{
        json.tipos_beca[1].becas.push(data.becas[i]);
      }
    }

    this.aBecas=json;
    json=null;
    this.fn_indexador();


    this.ServicesProvider.preloaderOff();
    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
}


  //OBTENER BECAS
  fn_getBecass(){
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.get(SERVICES.GETBECAS,{}).then(data=>{
      this.aBecas=data;

      
      this.ServicesProvider.preloaderOff();
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
  }
//MODAL
  fn_callModalBeca(saveEdit:boolean){
    this.preview=false;
    this.bSaveEdit=saveEdit;
    this.fn_resetFormBeca();
    this.modalBeca.show();
  }

  fn_resetFormBeca(){
    this.formBeca.reset();
    this.fn_resetFormData();
  }
  
  fn_resetFormData(){
  
    delete this.oBecas.bec_tipo;
    delete this.oBecas.bec_titulo;
    delete this.oBecas.bec_descuento;
    delete this.oBecas.bec_condiciones;
    delete this.oBecas.bec_descripcion;
    this.selectcondiciones=[];

    
  }

  fn_acciones_seccion(accion:any){

    this.oBecas.categoria="beca";
    this.oBecas.accion=accion;
  }


  //AÑADIR BECAS

  fn_submitFormBeca(formGroup: FormGroup) {
    if (formGroup.valid) {
      if(!this.formBeca.controls["bec_condiciones"].value){
        this.ServicesProvider.generarPopupGenerico("Advertencia","Quedan observaciones o una descripción pendiente sin guardar, asegurate de agregarlas");
      }
      else{
        if(this.bSaveEdit){
          
          this.fn_addBeca();

        }
        else{
          this.fn_editBecas();
        }
      }  
    } else {
      this.validateAllFormFields(formGroup); 
    }
  }
  
  fn_setDataBecaEdit(item:any){
    this.oBecaOriginal=item;

    this.fn_resetFormBeca();
  
    this.formBeca.controls["bec_tipo"].setValue(item.bec_tipo);
    this.formBeca.controls["bec_titulo"].setValue(item.bec_titulo);
    this.formBeca.controls["bec_descuento"].setValue(item.bec_descuento);
    this.formBeca.controls["bec_descripcion"].setValue(item.bec_descripcion);
    if(this.oBecaOriginal!.bec_condiciones){
      this.selectcondiciones=this.oBecaOriginal.bec_condiciones.slice(0);
    }
    this.formBeca.controls["bec_condiciones"].setValue(this.selectcondiciones);

  
  }

  fn_editBecas(){
    //this.fn_setFormData();
    //this.fn_resetFormEvento();
    this.fn_resetFormData();
    let keys:any=Object.keys(this.formBeca.controls);

    for(var i in keys){
      if(this.formBeca.controls[keys[i]].value!=this.oBecaOriginal[keys[i]]){
            this.oBecas[keys[i]]=this.formBeca.controls[keys[i]].value;
      }
    }

    this.fn_acciones_seccion('update');
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.post(SERVICES.GETBECAS+"/"+this.oBecaOriginal._id,this.oBecas,true,localStorage.getItem("token")).then(data=>{
        if(data.message.toLowerCase()=="registro afectado"){
          this.modalBeca.hide();
          this.fn_getBecas();
          this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);
        }
        
        else if(data.message.toLowerCase()=="registro pendiente"){
          this.modalBeca.hide();
          this.fn_getBecas();
          this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
        }
        else{
          this.modalBeca.hide();
          this.ServicesProvider.fn_generarAlerta("Error", data.message);
        }
        //this.router.navigate(["home"]);
      this.ServicesProvider.preloaderOff();
  
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
  }


  fn_setFormData(){
    this.oBecas.bec_tipo=this.formBeca.controls["bec_tipo"].value;
    this.oBecas.bec_titulo=this.formBeca.controls["bec_titulo"].value;
    this.oBecas.bec_condiciones=this.formBeca.controls["bec_condiciones"].value;
    this.oBecas.bec_descripcion=this.formBeca.controls["bec_descripcion"].value;
    this.oBecas.bec_descuento=this.formBeca.controls["bec_descuento"].value;
  }
  fn_addBeca(){ 
    this.fn_resetFormData();
    this.fn_setFormData();
    this.ServicesProvider.preloaderOn();
    this.fn_acciones_seccion('add');
    this.ServicesProvider.post(SERVICES.ADDBECA,this.oBecas,true,localStorage.getItem("token")).then(data=>{

      if(data.message.toLowerCase()=="registro afectado".toLowerCase()){
        this.modalBeca.hide();
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.insertar);

  
        this.fn_getBecas();
      } 
      else if(data.message.toLocaleLowerCase()=="registro pendiente".toLocaleLowerCase()){
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);

        this.modalBeca.hide();
        this.ServicesProvider.preloaderOff();
      }
      else{
        this.ServicesProvider.fn_generarAlerta("error", data.message);
        this.modalBeca.hide();
        this.ServicesProvider.preloaderOff();  
      }
      //this.aDetalleAvance.unshift();
      //this.router.navigate(["home"]);
  
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
  }


  validateAllFormFields(formGroup: FormGroup){
    this.ServicesProvider.validateAllFormFields(formGroup);
  }


  //Borrar  BECA
fn_AdvertenciaElimBeca(id:any){
  this.ServicesProvider.generarPopupGenerico("Advertencia", "¿Desea eliminarlo?","fn_deleteBeca",this,id);
}

fn_deleteBeca(id:any){
  this.fn_acciones_seccion('delete');
  this.ServicesProvider.preloaderOn();
  let oSendDeleteBeca={
    "categoria":"beca",
    "accion":"delete"
  }
  this.ServicesProvider.post(SERVICES.DELETE_BECA+"/"+id, oSendDeleteBeca,true,localStorage.getItem("token")).then(data=>{
      
    if(data.message.toLocaleLowerCase()=="registro afectado"){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.eliminar);
      this.fn_getBecas();
    }
    else if(data.message.toLocaleLowerCase()=="registro pendiente"){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      this.fn_getBecas();

    }
    else{
      this.ServicesProvider.fn_generarAlerta("Error", data.message);
    }
    this.ServicesProvider.preloaderOff();

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema eliminando el evento, por favor intentalo de nuevo",null);
    });
}


    //funcion para añadir elementos de los arreglos observacion ,descripcion
    onAdd() {
    
       if(this.selectcondiciones.indexOf(this.condiciones)==-1){
         this.selectcondiciones.push(this.condiciones);
         this.formBeca.controls["bec_condiciones"].setValue(this.selectcondiciones);

         this.condiciones="";
      }
      else{
         this.ServicesProvider.fn_generarAlerta("Error", "El elemento "+ this.condiciones+" ya existe");
      }
     
    
    
    }
    
    //funcion para borrar elementos de los arreglos observacion ,requisitos, horarios
    fn_borrar(index:any){
       this.selectcondiciones.splice(index,1)
    }
    
  
}