import { OnInit ,Component, ViewChild} from '@angular/core'; //, Input, Output, EventEmitter 
import { ServicesProvider } from '../../providers/services';
import { Router } from '@angular/router';
import {VARIABLES} from '../../config/variables';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import  {SERVICES } from '../../config/webservices';
import  {MESSAGES } from '../../config/messages';
//import { fn } from '@angular/compiler/src/output/output_ast';
@Component({
    selector: 'curso-diplomado',
    templateUrl: './curso-diplomado.component.html',
    styleUrls: ['./curso-diplomado.component.scss']
  })

export class CursoDiplomadoComponent implements OnInit {
  @ViewChild('modalCursoDip') modalCursoDip: any;
  aCursosDiplomados:any=[];
  oFacultades:any=VARIABLES.oFacultad;
  oEstado_bolas=VARIABLES.oEstado_bolas;
  oTipoEstudio:any;
  bSaveEdit=false;
  formDataCursoDip:any = new FormData();
  formCursoDip: FormGroup;
  formCD: FormGroup;
  fechas:any;
  filtro_fecha:any;
  fechaEspanol:any;
  opciones_fecha:any;
  opciones_fecha_fin:any;
  aCursoDip:any;
  oCursoDipOriginal:any;
  oTestudio:any={}
  preview:any=false;
  previewBrochure:any=false
  oArray:any={}
//TRATAMIENTO DE ARRAY OBSERVACION, REQUISITO, HORARIO
  observacion:any;
  requisito:any;
  horario:any;
  selectobservacion: any = [];
  selecthorario: any = [];
  selectrequisito: any = [];
//TRATAMIENTO DE ARRAY OBSERVACION, REQUISITO, HORARIO


  oFaculad:any=[
    "Ciencias e Ingeniería",
    "Ciencias Contables, Económicas y Administrativas",
    "Ciencias Sociales y Humanas",
    "Ciencias Jurídicas",
    "Ciencias de la Salud",
    "General"
  ]
  checkFacultad:any={
    "Ciencias e Ingeniería":true,
    "Ciencias Contables, Económicas y Administrativas":true,
    "Ciencias Sociales y Humanas":true,
    "Ciencias Jurídicas":true,
    "Ciencias de la Salud":true
  }; 
 
  
  checkFilters:any={
    "ingenieria":true,
    "salud":true,
    "juridicas":true,
    "sociales":true,
    "contables":true,
    "general":true
  }

  checkFilterCD:any={
    "Curso":true,
    "Diplomado":true
  }
    constructor(
      public fb: FormBuilder,
      private ServicesProvider: ServicesProvider,
      private router : Router
    ){
      /*for(var i in this.oFacultades){
        this.checkFacultad[i]=true;
      }*/
      this.checkFacultad["General"]=true;
      this.checkFacultad["todos"]=true;
      this.checkFilterCD["todos"]=true;

      this.oFacultades["General"]={
        "icon": "fas fa-chalkboard-teacher",
        "background": "bg_general",
        "checkbox":"check_general",
        "color":"color_general"
      };

      this.formCursoDip = fb.group({
        dip_facultad: ['', [Validators.required]],
        dip_nombre: ['', [Validators.required]],
        dip_nivel:['', []], 
        dip_horario: [[]],
        dip_observacion: [[]],
        dip_requisito: [[]],
        dip_oferta: ['', []],
        dip_fechainscripcion:['',[Validators.required]],
        dip_fechalimiteinscripcion:['',[Validators.required]],
        dip_costo:[''],
        dip_duracion:[''],     
        dip_tipoestudio:['', [Validators.required]], 
        dip_img:[''],
        dip_brochure:[''],
        dip_hora_inicio:['',[Validators.required]],
        dip_hora_fin:['',[Validators.required]],
        dip_contacto:[''],
        dip_correo:[''],    
        dip_periodicidad:['',[Validators.required]],
      });
      this.fechas=this.ServicesProvider.getCurrentDates();
      this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.fechas.hoy);
      this.opciones_fecha=this.ServicesProvider.getDatepickerOpt("posterior");
      this.opciones_fecha_fin=this.ServicesProvider.getDatepickerOpt("posterior");
      this.formDataCursoDip.append("token", localStorage.getItem("token"));
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

