import { OnInit ,Component,ViewChildren,QueryList,ElementRef, ViewChild} from '@angular/core'; //, Input, Output, EventEmitter  
import { ServicesProvider } from '../../providers/services';
import { Router } from '@angular/router';
import {VARIABLES} from '../../config/variables';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import  {SERVICES } from '../../config/webservices';
import  {MESSAGES } from '../../config/messages';
@Component({
  selector: 'curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  @ViewChildren('cards') divs: QueryList<ElementRef>
  @ViewChild('modalPrograma') modalPrograma: any;
  @ViewChild('modalPrueba') modalPrueba: any;
  oEstado_bolas=VARIABLES.oEstado_bolas;  
  formPrograma: FormGroup;
  formDataPrograma:any = new FormData();
  prog:any="PREGRADO";
  aProgramas:any=[];
  preview:any=false;
  previewBrochure:any=false;
  bSaveEdit=false;
  bSaveEditPrueba=false;
  oProgramaOriginal:any;
  fechas:any;
  filtro_fecha:any;
  fechaEspanol:any;
  ocultarTipoPos:any=true;
  oReqTipoGrado:any={}
  //REQUISITO OPCION DE GRADO
  requisito:any;
  opciongrado:any;
  selectopciongrado: any = [];
  selectrequisito: any = [];
  //REQUISITO OPCION DE GRADO
  oProgramaSeleccionado:any;
  oFacultades=VARIABLES.oFacultad;
  aCursos:any =[];
  aTopMes:any=[];
  Cursos:any=
    [
      {
        "Categoria":"Top Vistos",
        "Items":
        [{"nombre":"VISTO 1",
        "descripcion":"Convierte en desarrollador FrontEnd",
        "programa":"Programación",
        "imagen":"https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg"},
        {"nombre":"VISTO 2",
        "descripcion":"Convierte en desarrollador FrontEnd",
        "programa":"Programación",
        "imagen":"https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"},
        {"nombre":"VISTO 3",
        "descripcion":"Convierte en desarrollador FrontEnd",
        "programa":"Programación",
        "imagen":"https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg"},
        {"nombre":"VISTO 3",
        "descripcion":"Convierte en desarrollador FrontEnd",
        "programa":"Programación",
        "imagen":"https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg"}
      ]
    },     
      {
        "Categoria":"Top Compras",
        "Items":
        [{"nombre":"PUNTUADO 1",
        "descripcion":"Convierte en desarrollador FrontEnd",
        "programa":"Programación",
        "imagen":"https://www.ease2code.com/wp-content/uploads/2017/10/Pentaho-logo-ease2code.jpeg"},
        {"nombre":"PUNTUADO 2",
        "descripcion":"Convierte en desarrollador FrontEnd",
        "programa":"Programación",
        "imagen":"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(22).jpg"},
        {"nombre":"PUNTUADO 3",
        "descripcion":"Convierte en desarrollador FrontEnd",
        "programa":"Programación",
        "imagen":"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(22).jpg"},
        {"nombre":"VISTO 3",
        "descripcion":"Convierte en desarrollador FrontEnd",
        "programa":"Programación",
        "imagen":"https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg"}
      ]
    },
      {
          "Categoria":"Recientes",
          "Items":
          [{"nombre":"RECIENTE 1",
          "descripcion":"Convierte en desarrollador FrontEnd",
          "programa":"Programación",
          "imagen":"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(22).jpg"},
          {"nombre":"RECIENTE 2",
          "descripcion":"Convierte en desarrollador FrontEnd",
          "programa":"Programación",
          "imagen":"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(22).jpg"},
          {"nombre":"RECIENTE 3",
          "descripcion":"Convierte en desarrollador FrontEnd",
          "programa":"Programación",
          "imagen":"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(22).jpg"},
          {"nombre":"VISTO 3",
          "descripcion":"Convierte en desarrollador FrontEnd",
          "programa":"Programación",
          "imagen":"https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg"}
        ]
      }
          
    ]
  


  checkModalidad:any={
    "virtual":true,
    "presencial":true,
    "presencial_virtual":true
  }

  checkPrograma:any={
    "ofertado":true,
    "noOfertado":false
  }
  
  
  checkFilters:any={
    "maestria":true,
    "doctorado":true,
    "especializacion":true,
    "posdoctoral":true
  };

  checkFiltersPregrado:any={
    "tecnico":true,
    "tecnologia":true,
    "profesional":true
  };


  oFaculad:any=[
    "Ciencias e Ingeniería",
    "Ciencias Contables, Económicas y Administrativas",
    "Ciencias Sociales y Humanas",
    "Ciencias Jurídicas",
    "Ciencias de la Salud"
  ]

  oTipoPosgrado:any=[
    "Especialización",
    "Maestría",
    "Doctorado",
    "Posdoctoral",
  ]
  oTipoPregrado:any=[
    "Tecnología",
    "Técnico",
    "Profesional"
  ];

  checkFacultad:any={
    "Ciencias e Ingeniería":true,
    "Ciencias Contables, Económicas y Administrativas":true,
    "Ciencias Sociales y Humanas":true,
    "Ciencias Jurídicas":true,
    "Ciencias de la Salud":true
  };

  constructor(
    public fb: FormBuilder,  
    private ServicesProvider: ServicesProvider,
    private router : Router

) {
  this.checkFacultad["todos"]=true;
  this.formPrograma = fb.group({
    prog_nombre: ['', [Validators.required]],
    prog_snies:['', [Validators.required]], 
    prog_registro_calificado: [''],
    prog_acreditacion_de_alta_calidad: [''],
    prog_titulo_otorgado: ['', [Validators.required]],
    prog_duracion_estimada: ['', [Validators.required]],
    prog_numero_de_creditos: [''],
    prog_intensidad_horaria:[''],
    prog_valor_matricula:[''],
    prog_contacto:[''],
    prog_correo:[''],     
    prog_facultad:['', [Validators.required]], 
    prog_tipo:['', [Validators.required]],
    prog_jornada:[''],
    prog_modalidad_de_formacion:[''],
    prog_beca_bien:[''],     
    prog_tipo_posgrado:['', [Validators.required]], 
    prog_tipo_pregrado:['', [Validators.required]], 
    prog_ofertado:['', [Validators.required]], 
    prog_requisitos: [[], []],
    prog_opcion_grado: [[], []],
    prog_brochure:[''],
    prog_img:[''],
    prog_ext:['', []]
  });
  this.fechas=this.ServicesProvider.getCurrentDates();
  this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.fechas.hoy);
  this.formDataPrograma.append("token", localStorage.getItem("token"));
}
  fn_changeTipoPrograma(){
    setTimeout(()=>{
      if(this.formPrograma.controls['prog_tipo'].value=="PREGRADO"){
        this.formPrograma.get('prog_tipo_posgrado')!.setValidators([]); // or clearValidators()
        this.formPrograma.get('prog_tipo_posgrado')!.updateValueAndValidity();
        this.formPrograma.get('prog_tipo_pregrado')!.setValidators([Validators.required]); // or clearValidators()
        this.formPrograma.get('prog_tipo_pregrado')!.updateValueAndValidity();
        
      }else{
        this.formPrograma.get('prog_tipo_pregrado')!.setValidators([]); // or clearValidators()
        this.formPrograma.get('prog_tipo_pregrado')!.updateValueAndValidity();
        this.formPrograma.get('prog_tipo_posgrado')!.setValidators([Validators.required]); // or clearValidators()
        this.formPrograma.get('prog_tipo_posgrado')!.updateValueAndValidity();
  
      }
    })

  }

  fn_checkTodos(){
    if(this.checkFacultad.todos){
      for(var i in this.checkFacultad){
        this.checkFacultad[i]=true;
      }
    }
    else{
      for(var i in this.checkFacultad){
        this.checkFacultad[i]=false;
      }
    }
  }

  fn_detailPrograma(item:any){
    this.router.navigate(['detalle-programa', {"data": JSON.stringify(item)}]);
  }

  fn_voltear(){
    for(var i in this.divs["_results"]){
      this.divs["_results"][i].toggle()
    }
  }
  
  ngOnInit() {
    this.fn_getProgramas();
  }

  fn_capturarFacultad(facultad:any){
    this.formPrograma.controls["prog_facultad"].setValue(facultad);
  }
  onSubmit(){}

  fn_ocultarTipoPos(tipo:any){
    if(tipo=="PREGRADO"){
      this.ocultarTipoPos=true;
    }else{this.ocultarTipoPos=false;}    
  }

  fn_callModalPrograma(saveEdit:boolean){
    this.preview=false;
    this.previewBrochure=false;
    this.bSaveEdit=saveEdit;
    this.fn_resetFormPrograma();
    this.modalPrograma.show();
    this.fn_changeTipoPrograma();


  }
  fn_callModalPrueba(saveEdit:boolean){
    this.bSaveEditPrueba=saveEdit;
    this.modalPrueba.show();

  }
  fn_desHabilitarJornada(virtual:any){
    if(virtual){
      this.formPrograma.controls["prog_jornada"].setValue("");
    }
  }

  fn_resetFormPrograma(){
    setTimeout(()=>{
      if(this.bSaveEdit){
        if(this.prog=="PREGRADO"){
          this.formPrograma.controls["prog_tipo"].setValue("PREGRADO");
          this.formPrograma.controls["prog_jornada"].setValue("Diurna");
        }else{
          this.formPrograma.controls["prog_tipo"].setValue("POSGRADO");
          this.formPrograma.controls["prog_jornada"].setValue("Diurna");
        }
      }

    })
    this.formPrograma.reset();
    this.fn_resetFormData();
  }

  fn_resetFormData(){
    this.formDataPrograma.delete('prog_requisitos[]');
    this.formDataPrograma.delete('prog_opcion_grado[]');
    this.formDataPrograma.delete('prog_nombre');
    this.formDataPrograma.delete('prog_snies');
    this.formDataPrograma.delete('prog_registro_calificado');
    this.formDataPrograma.delete("prog_acreditacion_de_alta_calidad");
    this.formDataPrograma.delete('prog_titulo_otorgado');
    this.formDataPrograma.delete('prog_duracion_estimada');
    this.formDataPrograma.delete('prog_numero_de_creditos');
    this.formDataPrograma.delete('prog_intensidad_horaria');
    this.formDataPrograma.delete('prog_valor_matricula');
    this.formDataPrograma.delete('prog_contacto');
    this.formDataPrograma.delete("prog_correo");
    this.formDataPrograma.delete("prog_facultad");
    this.formDataPrograma.delete('prog_tipo');
    this.formDataPrograma.delete('prog_jornada');
    this.formDataPrograma.delete('prog_modalidad_de_formacion');
    this.formDataPrograma.delete("prog_beca_bien");
    this.formDataPrograma.delete("prog_tipo_posgrado");
    this.formDataPrograma.delete("prog_tipo_pregrado");
    this.formDataPrograma.delete("prog_ext");
    this.formDataPrograma.delete("prog_ofertado");
    
    this.formDataPrograma.delete("accion");
    this.requisito="";
    this.opciongrado="";
    this.selectopciongrado=[];
    this.selectrequisito=[];

  }

  onAdd(tipo:any) {
   
    if(tipo=='opciongrado'){
      
     if(this.selectopciongrado.indexOf(this.opciongrado)==-1){
       this.selectopciongrado.push(this.opciongrado);
       this.formPrograma.controls["prog_opcion_grado"].setValue(this.selectopciongrado);
       this.opciongrado="";
    }
    else{
       this.ServicesProvider.fn_generarAlerta("Error", "El elemento "+ this.opciongrado+" ya existe");
    }
   }else if(tipo=='requisito'){
     if(this.selectrequisito.indexOf(this.requisito)==-1){
       this.selectrequisito.push(this.requisito);
       this.formPrograma.controls["prog_requisitos"].setValue(this.selectrequisito);
       this.requisito="";
       
    }
    else{
       this.ServicesProvider.fn_generarAlerta("Error", "El elemento "+ this.requisito+" ya existe");
    }
    
   }
  }
  
  //funcion para borrar elementos de los arreglos observacion ,requisitos, horarios
  fn_borrar(index:any,tipo:any){

   if(tipo=='opciongrado'){
    for(let i=0; i<=this.selectopciongrado.length; i++){
      if(index==this.selectopciongrado[i]){
        this.selectopciongrado.splice(i,1)
        this.formPrograma.controls["prog_opcion_grado"].setValue(this.selectopciongrado);
      }
    }
   }
  else if(tipo=='requisito'){
    for(let i=0; i<=this.selectrequisito.length; i++){
      if(index==this.selectrequisito[i]){
        this.selectrequisito.splice(i,1);
        this.formPrograma.controls["prog_requisitos"].setValue(this.selectrequisito);
      }
    }
  
   }
  }
    
 fn_indexador(){
  setTimeout(()=>{
    if(this.ServicesProvider.parametrosSeccion){
      if(  this.ServicesProvider.parametrosSeccion.filtro=="pregrado"){
        console.log(1);
        if(this.prog=="POSGRADO"){
          this.fn_voltear();
        }
        this.prog="PREGRADO";

      }

      else if(this.ServicesProvider.parametrosSeccion.filtro=="posgrado"){

        if(this.prog=="PREGRADO"){
          console.log(this.prog,this.ServicesProvider.parametrosSeccion.filtro);
     
          this.fn_voltear();
        }
        this.prog="POSGRADO";

        this.checkModalidad.presencial=true;
        this.checkModalidad.virtual=true;
        this.checkModalidad.presencial_virtual=true;

        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;

      }
      else if(  this.ServicesProvider.parametrosSeccion.filtro=="especializacion"){
        console.log(3);

        if(this.prog=="PREGRADO"){
          this.fn_voltear();
        }
        this.prog="POSGRADO";
        this.checkFilters.maestria=false;
        this.checkFilters.doctorado=false;
        this.checkFilters.especializacion=true;
        this.checkFilters.posdoctoral=false;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;

        this.checkModalidad.presencial=true;
        this.checkModalidad.virtual=true;
        this.checkModalidad.presencial_virtual=true;
    
      }
    
      else if(  this.ServicesProvider.parametrosSeccion.filtro=="maestria"){

        if(this.prog=="PREGRADO"){
          this.fn_voltear();
        }
        this.prog="POSGRADO";
        this.checkFilters.maestria=true;
        this.checkFilters.doctorado=false;
        this.checkFilters.especializacion=false;
        this.checkFilters.posdoctoral=false;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;

        this.checkModalidad.presencial=true;
        this.checkModalidad.virtual=true;
        this.checkModalidad.presencial_virtual=true;
    
      }
    
      else if(  this.ServicesProvider.parametrosSeccion.filtro=="doctorado"){

        if(this.prog=="PREGRADO"){
          this.fn_voltear();
        }
        this.prog="POSGRADO";
        this.checkFilters.maestria=false;
        this.checkFilters.doctorado=true;
        this.checkFilters.especializacion=false;
        this.checkFilters.posdoctoral=false;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;
        
        this.checkModalidad.presencial=true;
        this.checkModalidad.virtual=true;
        this.checkModalidad.presencial_virtual=true;


      }
    
      else if(  this.ServicesProvider.parametrosSeccion.filtro=="posdoctorado"){

        if(this.prog=="PREGRADO"){
          this.fn_voltear();
        }
        this.prog="POSGRADO";
        this.checkFilters.maestria=false;
        this.checkFilters.doctorado=false;
        this.checkFilters.especializacion=false;
        this.checkFilters.posdoctoral=true;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;
        
        this.checkModalidad.presencial=true;
        this.checkModalidad.virtual=true;
        this.checkModalidad.presencial_virtual=true;

    
      }

      else if(  this.ServicesProvider.parametrosSeccion.filtro=="presencial"){
        this.checkModalidad.presencial=true;
        this.checkModalidad.virtual=false;
        this.checkModalidad.presencial_virtual=true;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;

      }
      else if(  this.ServicesProvider.parametrosSeccion.filtro=="virtual"){
        this.checkModalidad.presencial=false;
        this.checkModalidad.virtual=true;
        this.checkModalidad.presencial_virtual=true;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;
      }
      else if(  this.ServicesProvider.parametrosSeccion.filtro=="presencial_virtual"){
        this.checkModalidad.presencial=false;
        this.checkModalidad.virtual=false;
        this.checkModalidad.presencial_virtual=true;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;
      }
      else if(  this.ServicesProvider.parametrosSeccion.filtro=="tecnico"){
        this.checkFiltersPregrado.tecnico=true;
        this.checkFiltersPregrado.tecnologia=false;
        this.checkFiltersPregrado.profesional=false;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;

        this.checkModalidad.presencial=true;
        this.checkModalidad.virtual=true;
        this.checkModalidad.presencial_virtual=true;

        this.checkFilters.maestria=false;
        this.checkFilters.doctorado=false;
        this.checkFilters.especializacion=false;
        this.checkFilters.posdoctoral=false;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;

        if(this.prog=="POSGRADO"){
          this.fn_voltear();
        }
        this.prog="PREGRADO"
      }
      else if(  this.ServicesProvider.parametrosSeccion.filtro=="tecnologia"){
        this.checkFiltersPregrado.tecnico=false;
        this.checkFiltersPregrado.tecnologia=true;
        this.checkFiltersPregrado.profesional=false;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;

        this.checkModalidad.presencial=true;
        this.checkModalidad.virtual=true;
        this.checkModalidad.presencial_virtual=true;

        this.checkFilters.maestria=false;
        this.checkFilters.doctorado=false;
        this.checkFilters.especializacion=false;
        this.checkFilters.posdoctoral=false;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;

        if(this.prog=="POSGRADO"){
          this.fn_voltear();
        }
        this.prog="PREGRADO"
      }
      else if(  this.ServicesProvider.parametrosSeccion.filtro=="profesional"){
        this.checkFiltersPregrado.tecnico=false;
        this.checkFiltersPregrado.tecnologia=false;
        this.checkFiltersPregrado.profesional=true;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;

        this.checkModalidad.presencial=true;
        this.checkModalidad.virtual=true;
        this.checkModalidad.presencial_virtual=true;

        this.checkFilters.maestria=false;
        this.checkFilters.doctorado=false;
        this.checkFilters.especializacion=false;
        this.checkFilters.posdoctoral=false;
        this.checkPrograma.noOfertado=true;
        this.checkPrograma.ofertado=true;

        if(this.prog=="POSGRADO"){
          this.fn_voltear();
        }
        this.prog="PREGRADO"
      }
      else if(this.ServicesProvider.parametrosSeccion.filtro=="ofertado"){
        this.checkPrograma.ofertado=false;
        this.checkPrograma.noOfertado=true;
      }
      else if(this.ServicesProvider.parametrosSeccion.filtro=="noOfertado"){
        this.checkPrograma.ofertado=true;
        this.checkPrograma.noOfertado=false
        ;
      }
    }

  })


 }
//OBTENER PROGRAMAS
 fn_getProgramas(){
  //this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.filtro_fecha);

  this.ServicesProvider.preloaderOn();
  //se transforma fecha a yyyy-mm-dd
  //let fecha=this.fechas.hoy.split("/")
  this.ServicesProvider.get(SERVICES.GETCURSOS,{}).then(data=>{
    console.log(data.cursos);
    this.aCursos = data.cursos;
    let a:any=this.aCursos[0].cur_fecha.split("-");
    let f=new Date();
    let topMes:any=
    [
      {
        "Categoria":"Top Vistos",
        "Items":
        []
    },     
      {
        "Categoria":"Top Compras",
        "Items":[]
    },
      {
          "Categoria":"Recientes",
          "Items":[]
      }
          
    ]
    for(var i in topMes){
      for (var j in this.aCursos) {
        if(a[1]==f.getMonth()+1){
          topMes[i].Items.push(this.aCursos[j]);

        }
        
      }
    }
    this.aTopMes=topMes;
 console.log(this.aTopMes);

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
    this.ServicesProvider.preloaderOff();
}


fn_submitFormPrograma(formGroup: FormGroup) {

  if (formGroup.valid) {
    if(this.opciongrado || this.requisito ){
      this.ServicesProvider.generarPopupGenerico("Advertencia","Tienes información en el campo de texto de 'opción de grado' o 'requisitos', asegurate de agregarlos y podrás guardar los cambios");
    }
    else{
      if(this.bSaveEdit){
        this.fn_addPrograma();
      }
      else{
        this.fn_editPrograma();
      }
    }


  } else {
    this.validateAllFormFields(formGroup); 
  }
}

//MODAL
fn_acciones_seccion(accion:any){
  this.formDataPrograma.delete("categoria");
  this.formDataPrograma.delete("accion");
  this.formDataPrograma.append("categoria","programa");
  this.formDataPrograma.append("accion",accion);
}
validateAllFormFields(formGroup: FormGroup){
  this.ServicesProvider.validateAllFormFields(formGroup);
}
//AÑADIR PROGRMAS
fn_setFormData(){

  if(this.formPrograma.controls["prog_opcion_grado"].value){
    for (var i = 0; i < this.formPrograma.controls["prog_opcion_grado"].value.length; i++) {
      this.formDataPrograma.append('prog_opcion_grado', this.formPrograma.controls["prog_opcion_grado"].value[i]);
    }
  }else{
    this.formDataPrograma.delete('prog_opcion_grado[]');
    this.formDataPrograma.delete('prog_opcion_grado');
  }
if(this.formPrograma.controls["prog_requisitos"].value){
  for (var i = 0; i < this.formPrograma.controls["prog_requisitos"].value.length; i++) {
    this.formDataPrograma.append('prog_requisitos', this.formPrograma.controls["prog_requisitos"].value[i]);
  }
}else{

  //this.formDataPrograma.append('prog_requisitos', ["Ninguno"])
  this.formDataPrograma.delete('prog_requisitos[]');
  this.formDataPrograma.delete('prog_requisitos');

}
if(this.formPrograma.controls["prog_beca_bien"].value){
  this.formDataPrograma.append("prog_beca_bien", this.formPrograma.controls["prog_beca_bien"].value);
}else{
  this.formDataPrograma.append("prog_beca_bien", 0);
}
  this.formDataPrograma.append("prog_duracion_estimada", this.formPrograma.controls["prog_duracion_estimada"].value);
  this.formDataPrograma.append("prog_nombre", this.formPrograma.controls["prog_nombre"].value);
  this.formDataPrograma.append("prog_snies", this.formPrograma.controls["prog_snies"].value);
  this.formDataPrograma.append("prog_registro_calificado", this.formPrograma.controls["prog_registro_calificado"].value);
  this.formDataPrograma.append("prog_acreditacion_de_alta_calidad", this.formPrograma.controls["prog_acreditacion_de_alta_calidad"].value);
  this.formDataPrograma.append("prog_titulo_otorgado", this.formPrograma.controls["prog_titulo_otorgado"].value);
  this.formDataPrograma.append("prog_valor_matricula", this.formPrograma.controls["prog_valor_matricula"].value);
  this.formDataPrograma.append("prog_numero_de_creditos", this.formPrograma.controls["prog_numero_de_creditos"].value);
  this.formDataPrograma.append("prog_intensidad_horaria", this.formPrograma.controls["prog_intensidad_horaria"].value);
  this.formDataPrograma.append("prog_contacto", this.formPrograma.controls["prog_contacto"].value);
  this.formDataPrograma.append("prog_correo", this.formPrograma.controls["prog_correo"].value);
  this.formDataPrograma.append("prog_facultad", this.formPrograma.controls["prog_facultad"].value);
  this.formDataPrograma.append("prog_tipo", this.formPrograma.controls["prog_tipo"].value);
  this.formDataPrograma.append("prog_jornada", this.formPrograma.controls["prog_jornada"].value);
  this.formDataPrograma.append("prog_modalidad_de_formacion", this.formPrograma.controls["prog_modalidad_de_formacion"].value);
  this.formDataPrograma.append("prog_tipo_posgrado",this.formPrograma.controls["prog_tipo_posgrado"].value);
  this.formDataPrograma.append("prog_tipo_pregrado", this.formPrograma.controls["prog_tipo_pregrado"].value);
  this.formDataPrograma.append("prog_ext", this.formPrograma.controls["prog_ext"].value);
  this.formDataPrograma.append("prog_ofertado", this.formPrograma.controls["prog_ofertado"].value);
  this.fn_changeTipoPrograma();

}

fn_addPrograma(){ 
  this.fn_resetFormData();
  this.fn_setFormData();
  this.ServicesProvider.preloaderOn();
  this.fn_acciones_seccion('add');

  
  this.ServicesProvider.post(SERVICES.ADDPROGRAMA,this.formDataPrograma,true,localStorage.getItem("token")).then(data=>{

    if(data.message.toLowerCase()=="registro afectado".toLowerCase()){
      if(!this.ServicesProvider.parametrosSeccion){
        this.ServicesProvider.parametrosSeccion={};
      }
      
      this.ServicesProvider.parametrosSeccion.filtro=this.prog.toLowerCase();

      this.modalPrograma.hide();
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.insertar);

      this.fn_getProgramas();
    } 
    else if(data.message.toLowerCase()=="registro pendiente".toLowerCase()){
      if(!this.ServicesProvider.parametrosSeccion){
        this.ServicesProvider.parametrosSeccion={};
      }
      this.ServicesProvider.parametrosSeccion.filtro=this.prog.toLowerCase();

      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      this.modalPrograma.hide();
      this.ServicesProvider.preloaderOff();
    }
    else{
      if(!this.ServicesProvider.parametrosSeccion){
        this.ServicesProvider.parametrosSeccion={};
      }
      this.ServicesProvider.parametrosSeccion.filtro=this.prog.toLowerCase();

      this.ServicesProvider.fn_generarAlerta("error", data.message);
      this.modalPrograma.hide();
      this.ServicesProvider.preloaderOff();  
    }
    //this.aDetalleAvance.unshift();
    //this.router.navigate(["home"]);

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
}

//EDITAR PROGRAMA

facultad:any;

 fn_setDataProgramaEdit(item:any){
  this.formDataPrograma.delete('prog_requisitos[]');
  this.formDataPrograma.delete('prog_opcion_grado[]');
  this.formDataPrograma.delete('prog_requisitos');
  this.formDataPrograma.delete('prog_opcion_grado');

  this.oProgramaOriginal=item;
  console.log(this.oProgramaOriginal)
  this.fn_resetFormPrograma();

  for (let i in  this.oFaculad) {
    if(this.oFaculad[i]==item.prog_facultad){
      this.formPrograma.controls["prog_facultad"].setValue(this.oFaculad[i]);
    }
  }
  this.selectopciongrado=this.oProgramaOriginal.prog_opcion_grado.slice(0);
  this.formPrograma.controls["prog_opcion_grado"].setValue(this.selectopciongrado);
  this.selectrequisito=this.oProgramaOriginal.prog_requisitos.slice(0);
  this.formPrograma.controls["prog_requisitos"].setValue(this.selectrequisito);
  this.formPrograma.controls["prog_nombre"].setValue(item.prog_nombre);
  this.formPrograma.controls["prog_snies"].setValue(item.prog_snies);
  this.formPrograma.controls["prog_registro_calificado"].setValue(item.prog_registro_calificado);
  this.formPrograma.controls["prog_acreditacion_de_alta_calidad"].setValue(item.prog_acreditacion_de_alta_calidad);
  this.formPrograma.controls["prog_titulo_otorgado"].setValue(item.prog_titulo_otorgado);
  this.formPrograma.controls["prog_duracion_estimada"].setValue(item.prog_duracion_estimada);
  this.formPrograma.controls["prog_numero_de_creditos"].setValue(item.prog_numero_de_creditos);
  this.formPrograma.controls["prog_intensidad_horaria"].setValue(item.prog_intensidad_horaria);
  this.formPrograma.controls["prog_valor_matricula"].setValue(item.prog_valor_matricula);
  this.formPrograma.controls["prog_contacto"].setValue(item.prog_contacto);
  this.formPrograma.controls["prog_correo"].setValue(item.prog_correo);
  this.formPrograma.controls["prog_tipo"].setValue(item.prog_tipo);
  this.formPrograma.controls["prog_jornada"].setValue(item.prog_jornada);
  this.formPrograma.controls["prog_modalidad_de_formacion"].setValue(item.prog_modalidad_de_formacion);
  this.formPrograma.controls["prog_beca_bien"].setValue(item.prog_beca_bien);
  this.formPrograma.controls["prog_tipo_posgrado"].setValue(item.prog_tipo_posgrado);
  this.formPrograma.controls["prog_tipo_pregrado"].setValue(item.prog_tipo_pregrado);
  this.formPrograma.controls["prog_ext"].setValue(item.prog_ext);
  this.formPrograma.controls["prog_ofertado"].setValue(item.prog_ofertado);
  this.preview=item.prog_img;
  this.previewBrochure=item.prog_brochure;
  if(this.previewBrochure){
    let prevbrochure=this.previewBrochure.split("/");
    this.previewBrochure={"icon":this.ServicesProvider.fn_getIconMedia(this.previewBrochure),"nombre":prevbrochure[prevbrochure.length-1],"url":item.prog_brochure}

  }
 
  
 }
 fn_editPrograma(){
  //this.fn_postReqTipoGrado();
  //this.fn_setFormData();
  //this.fn_resetFormEvento();
  this.fn_resetFormData();

  let keys:any=Object.keys(this.formPrograma.controls);

  for(var i in keys){

    if(this.formPrograma.controls[keys[i]].value!=this.oProgramaOriginal[keys[i]]){
      //this.formEvento.controls[keys[i]].setValue(this.oEventoOriginal[keys[i]]);

      //esto se hizo por el formato dd/mm/yyyy ya que no esta pegado dd/mm/yyyy hh:mm:ss
        if(keys[i]!="prog_img" && keys[i]!="prog_brochure" && keys[i]!="prog_opcion_grado" && keys[i]!="prog_requisitos"){
          if(keys[i]=="prog_beca_bien" && !keys[i].value){
            this.formDataPrograma.append("prog_beca_bien", 0);
          }
          else{
            this.formDataPrograma.append(keys[i], this.formPrograma.controls[keys[i]].value);
          }

        }

      //this.formDataEvento.append(this.formEvento.controls[keys[i]], this.formEvento.controls[keys[i]].value);

    }
  }
  if(this.formPrograma.controls["prog_opcion_grado"].value.length!=0){
    for (var j = 0; j < this.formPrograma.controls["prog_opcion_grado"].value.length; j++) {
      this.formDataPrograma.append('prog_opcion_grado', this.formPrograma.controls["prog_opcion_grado"].value[j]);
    }
  }else{
    this.formDataPrograma.append('prog_opcion_grado', ["ninguno"]); 
  }
if(this.formPrograma.controls["prog_requisitos"].value.length!=0){
  for (var k = 0; k < this.formPrograma.controls["prog_requisitos"].value.length; k++) {
    this.formDataPrograma.append('prog_requisitos', this.formPrograma.controls["prog_requisitos"].value[k]);
  }
}else{
  this.formDataPrograma.append('prog_requisitos', ["ninguno"]);
}


  this.fn_acciones_seccion('update');
  this.ServicesProvider.preloaderOn();
  this.ServicesProvider.post(SERVICES.GETCURSOS+"/"+this.oProgramaOriginal._id, this.formDataPrograma,true,localStorage.getItem("token")).then(data=>{
      if(data.message.toLowerCase()=="registro afectado"){
        if(!this.ServicesProvider.parametrosSeccion){
          this.ServicesProvider.parametrosSeccion={};
        }
        this.ServicesProvider.parametrosSeccion.filtro=this.prog.toLowerCase();
        console.log(this.ServicesProvider.parametrosSeccion.filtro);

        this.modalPrograma.hide();
        this.fn_getProgramas();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);
        console.log(this.ServicesProvider.parametrosSeccion.filtro);

      }
      
      else if(data.message.toLowerCase()=="registro pendiente"){
        if(!this.ServicesProvider.parametrosSeccion){
          this.ServicesProvider.parametrosSeccion={};
        }
        this.ServicesProvider.parametrosSeccion.filtro=this.prog.toLowerCase();
        console.log(this.ServicesProvider.parametrosSeccion.filtro);
        this.modalPrograma.hide();
        this.fn_getProgramas();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);

      }
      else{
        if(!this.ServicesProvider.parametrosSeccion){
          this.ServicesProvider.parametrosSeccion={};
        }
        this.ServicesProvider.parametrosSeccion.filtro=this.prog.toLowerCase();

        this.modalPrograma.hide();
        this.ServicesProvider.fn_generarAlerta("Error", data.message);
      }
      //this.router.navigate(["home"]);
    this.ServicesProvider.preloaderOff();

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
}
 

//ELIMINAR PROGRAMA
fn_AdvertenciaElimPrograma(id:any){
  this.ServicesProvider.generarPopupGenerico("Advertencia", "¿Desea eliminarlo?","fn_deletePrograma",this,id);
}

fn_deletePrograma(id:any){
  this.fn_acciones_seccion('delete');
  this.ServicesProvider.preloaderOn();
  let oSendDeletePrograma={
    "categoria":"programa",
    "accion":"delete"
  }
  this.ServicesProvider.post(SERVICES.DELETE_PROGRAMA+"/"+id, oSendDeletePrograma,true,localStorage.getItem("token")).then(data=>{
      
    if(data.message.toLowerCase()=="registro afectado"){
      if(!this.ServicesProvider.parametrosSeccion){
        this.ServicesProvider.parametrosSeccion={};
      }
      this.ServicesProvider.parametrosSeccion.filtro=this.prog.toLowerCase();

      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.eliminar);
      this.fn_getProgramas();
    }
    else if(data.message.toLowerCase()=="registro pendiente"){
      if(!this.ServicesProvider.parametrosSeccion){
        this.ServicesProvider.parametrosSeccion={};
      }
      this.ServicesProvider.parametrosSeccion.filtro=this.prog.toLowerCase();
      

      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      this.fn_getProgramas();

    }
    else{
      if(!this.ServicesProvider.parametrosSeccion){
        this.ServicesProvider.parametrosSeccion={};
      }
      this.ServicesProvider.parametrosSeccion.filtro=this.prog.toLowerCase();

      this.ServicesProvider.fn_generarAlerta("Error", data.message);
    }
    this.ServicesProvider.preloaderOff();

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema eliminando el evento, por favor intentalo de nuevo",null);
    });
}
fn_callFile(){
  document.getElementById("inputfile")!.click();
 }
fileChange(event:any) {
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
      let file: any = fileList[0];
      this.formDataPrograma.delete('prog_img');
      this.formDataPrograma.append('prog_img', file, file.name);
      //this.formEvento.controls["eve_imagen"].setValue(file)
      this.showImage(event.target);
    }
  else{
    this.preview=false;
  }

}
//mostrar previa de la imágen
showImage(inputValue: any): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();
  myReader.onloadend = () => {
    this.preview = myReader.result;
  }
  myReader.readAsDataURL(file);
}

fn_callBrochure(){
  document.getElementById("inputbrochure")!.click();
 }
fileChangeBrochure(event:any) {
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
      let file: any = fileList[0];
      this.formDataPrograma.delete('prog_brochure');
      this.formDataPrograma.append('prog_brochure', file, file.name);
      //this.formEvento.controls["eve_imagen"].setValue(file)
      this.previewBrochure={"icon":this.ServicesProvider.fn_getIconMedia(file.name),"nombre":file.name};
    }
  else{
    this.previewBrochure=false;
  }

}


}
