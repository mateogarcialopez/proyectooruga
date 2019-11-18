

import { OnInit ,Component,ViewChild} from '@angular/core'; //, Input, Output, EventEmitter  
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
//import { Router } from '@angular/router';
import  {SERVICES } from '../../config/webservices';

import  {VARIABLES } from '../../config/variables';
import  {MESSAGES } from '../../config/messages';



//import  {SERVICES } from '../../config/webservices';


@Component({
  selector: 'evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  @ViewChild('modalEvento') modalEvento: any;
  oEventoOriginal:any;
  oEstado_bolas=VARIABLES.oEstado_bolas;
  aEventos:any;
  formEvento: FormGroup;
  formDataEvento:any = new FormData()
  opciones_fecha:any;
  opciones_fecha_fin:any;
  preview:any=false;
  bSaveEdit=false;
  fechas:any;
  filtro_fecha:any;
  fechaEspanol:any;
  previewBrochure:any=false;
  constructor(

    /*public fb: FormBuilder,*/  
    //private ServicesProvider: ServicesProvider,
    //private router : Router

    public fb: FormBuilder,
    private ServicesProvider: ServicesProvider


) {
  this.formDataEvento.append("token", localStorage.getItem("token"));

  this.formEvento = fb.group({
    eve_nombre: ['', [Validators.required]],
    eve_lugar: ['', Validators.required],
    eve_fecha_inicio:['', [Validators.required]],
    eve_fecha_fin:['', [Validators.required]],
    eve_hora_inicio:['', [Validators.required]],
    eve_hora_fin:['', [Validators.required]],
    eve_organizador:['', [Validators.required]],
    eve_imagen:['', []],
    eve_extension:['', [Validators.required]],
    eve_costo:['', [Validators.required]],
    eve_asistentes:['', [Validators.required]],
    eve_brochure:[''],
    eve_correo:["",[]],
    //eve_duracion:['', [Validators.required]],
    eve_observacion: ['', []]
  });
  this.fechas=this.ServicesProvider.getCurrentDates();
  this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.fechas.hoy);
console.log(this.fechas.hoy)
  this.fn_getEventos();


  this.opciones_fecha=this.ServicesProvider.getDatepickerOpt("posterior");
  this.opciones_fecha_fin=this.ServicesProvider.getDatepickerOpt("posterior");

 /* for(var i in this.aEventos){
    this.aEventos[i].eve_fecha=this.ServicesProvider.remainingDate(this.aEventos[i].eve_fecha).mensaje;
  }*/

 }
  ngOnInit() {
  }

  fn_indexador(){
  }

  fileChange(event:any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: any = fileList[0];
        this.formDataEvento.delete('eve_imagen');
        this.formDataEvento.append('eve_imagen', file, file.name);
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

//limpiar el formulario y limpiar el formdata
fn_resetFormEvento(){
  this.formEvento.reset();
  this.fn_resetFormData();
}

fn_resetFormData(){
  this.formDataEvento.delete('eve_nombre');
  this.formDataEvento.delete('eve_correo');
  this.formDataEvento.delete('eve_lugar');
  this.formDataEvento.delete('eve_fecha_inicio');
  this.formDataEvento.delete('eve_fecha_fin');
  //this.formDataEvento.delete('eve_hora');
  this.formDataEvento.delete('eve_organizador');
  this.formDataEvento.delete('eve_extension');
  this.formDataEvento.delete('eve_costo');   
  this.formDataEvento.delete('eve_asistentes');
  this.formDataEvento.delete('eve_observacion');
  this.formDataEvento.delete("categoria");
  this.formDataEvento.delete("url");
  this.formDataEvento.delete("accion");

}

fn_callModalEvento(saveEdit:boolean){
  this.preview=false;
  this.previewBrochure=false;
  this.bSaveEdit=saveEdit;
  this.fn_resetFormEvento();
  this.modalEvento.show();
}
//listar el array
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

fn_getEventos(){
  //this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.filtro_fecha);

  this.ServicesProvider.preloaderOn();
  //se transforma fecha a yyyy-mm-dd
  //let fecha=this.fechas.hoy.split("/")
  this.ServicesProvider.get(SERVICES.GETEVENTOS,{"fecha":this.fechas.hoy}).then(data=>{

    this.filtro_fecha=this.fechas.hoy;
    let oAuxFechas:any={"hoy":[],"semana":[],"mes":[]};
    data=data.eventos;
    for(var i in data){

      data[i].eve_fecha_inicio=this.fn_converDateT(data[i].eve_fecha_inicio);
      data[i].eve_fecha_fin=this.fn_converDateT(data[i].eve_fecha_fin);
      let fecha=data[i].eve_fecha_inicio;
      if(fecha.split(" ").length>1){
        fecha=fecha.split(" ")[0];
      }

      let fechahumana=this.ServicesProvider.fn_getFechaHumana( data[i].eve_fecha_inicio+" "+ data[i].eve_hora_inicio,data[i].eve_fecha_fin+" "+ data[i].eve_hora_fin);

      if(fecha==this.fechas.hoy){
        data[i].fechahumana=fechahumana;
        oAuxFechas["hoy"].push(data[i]);
      }
      else if(this.ServicesProvider.checkDateBetween(this.fechas.inicio_semana,this.fechas.fin_semana, fecha)){
        data[i].fechahumana=fechahumana;

        oAuxFechas["semana"].push(data[i]);
      }
      else{
        data[i].fechahumana=fechahumana;

        oAuxFechas["mes"].push(data[i]);
      }
    }
    this.aEventos=oAuxFechas;
    console.log(this.aEventos);

    oAuxFechas=[];


    this.ServicesProvider.preloaderOff();
    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
}
//crear formData para enviar a la petición web
fn_setFormData(){
  this.formDataEvento.append("eve_nombre", this.formEvento.controls["eve_nombre"].value);
  this.formDataEvento.append("eve_correo", this.formEvento.controls["eve_correo"].value);
  this.formDataEvento.append("eve_lugar", this.formEvento.controls["eve_lugar"].value);
  this.formDataEvento.append("eve_fecha_inicio", this.formEvento.controls["eve_fecha_inicio"].value + " "+this.formEvento.controls["eve_hora_inicio"].value+":00");
  this.formDataEvento.append("eve_fecha_fin", this.formEvento.controls["eve_fecha_fin"].value + " "+this.formEvento.controls["eve_hora_fin"].value+":00");
  //this.formDataEvento.append("eve_hora", this.formEvento.controls["eve_hora"].value);
  this.formDataEvento.append("eve_organizador", this.formEvento.controls["eve_organizador"].value);
  this.formDataEvento.append("eve_extension", this.formEvento.controls["eve_extension"].value);
  this.formDataEvento.append("eve_costo", this.formEvento.controls["eve_costo"].value);
  this.formDataEvento.append("eve_asistentes", this.formEvento.controls["eve_asistentes"].value);
  //this.formDataEvento.append("eve_duracion", this.formEvento.controls["eve_duracion"].value);
  this.formDataEvento.append("eve_observacion", this.formEvento.controls["eve_observacion"].value);
}

fn_acciones_seccion(accion:any){
  this.formDataEvento.delete("categoria");
  this.formDataEvento.delete("accion");
  this.formDataEvento.append("categoria","Evento");
  this.formDataEvento.append("accion",accion);
}

fn_addEvento(){

  this.fn_resetFormData();
  this.fn_setFormData();
  this.ServicesProvider.preloaderOn();
  this.fn_acciones_seccion('add');
  this.ServicesProvider.post(SERVICES.ADDEVENTO, this.formDataEvento,true,localStorage.getItem("token")).then(data=>{
    this.formDataEvento.delete('eve_imagen');
    this.formDataEvento.delete('eve_brochure');

    if(data.message.toLowerCase()=="registro afectado".toLowerCase()){
      this.modalEvento.hide();
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.insertar);

      this.fn_getEventos();
    } 
    else if(data.message.toLocaleLowerCase()=="registro pendiente".toLocaleLowerCase()){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      this.modalEvento.hide();
      this.ServicesProvider.preloaderOff();
    }
    else{
      this.ServicesProvider.fn_generarAlerta("error", data.message);
      this.modalEvento.hide();
      this.ServicesProvider.preloaderOff();  
    }
    //this.aDetalleAvance.unshift();
    //this.router.navigate(["home"]);

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
  
}

fn_setDataEventoEdit(item:any){
  this.oEventoOriginal=item;
  this.fn_resetFormEvento();
  let fecha_hora=item.eve_fecha_inicio.split(" ");
  let fecha_hora_fin=item.eve_fecha_fin.split(" ");


  this.formEvento.controls["eve_nombre"].setValue(item.eve_nombre);
  this.formEvento.controls["eve_correo"].setValue(item.eve_correo);
  this.formEvento.controls["eve_lugar"].setValue(item.eve_lugar);
  this.formEvento.controls["eve_fecha_inicio"].setValue(fecha_hora[0]);
  this.formEvento.controls["eve_hora_inicio"].setValue(fecha_hora[1]);
  this.formEvento.controls["eve_fecha_fin"].setValue(fecha_hora_fin[0]);
  this.formEvento.controls["eve_hora_fin"].setValue(fecha_hora_fin[1]);
  this.formEvento.controls["eve_organizador"].setValue(item.eve_organizador);
  this.formEvento.controls["eve_extension"].setValue(item.eve_extension);
  this.formEvento.controls["eve_costo"].setValue(item.eve_costo);
  this.formEvento.controls["eve_asistentes"].setValue(item.eve_asistentes)  
  //this.formEvento.controls["eve_duracion"].setValue(item.eve_duracion);
  this.formEvento.controls["eve_observacion"].setValue(item.eve_observacion);
  //this.formEvento.controls["eve_imagen"].setValue(item.eve_observacion);
  this.preview=item.eve_imagen;
  this.previewBrochure=item.eve_brochure;
  if(this.previewBrochure){
    let prevbrochure=this.previewBrochure.split("/");
    this.previewBrochure={"icon":this.ServicesProvider.fn_getIconMedia(this.previewBrochure),"nombre":prevbrochure[prevbrochure.length-1],"url":item.eve_brochure}

  }
}

fn_editEvento(){
  //this.fn_setFormData();
  //this.fn_resetFormEvento();
  this.fn_resetFormData();
  let keys:any=Object.keys(this.formEvento.controls);
  for(var i in keys){
    if(this.formEvento.controls[keys[i]].value!=this.oEventoOriginal[keys[i]]){
      //this.formEvento.controls[keys[i]].setValue(this.oEventoOriginal[keys[i]]);

      //esto se hizo por el formato dd/mm/yyyy ya que no esta pegado dd/mm/yyyy hh:mm:ss
      if(keys[i]=="eve_fecha_inicio" || keys[i]=="eve_fecha_fin"){
        let fecha=this.formEvento.controls[keys[i]].value;
        let fecha_hora_original=this.oEventoOriginal[keys[i]].split(" ");
        let eve_hora=keys[i].split("_");
        let hora=this.formEvento.controls["eve_hora_"+eve_hora[2]].value;

        if(fecha_hora_original[1]!=hora){
          this.formDataEvento.append(keys[i],fecha+ " "+hora);
        }
        if(fecha_hora_original[0]!=fecha){
          this.formDataEvento.append(keys[i],fecha+ " "+hora);
        }

      }
      else if(keys[i]=="eve_hora_inicio" || keys[i]=="eve_hora_fin"){
        
      }

      else if(keys[i]=="eve_imagen" || keys[i]=="eve_brochure"){
        /*if(this.preview!=this.oEventoOriginal[keys[i]]){

        }*/
      }
      else{
        this.formDataEvento.append(keys[i], this.formEvento.controls[keys[i]].value);
      }
      //this.formDataEvento.append(this.formEvento.controls[keys[i]], this.formEvento.controls[keys[i]].value);

    }
  }
  this.fn_acciones_seccion('update');
  this.ServicesProvider.preloaderOn();
  this.ServicesProvider.post(SERVICES.GETEVENTOS+"/"+this.oEventoOriginal._id, this.formDataEvento,true,localStorage.getItem("token")).then(data=>{
      if(data.message.toLowerCase()=="registro afectado"){
        this.modalEvento.hide();
        this.fn_getEventos();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);
      }
      
      else if(data.message.toLowerCase()=="registro pendiente"){
        this.modalEvento.hide();
        this.fn_getEventos();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      }
      else{
        this.modalEvento.hide();
        this.ServicesProvider.fn_generarAlerta("Error", data.message);
      }
      //this.router.navigate(["home"]);
    this.ServicesProvider.preloaderOff();

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
}

fn_callFile(){
 document.getElementById("inputfile")!.click();
}

validateAllFormFields(formGroup: FormGroup){
  this.ServicesProvider.validateAllFormFields(formGroup);
}

fn_submitFormEvento(formGroup: FormGroup) {
  if (formGroup.valid) {

    if(this.bSaveEdit){
      this.fn_addEvento();
    }
    else{
      this.fn_editEvento();
    }

  } else {
    this.validateAllFormFields(formGroup); 
  }
}

fn_AdvertenciaElimEvento(id:any){
  this.ServicesProvider.generarPopupGenerico("Advertencia", "¿Desea eliminar este evento?","fn_deleteEvento",this,id);
}

fn_deleteEvento(id:any){
  this.fn_acciones_seccion('delete');
  this.ServicesProvider.preloaderOn();
  let oSendDeleteEvento={
    "categoria":"Evento",
    "accion":"delete"
  }
  this.ServicesProvider.post(SERVICES.DELETE_EVENTO+"/"+id, oSendDeleteEvento,true,localStorage.getItem("token")).then(data=>{
      
    if(data.message.toLocaleLowerCase()=="registro afectado"){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.eliminar);
      this.fn_getEventos();
    }
    else if(data.message.toLocaleLowerCase()=="registro pendiente"){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      this.fn_getEventos();

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

fn_callBrochure(){
  document.getElementById("inputbrochure")!.click();
 }
fileChangeBrochure(event:any) {
  let fileList: FileList = event.target.files;
  console.log(fileList);
  if(fileList.length > 0) {
      let file: any = fileList[0];
      this.formDataEvento.delete('eve_brochure');
      this.formDataEvento.append('eve_brochure', file, file.name);
      //this.formEvento.controls["eve_imagen"].setValue(file)
    console.log(file.name);
      this.previewBrochure={"icon":this.ServicesProvider.fn_getIconMedia(file.name),"nombre":file.name};
      console.log(this.previewBrochure);
    }
  else{
    this.previewBrochure=false;
  }

}




}