    fn_checkTodosCD(){
      if(this.checkFilterCD.todos){
        for(var i in this.checkFilterCD){
          this.checkFilterCD[i]=true;
        }
      }
      else{
        for(var i in this.checkFilterCD){
          this.checkFilterCD[i]=false;
        }
      }
    }


    ngOnInit(){
      //this.fn_getDiplomados();
      this.fn_getCursoDip();
    }
 


    fn_detailCursoDiplomado(item:any){
      this.router.navigate(['detalle-dipip', {"data": JSON.stringify(item)}]);
    }
//MODAL
 fn_acciones_seccion(accion:any){
  this.formDataCursoDip.delete("categoria");
  this.formDataCursoDip.delete("accion");
  this.formDataCursoDip.append("categoria","curso_diplomado");
  this.formDataCursoDip.append("accion",accion);
}


    fn_callModalCursoDip(saveEdit:boolean){
      this.fn_changePeriodo();
      this.preview=false;
      this.previewBrochure=false;
      this.bSaveEdit=saveEdit;
      this.fn_resetFormCursoDip();
      this.modalCursoDip.show();
    }

    fn_resetFormCursoDip(){
      setTimeout(()=>{
        if(this.bSaveEdit){
            this.formCursoDip.controls["dip_periodicidad"].setValue("semanal");
            this.formCursoDip.controls["dip_tipoestudio"].setValue("Curso");
            this.fn_changePeriodo();
        }
  
      })
      this.formCursoDip.reset();
      this.fn_resetFormData();
    }
    
    fn_resetFormData(){
      this.formDataCursoDip.delete('dip_facultad');
      this.formDataCursoDip.delete('dip_nombre');
      this.formDataCursoDip.delete('dip_nivel');
      this.formDataCursoDip.delete("dip_horario[]");
      this.formDataCursoDip.delete('dip_observacion[]');
      this.formDataCursoDip.delete('dip_requisito[]');
      this.formDataCursoDip.delete('dip_oferta');
      this.formDataCursoDip.delete('dip_fechainscripcion');
      this.formDataCursoDip.delete('dip_fechalimiteinscripcion');
      this.formDataCursoDip.delete('dip_hora_inicio');
      this.formDataCursoDip.delete('dip_hora_fin');
      this.formDataCursoDip.delete('dip_contacto');
      this.formDataCursoDip.delete('dip_correo');
      this.formDataCursoDip.delete('dip_costo');
      this.formDataCursoDip.delete("dip_duracion");
      this.formDataCursoDip.delete("dip_tipoestudio");
      this.formDataCursoDip.delete("dip_periodicidad");
      this.formDataCursoDip.delete("accion");
      this.selectrequisito=[];
      this.selectobservacion=[];
      this.selecthorario=[];
      this.observacion="";
      this.requisito="";
      this.horario="";
    }

validateAllFormFields(formGroup: FormGroup){
  this.ServicesProvider.validateAllFormFields(formGroup);
}

    fn_submitFormCursoDip(formGroup: FormGroup) {
      if (formGroup.valid) {
            
        if(this.observacion || this.requisito || this.horario ){
          this.ServicesProvider.generarPopupGenerico("Advertencia","Quedan campos pendiente sin guardar en 'Observaciones','Horarios' o 'Requisistos', asegurate de agregarlos y podrás guardar los cambios");
        }else{
        if(this.bSaveEdit){
          this.fn_addCursoDip();
        }
        else{
          this.fn_editCursoDip();
        }
      }
    
      } else {
        this.validateAllFormFields(formGroup); 
      }
    }
    //add

