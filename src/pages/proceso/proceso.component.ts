import { OnInit ,Component,ViewChild,ViewChildren,QueryList,ElementRef} from '@angular/core'; //, Input, Output, EventEmitter 
import { ServicesProvider } from '../../providers/services';
import  {SERVICES } from '../../config/webservices';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import  {MESSAGES } from '../../config/messages';
import {VARIABLES} from '../../config/variables';
@Component({
    selector: 'proceso',
    templateUrl: './proceso.component.html',
    styleUrls: ['./proceso.component.scss']
  })

export class ProcesoComponent implements OnInit {
  @ViewChild('modalProceso') modalProceso: any;
  formProceso: FormGroup;
  oProceso:any={};
  aProcesos:any=[];
  aCuentas:any=[];
  preview:any=false;
  bSaveEdit=false;
  oProcesoOriginal:any;
  index_proceso:any;
  indexCuenta:any;
  oEstado_bolas=VARIABLES.oEstado_bolas;  
  fechas:any;
  filtro_fecha:any;
  fechaEspanol:any;
  @ViewChildren('acc_proceso') acc_proceso: QueryList<ElementRef>
  @ViewChild("scrollproceso") scrollproceso:any;

//TRATAMIENTO DE ARRAY OBSERVACION, REQUISITO, descripcion
observacion:any;
descripcion:any;
selectobservacion: any = [];
selectdescripcion: any = [];

//TRATAMIENTO DE ARRAY OBSERVACION, REQUISITO, descripcion

    constructor(private ServicesProvider: ServicesProvider, public fb: FormBuilder
      ){ 
       

      this.formProceso = fb.group({

        pro_nombre: ['', [Validators.required]],
        pro_observacion: [[], []],
        pro_descripcion: [[], []],
      });
      //this.oProceso["token"]= localStorage.getItem("token");
      this.fechas=this.ServicesProvider.getCurrentDates();
      this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.fechas.hoy);
    }
    ngOnInit(){   
     this.fn_getCuentas();
     this.fn_getProceso();
    }
    fn_indexador(){
      if(this.ServicesProvider.parametrosSeccion){
        //this.se
        if(this.index_proceso=this.ServicesProvider.parametrosSeccion.filtro=="cuenta"){
          this.indexCuenta=this.ServicesProvider.parametrosSeccion.id;
          setTimeout(()=>{
            var elmnt:any = document.getElementById(this.indexCuenta);
            elmnt.scrollIntoView({ block: 'start',  behavior: 'smooth' });
          })
        }
        else{
          this.index_proceso=this.ServicesProvider.parametrosSeccion.id;
          setTimeout(()=>{
            let el: HTMLElement = this.scrollproceso.nativeElement;
            el.click();
          })

        }
        
      }
    }

    fn_getCuentas(){
      //this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.filtro_fecha);
    
      this.ServicesProvider.preloaderOn();
      //se transforma fecha a yyyy-mm-dd
      //let fecha=this.fechas.hoy.split("/")
      this.ServicesProvider.get(SERVICES.GETCUENTASBANCARIAS,{}).then(data=>{
    
        this.aCuentas=data.cuentas;
        console.log(this.aCuentas);

    
        this.ServicesProvider.preloaderOff();
        }, _fail => {
          this.ServicesProvider.preloaderOff();
          this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
        });
    }
/*
    fn_getCuentas(){
      //this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.filtro_fecha);
    
      this.ServicesProvider.preloaderOn();
      this.ServicesProvider.getjson("../../assets/data/cuentas-bancarias.json",{}).then(data=>{
        console.log(data);
        this.aCuentas=data;
        console.log(this.aCuentas);
        this.ServicesProvider.preloaderOff();
        }, _fail => {
          this.ServicesProvider.preloaderOff();
          this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
        });
    }
   */
    fn_callModalProceso(saveEdit:boolean){
      this.preview=false;
      this.bSaveEdit=saveEdit;
      this.fn_resetFormProceso();
      this.modalProceso.show();
    }

    fn_resetFormProceso(){
      this.formProceso.reset();
      this.fn_resetFormData();
    }

    fn_resetFormData(){
      delete this.oProceso.pro_nombre;
      delete this.oProceso.pro_observacion;
      delete this.oProceso.pro_descripcion;
      delete this.oProceso.accion;
      this.selectobservacion=[];
      this.selectdescripcion=[];      
    }

    fn_submitFormProceso(formGroup: FormGroup) {
      if (formGroup.valid) {
    
        if(!this.formProceso.controls["pro_observacion"].value || !this.formProceso.controls["pro_descripcion"].value ){
          this.ServicesProvider.generarPopupGenerico("Advertencia","Quedan observaciones o una descripción pendiente sin guardar, asegurate de agregarlas");
        }
        else{
          if(this.bSaveEdit){
            
            this.fn_addProceso();
          }
          else{
            this.fn_editProceso();
          }
        }


    
      } else {
        this.validateAllFormFields(formGroup); 
      }
    }
    validateAllFormFields(formGroup: FormGroup){
      this.ServicesProvider.validateAllFormFields(formGroup);
    }

    fn_acciones_seccion(accion:any){

      this.oProceso.categoria="proceso";
      this.oProceso.accion=accion;
    }

    //funcion para añadir elementos de los arreglos observacion ,descripcion
 onAdd(tipo:any) {
  if(tipo=='observacion'){
   if(this.selectobservacion.indexOf(this.observacion)==-1){
     this.selectobservacion.push(this.observacion);
     this.formProceso.controls["pro_observacion"].setValue(this.selectobservacion);
     console.log(this.formProceso.controls["pro_observacion"].value);
     this.observacion="";
  }
  else{
     this.ServicesProvider.fn_generarAlerta("Error", "El elemento "+ this.observacion+" ya existe");
  }
 }else if(tipo=='descripcion'){
   if(this.selectdescripcion.indexOf(this.descripcion)==-1){
     this.selectdescripcion.push(this.descripcion);
     this.formProceso.controls["pro_descripcion"].setValue(this.selectdescripcion);
     console.log(this.formProceso.controls["pro_descripcion"].value);
     this.descripcion="";
  }
  else{
     this.ServicesProvider.fn_generarAlerta("Error", "El elemento "+ this.descripcion+" ya existe");
  }
  
 }


}