    fn_setFormData(){

      if(this.formCursoDip.controls["dip_horario"].value){
        for (var i = 0; i < this.formCursoDip.controls["dip_horario"].value.length; i++) {
          this.formDataCursoDip.append('dip_horario', this.formCursoDip.controls["dip_horario"].value[i]);
        }
      }else{
        this.formDataCursoDip.delete("dip_horario[]");
        this.formDataCursoDip.delete("dip_horario");
      }
    
    if(this.formCursoDip.controls["dip_requisito"].value){
      for (var i = 0; i < this.formCursoDip.controls["dip_requisito"].value.length; i++) {
        this.formDataCursoDip.append('dip_requisito', this.formCursoDip.controls["dip_requisito"].value[i]);
      }
    }else{
      this.formDataCursoDip.delete('dip_requisito[]');
      this.formDataCursoDip.delete('dip_requisito');
    }
    
    if(this.formCursoDip.controls["dip_observacion"].value){
      for (var i = 0; i < this.formCursoDip.controls["dip_observacion"].value.length; i++) {
        this.formDataCursoDip.append('dip_observacion', this.formCursoDip.controls["dip_observacion"].value[i]);
      }
    }else{
    
      this.formDataCursoDip.delete('dip_observacion[]');
      this.formDataCursoDip.delete('dip_observacion');
    }
    if( this.formCursoDip.controls["dip_fechainscripcion"].value=="0" &&
    this.formCursoDip.controls["dip_fechalimiteinscripcion"].value=="0"){
      this.formDataCursoDip.append("dip_fechainscripcion", this.formCursoDip.controls["dip_fechainscripcion"].value);
      this.formDataCursoDip.append("dip_fechalimiteinscripcion", this.formCursoDip.controls["dip_fechalimiteinscripcion"].value);
    }else{
      this.formDataCursoDip.append("dip_fechainscripcion", this.formCursoDip.controls["dip_fechainscripcion"].value + " " + this.formCursoDip.controls["dip_hora_inicio"].value +":00");
      this.formDataCursoDip.append("dip_fechalimiteinscripcion", this.formCursoDip.controls["dip_fechalimiteinscripcion"].value + " " + this.formCursoDip.controls["dip_hora_fin"].value +":00");
    }
          
          this.formDataCursoDip.append("dip_facultad", this.formCursoDip.controls["dip_facultad"].value);
          this.formDataCursoDip.append("dip_nombre", this.formCursoDip.controls["dip_nombre"].value);
          this.formDataCursoDip.append("dip_nivel", this.formCursoDip.controls["dip_nivel"].value);     
          this.formDataCursoDip.append("dip_oferta", this.formCursoDip.controls["dip_oferta"].value);
          this.formDataCursoDip.append("dip_costo", this.formCursoDip.controls["dip_costo"].value);
          this.formDataCursoDip.append("dip_duracion", this.formCursoDip.controls["dip_duracion"].value);
          this.formDataCursoDip.append("dip_tipoestudio", this.formCursoDip.controls["dip_tipoestudio"].value);
          this.formDataCursoDip.append("dip_periodicidad", this.formCursoDip.controls["dip_periodicidad"].value);
          this.formDataCursoDip.append("dip_contacto", this.formCursoDip.controls["dip_contacto"].value);
          this.formDataCursoDip.append("dip_correo", this.formCursoDip.controls["dip_correo"].value);
        }
    fn_addCursoDip(){ 
      this.fn_resetFormData();
      this.fn_setFormData();
      this.ServicesProvider.preloaderOn();
      this.fn_acciones_seccion('add');
      this.ServicesProvider.post(SERVICES.ADDCURSODIP,this.formDataCursoDip,true,localStorage.getItem("token")).then(data=>{
        if(data.message.toLowerCase()=="registro afectado".toLowerCase()){
          this.modalCursoDip.hide();
          this.ServicesProvider.preloaderOff();
          this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.insertar);
    
          this.fn_getCursoDip();
        } 
        else if(data.message.toLocaleLowerCase()=="registro pendiente".toLocaleLowerCase()){
          this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
          this.modalCursoDip.hide();
          this.ServicesProvider.preloaderOff();
        }
        else{
          this.ServicesProvider.fn_generarAlerta("error", data.message);
          this.modalCursoDip.hide();
          this.ServicesProvider.preloaderOff();  
        }
        //this.aDetalleAvance.unshift();
        //this.router.navigate(["home"]);
    
        }, _fail => {
          this.ServicesProvider.preloaderOff();
          this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
        });
      
    }
    /*
    fn_converDateT(fecha:any){
      let fecha_formato_T=fecha.split("T");
      if(fecha_formato_T.length>1){
        let hora_t=fecha_formato_T[1].split(".");
        let fecha=fecha_formato_T[0].split("-");
        return fecha=fecha[0]+"/"+fecha[1]+"/"+fecha[2]+ " "+hora_t[0];
      }
      else{
        return fecha;
      }
    
    }
    */

   fn_changePeriodo(){
    setTimeout(()=>{
      if(this.formCursoDip.controls['dip_periodicidad'].value=="semanal" || this.formCursoDip.controls['dip_periodicidad'].value=="mensual"){
        this.formCursoDip.get('dip_fechainscripcion')!.setValidators([]); // or clearValidators()
        this.formCursoDip.get('dip_fechainscripcion')!.updateValueAndValidity();
        this.formCursoDip.get('dip_fechalimiteinscripcion')!.setValidators([]); // or clearValidators()
        this.formCursoDip.get('dip_fechalimiteinscripcion')!.updateValueAndValidity();
        this.formCursoDip.get('dip_hora_inicio')!.setValidators([]); // or clearValidators()
        this.formCursoDip.get('dip_hora_inicio')!.updateValueAndValidity();
        this.formCursoDip.get('dip_hora_fin')!.setValidators([]); // or clearValidators()
        this.formCursoDip.get('dip_hora_fin')!.updateValueAndValidity();
        if(this.bSaveEdit || this.formCursoDip.controls['dip_periodicidad'].value=="semanal" || this.formCursoDip.controls['dip_periodicidad'].value=="mensual"){
        this.formCursoDip.controls["dip_fechainscripcion"].setValue("0");
        this.formCursoDip.controls["dip_fechalimiteinscripcion"].setValue("0");
        this.formCursoDip.controls["dip_hora_inicio"].setValue("");
        this.formCursoDip.controls["dip_hora_fin"].setValue("");
        }
      }else{
        if(this.bSaveEdit || this.oCursoDipOriginal.dip_periodicidad=="semanal" || this.oCursoDipOriginal.dip_periodicidad=="mensual" ){
          this.formCursoDip.controls["dip_fechainscripcion"].setValue(this.fechas.hoy);
          this.formCursoDip.controls["dip_fechalimiteinscripcion"].setValue(this.fechas.hoy);
          this.formCursoDip.controls["dip_fechainscripcion"].reset();
          this.formCursoDip.controls["dip_fechalimiteinscripcion"].reset();
          this.formCursoDip.controls["dip_hora_inicio"].reset();
          this.formCursoDip.controls["dip_hora_fin"].reset();
        }
        this.formCursoDip.get('dip_fechainscripcion')!.setValidators([Validators.required]); // or clearValidators()
        this.formCursoDip.get('dip_fechainscripcion')!.updateValueAndValidity();
        this.formCursoDip.get('dip_fechalimiteinscripcion')!.setValidators([Validators.required]); // or clearValidators()
        this.formCursoDip.get('dip_fechalimiteinscripcion')!.updateValueAndValidity();
        this.formCursoDip.get('dip_hora_inicio')!.setValidators([Validators.required]); // or clearValidators()
        this.formCursoDip.get('dip_hora_inicio')!.updateValueAndValidity();
        this.formCursoDip.get('dip_hora_fin')!.setValidators([Validators.required]); // or clearValidators()
        this.formCursoDip.get('dip_hora_fin')!.updateValueAndValidity();
        
  
      }
    })

  }


//funcion para añadir elementos de los arreglos observacion ,requisitos, horarios

 onAdd(tipo:any) {
   if(tipo=='observacion'){
     
    if(this.selectobservacion.indexOf(this.observacion)==-1){
      this.selectobservacion.push(this.observacion);
      this.formCursoDip.controls["dip_observacion"].setValue(this.selectobservacion);
      this.observacion="";
   }
   else{
      this.ServicesProvider.fn_generarAlerta("Error", "El elemento "+ this.observacion+" ya existe");
   }
  }else if(tipo=='horario'){
    if(this.selecthorario.indexOf(this.horario)==-1){
      this.selecthorario.push(this.horario);
      this.formCursoDip.controls["dip_horario"].setValue(this.selecthorario);
      this.horario="";
   }
   else{
      this.ServicesProvider.fn_generarAlerta("Error", "El elemento "+ this.horario+" ya existe");
   }
   
  }else if(tipo=='requisito'){
    if(this.selectrequisito.indexOf(this.requisito)==-1){
      this.selectrequisito.push(this.requisito);
      this.formCursoDip.controls["dip_requisito"].setValue(this.selectrequisito);
      this.requisito="";
   }
   else{
      this.ServicesProvider.fn_generarAlerta("Error", "El elemento "+ this.requisito+" ya existe");
   }
  }


}