//funcion para borrar elementos de los arreglos observacion ,requisitos, horarios
fn_borrar(index:any,tipo:any){
 if(tipo=='observacion'){
   this.selectobservacion.splice(index,1)
   console.log(this.formProceso.controls["pro_observacion"].value);
 }
else if(tipo=='descripcion'){
   this.selectdescripcion.splice(index,1)
   console.log(this.formProceso.controls["pro_descripcion"].value);
 }
}


//OBTENER PROCESOS
    fn_getProceso(){
      this.ServicesProvider.preloaderOn();
      this.ServicesProvider.get(SERVICES.GETPROCESOS,{}).then(data=>{
        this.aProcesos=data.procesos;
        

        this.fn_indexador();

        this.ServicesProvider.preloaderOff();
        }, _fail => {
          this.ServicesProvider.preloaderOff();
          this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
        });
    }
//AGREGAR PROCESO

fn_setFormData(){
  this.oProceso.pro_nombre=this.formProceso.controls["pro_nombre"].value;
  this.oProceso.pro_observacion=this.formProceso.controls["pro_observacion"].value;
  this.oProceso.pro_descripcion=this.formProceso.controls["pro_descripcion"].value;
}

fn_addProceso(){ 
  this.fn_resetFormData();
  this.fn_setFormData();
  this.ServicesProvider.preloaderOn();
  this.fn_acciones_seccion('add');
  this.ServicesProvider.post(SERVICES.ADDPROCESO,this.oProceso,true,localStorage.getItem("token")).then(data=>{
    console.log(data);
    if(data.message.toLowerCase()=="registro afectado".toLowerCase()){
      this.modalProceso.hide();
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.insertar);
      console.log(MESSAGES);

      this.fn_getProceso();
    } 
    else if(data.message.toLocaleLowerCase()=="registro pendiente".toLocaleLowerCase()){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      console.log(MESSAGES.pendiente);
      this.modalProceso.hide();
      this.ServicesProvider.preloaderOff();
    }
    else{
      this.ServicesProvider.fn_generarAlerta("error", data.message);
      this.modalProceso.hide();
      this.ServicesProvider.preloaderOff();  
    }
    //this.aDetalleAvance.unshift();
    //this.router.navigate(["home"]);

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
  
}

//EDITAR PROCESO

fn_editProceso(){
  //this.fn_setFormData();
  //this.fn_resetFormEvento();
  this.fn_resetFormData();
  let keys:any=Object.keys(this.formProceso.controls);
  console.log(this.oProcesoOriginal);
  for(var i in keys){
    if(this.formProceso.controls[keys[i]].value!=this.oProcesoOriginal[keys[i]]){
          this.oProceso[keys[i]]=this.formProceso.controls[keys[i]].value;
    }
  }
  console.log(this.oProceso);
  this.fn_acciones_seccion('update');
  this.ServicesProvider.preloaderOn();
  this.ServicesProvider.post(SERVICES.GETPROCESOS+"/"+this.oProcesoOriginal._id, this.oProceso,true,localStorage.getItem("token")).then(data=>{
      if(data.message.toLowerCase()=="registro afectado"){
        this.modalProceso.hide();
        this.fn_getProceso();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);
      }
      
      else if(data.message.toLowerCase()=="registro pendiente"){
        this.modalProceso.hide();
        this.fn_getProceso();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      }
      else{
        this.modalProceso.hide();
        this.ServicesProvider.fn_generarAlerta("Error", data.message);
      }
      //this.router.navigate(["home"]);
    this.ServicesProvider.preloaderOff();

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
}

fn_setDataProcesoEdit(item:any){
  this.oProcesoOriginal=item;
  console.log(this.oProcesoOriginal)
  this.fn_resetFormProceso();


  this.formProceso.controls["pro_nombre"].setValue(item.pro_nombre);
  if(this.oProcesoOriginal!.pro_observacion){
    this.selectobservacion=this.oProcesoOriginal.pro_observacion.slice(0);
  }
  if(this.oProcesoOriginal.pro_descripcion){
    this.selectdescripcion=this.oProcesoOriginal.pro_descripcion.slice(0);
  }
  this.formProceso.controls["pro_observacion"].setValue(this.selectobservacion);
  this.formProceso.controls["pro_descripcion"].setValue(this.selectdescripcion);

}

//ELIMINAR PROCESO

fn_AdvertenciaElimProceso(id:any){
  this.ServicesProvider.generarPopupGenerico("Advertencia", "¿Desea eliminarlo?","fn_deleteProceso",this,id);
}

fn_deleteProceso(id:any){
  this.fn_acciones_seccion('delete');
  this.ServicesProvider.preloaderOn();
  let oSendDeleteProceso={
    "categoria":"proceso",
    "accion":"delete"
  }
  this.ServicesProvider.post(SERVICES.DELETE_PROCESO+"/"+id, oSendDeleteProceso,true,localStorage.getItem("token")).then(data=>{
      
    if(data.message.toLocaleLowerCase()=="registro afectado"){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.eliminar);
      this.fn_getProceso();
    }
    else if(data.message.toLocaleLowerCase()=="registro pendiente"){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      this.fn_getProceso();

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

}