//funcion para borrar elementos de los arreglos observacion ,requisitos, horarios
fn_borrar(index:any,tipo:any){
  
  if(tipo=='observacion'){
    for(let i=0; i<=this.selectobservacion.length; i++){
      if(index==this.selectobservacion[i]){
    this.selectobservacion.splice(i,1)
    }
  }
}
  else if(tipo=='horario'){
    for(let i=0; i<=this.selecthorario.length; i++){
      if(index==this.selecthorario[i]){
      this.selecthorario.splice(i,1)
      }
    }
  }
  else if(tipo=='requisito'){
    for(let i=0; i<=this.selectrequisito.length; i++){
      if(index==this.selectrequisito[i]){
      this.selectrequisito.splice(i,1)
      }
    }
  }
}






//editar curso diplmado
/*
fn_editCursoDip(){
  //this.fn_setFormData();
  //this.fn_resetFormCursoDip();
  this.fn_resetFormData();
  this.fn_setFormData()
  this.fn_acciones_seccion('update');
  this.ServicesProvider.preloaderOn();
  this.ServicesProvider.post(SERVICES.GETCURSODIP+"/"+this.oCursoDipOriginal._id, this.formDataCursoDip,true,localStorage.getItem("token")).then(data=>{
      if(data.message.toLowerCase()=="registro afectado"){
        this.modalCursoDip.hide();
        this.fn_getCursoDip();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);
      }
      
      else if(data.message.toLowerCase()=="registro pendiente"){
        this.modalCursoDip.hide();
        this.fn_getCursoDip();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      }
      else{
        this.modalCursoDip.hide();
        this.ServicesProvider.fn_generarAlerta("Error", data.message);
      }
      //this.router.navigate(["home"]);
    this.ServicesProvider.preloaderOff();

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
}
*/
facultad:any;

fn_setDataCursoDipEdit(item:any){
  this.formDataCursoDip.delete("dip_horario[]");
  this.formDataCursoDip.delete('dip_observacion[]');
  this.formDataCursoDip.delete('dip_requisito[]');
  this.formDataCursoDip.delete("dip_horario");
  this.formDataCursoDip.delete('dip_observacion');
  this.formDataCursoDip.delete('dip_requisito');
  this.formDataCursoDip.delete('dip_fechainscripcion');
  this.formDataCursoDip.delete('dip_fechalimiteinscripcion');
  this.formDataCursoDip.delete('dip_hora_fin');
  this.formDataCursoDip.delete('dip_hora_inicio');
  console.log(item);
 this.oCursoDipOriginal=item;
 this.fn_resetFormCursoDip();
 let fecha_hora=item.dip_fechainscripcion.split(" ");
 let fecha_hora_fin=item.dip_fechalimiteinscripcion.split(" ");
 console.log(fecha_hora);
 for (let i in  this.oFaculad) {
   if(this.oFaculad[i]==item.dip_facultad){
     this.formCursoDip.controls["dip_facultad"].setValue(this.oFaculad[i]);
   }
 }
 
 this.formCursoDip.controls["dip_fechainscripcion"].setValue(fecha_hora[0]);
 this.formCursoDip.controls["dip_hora_inicio"].setValue(fecha_hora[1]);
 this.formCursoDip.controls["dip_fechalimiteinscripcion"].setValue(fecha_hora_fin[0]);
 this.formCursoDip.controls["dip_hora_fin"].setValue(fecha_hora_fin[1]);
 this.formCursoDip.controls["dip_nombre"].setValue(item.dip_nombre);
 this.formCursoDip.controls["dip_nivel"].setValue(item.dip_nivel);
 this.selectobservacion=this.oCursoDipOriginal.dip_observacion.slice(0);
 this.formCursoDip.controls["dip_observacion"].setValue(this.selectobservacion);
 this.selectrequisito=this.oCursoDipOriginal.dip_requisito.slice(0);
 this.formCursoDip.controls["dip_requisito"].setValue(this.selectrequisito);
 this.selecthorario=this.oCursoDipOriginal.dip_horario.slice(0);
 this.formCursoDip.controls["dip_horario"].setValue(this.selecthorario);
 this.formCursoDip.controls["dip_oferta"].setValue(item.dip_oferta);
 this.formCursoDip.controls["dip_costo"].setValue(item.dip_costo);
 this.formCursoDip.controls["dip_duracion"].setValue(item.dip_duracion);
 this.formCursoDip.controls["dip_tipoestudio"].setValue(item.dip_tipoestudio);
 this.formCursoDip.controls["dip_periodicidad"].setValue(item.dip_periodicidad);
 this.formCursoDip.controls["dip_contacto"].setValue(item.dip_contacto);
 this.formCursoDip.controls["dip_correo"].setValue(item.dip_correo);
 this.preview=item.dip_img;
 this.previewBrochure=item.dip_brochure;
 if(this.previewBrochure){
   let prevbrochure=this.previewBrochure.split("/");
   this.previewBrochure={"icon":this.ServicesProvider.fn_getIconMedia(this.previewBrochure),"nombre":prevbrochure[prevbrochure.length-1],"url":item.dip_brochure}
 }
}


 fn_editCursoDip(){
  this.fn_resetFormData();
  let keys:any=Object.keys(this.formCursoDip.controls);
  for(var i in keys){
    if(this.formCursoDip.controls[keys[i]].value!=this.oCursoDipOriginal[keys[i]]){
      //this.formCursoDip.controls[keys[i]].setValue(this.oCursoDipOriginal[keys[i]]);

      //esto se hizo por el formato dd/mm/yyyy ya que no esta pegado dd/mm/yyyy hh:mm:ss
        if(keys[i]!="dip_img" && keys[i]!="dip_brochure" && keys[i]!="dip_fechainscripcion" && keys[i]!="dip_fechalimiteinscripcion" && keys[i]!="dip_observacion" &&  keys[i]!="dip_requisito"  &&  keys[i]!="dip_horario"){
          this.formDataCursoDip.append(keys[i], this.formCursoDip.controls[keys[i]].value);
  
        }
        else if(keys[i]=="dip_fechainscripcion"){
          if(this.formCursoDip.controls["dip_fechainscripcion"].value=="0"){
            this.formDataCursoDip.append(keys[i], this.formCursoDip.controls[keys[i]].value);
           
          }else{
            this.formDataCursoDip.append(keys[i], this.formCursoDip.controls[keys[i]].value + " " +this.formCursoDip.controls["dip_hora_inicio"].value);
          }
          console.log(keys[i],this.formCursoDip.controls[keys[i]].value + " " +this.formCursoDip.controls["dip_hora_inicio"].value)
         
        }
        else if(keys[i]=="dip_fechalimiteinscripcion"){
          if(this.formCursoDip.controls["dip_fechalimiteinscripcion"].value=="0"){
            this.formDataCursoDip.append(keys[i], this.formCursoDip.controls[keys[i]].value);
           
          }else{
            this.formDataCursoDip.append(keys[i], this.formCursoDip.controls[keys[i]].value + " " +this.formCursoDip.controls["dip_hora_fin"].value);
          }
          console.log(keys[i],this.formCursoDip.controls[keys[i]].value + " " +this.formCursoDip.controls["dip_hora_fin"].value)
         
        }
 


      //this.formDataCursoDip.append(this.formCursoDip.controls[keys[i]], this.formCursoDip.controls[keys[i]].value);

    }
  }
  if(this.formCursoDip.controls['dip_periodicidad'].value=="ninguno"){
    this.formCursoDip.controls['dip_hora_inicio'].reset
    this.formCursoDip.controls['dip_hora_fin'].reset
    this.formDataCursoDip.delete('dip_hora_fin');
    this.formDataCursoDip.delete('dip_hora_inicio');
  }
  if(this.formCursoDip.controls["dip_horario"].value.length!=0){
    for (var j = 0; j < this.formCursoDip.controls["dip_horario"].value.length; j++) {
      this.formDataCursoDip.append('dip_horario', this.formCursoDip.controls["dip_horario"].value[j]);
    }
  }else{
    this.formDataCursoDip.append('dip_horario', ["ninguno"]);
  }

if(this.formCursoDip.controls["dip_requisito"].value.length!=0){
  for (var k = 0; k < this.formCursoDip.controls["dip_requisito"].value.length; k++) {
    this.formDataCursoDip.append('dip_requisito', this.formCursoDip.controls["dip_requisito"].value[k]);
  }
}else{
  this.formDataCursoDip.append('dip_requisito', ["ninguno"])
}

if(this.formCursoDip.controls["dip_observacion"].value.length!=0){
  for (var l = 0; l < this.formCursoDip.controls["dip_observacion"].value.length; l++) {
    this.formDataCursoDip.append('dip_observacion', this.formCursoDip.controls["dip_observacion"].value[l]);
  }
}else{
  this.formDataCursoDip.append('dip_observacion', ["ninguno"])
}
  this.fn_acciones_seccion('update');
  this.ServicesProvider.preloaderOn();
  this.ServicesProvider.post(SERVICES.GETCURSODIP+"/"+this.oCursoDipOriginal._id, this.formDataCursoDip,true,localStorage.getItem("token")).then(data=>{
    //nuevos campos  
      if(data.message.toLowerCase()=="registro afectado"){
        this.modalCursoDip.hide();
        this.fn_getCursoDip();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);
      }
      
      else if(data.message.toLowerCase()=="registro pendiente"){
        this.modalCursoDip.hide();
        this.fn_getCursoDip();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      }
      else{
        this.modalCursoDip.hide();
        this.ServicesProvider.fn_generarAlerta("Error", data.message);
      }
      //this.router.navigate(["home"]);
    this.ServicesProvider.preloaderOff();

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
}
fn_indexador(){
  if(this.ServicesProvider.parametrosSeccion){
    if(  this.ServicesProvider.parametrosSeccion.filtro=="curso"){
      this.checkFilterCD.Curso=true;
      this.checkFilterCD.Diplomado=false;
    }
    else if( this.ServicesProvider.parametrosSeccion.filtro=="diplomado"){
      this.checkFilterCD.Curso=false;
      this.checkFilterCD.Diplomado=true;
    }
  }
}

 fn_getCursoDip(){
  //this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.filtro_fecha);

  this.ServicesProvider.preloaderOn();
  //se transforma fecha a yyyy-mm-dd
  //let fecha=this.fechas.hoy.split("/")
  this.ServicesProvider.get(SERVICES.GETCURSODIP,{}).then(data=>{

    this.aCursosDiplomados=data.curso_diplomados;
    this.fn_indexador();


    this.ServicesProvider.preloaderOff();
    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
}



//eliminar curso diplomado
fn_AdvertenciaElimCursoDip(id:any){
  this.ServicesProvider.generarPopupGenerico("Advertencia", "¿Desea eliminarlo?","fn_deleteCursoDip",this,id);
}

fn_deleteCursoDip(id:any){
  this.fn_acciones_seccion('delete');
  this.ServicesProvider.preloaderOn();
  let oSendDeleteCursoDIp={
    "categoria":"curso_diplomado",
    "accion":"delete"
  }
  this.ServicesProvider.post(SERVICES.DELETE_CURSODIP+"/"+id, oSendDeleteCursoDIp,true,localStorage.getItem("token")).then(data=>{
      
    if(data.message.toLocaleLowerCase()=="registro afectado"){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.eliminar);
      this.fn_getCursoDip();
    }
    else if(data.message.toLocaleLowerCase()=="registro pendiente"){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      this.fn_getCursoDip();

    }
    else{
      this.ServicesProvider.fn_generarAlerta("Error", data.message);
    }
    this.ServicesProvider.preloaderOff();

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema eliminando el CursoDip, por favor intentalo de nuevo",null);
    });
}




fn_callFile(){
  document.getElementById("inputfile")!.click();
 }
fileChange(event:any) {
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
      let file: any = fileList[0];
      this.formDataCursoDip.delete('dip_img');
      this.formDataCursoDip.append('dip_img', file, file.name);
      //this.formCursoDip.controls["dip_imagen"].setValue(file)
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
      this.formDataCursoDip.delete('dip_brochure');
      this.formDataCursoDip.append('dip_brochure', file, file.name);
      //this.formCursoDip.controls["dip_imagen"].setValue(file)
      this.previewBrochure={"icon":this.ServicesProvider.fn_getIconMedia(file.name),"nombre":file.name};
    }
  else{
    this.previewBrochure=false;
  }

}

}