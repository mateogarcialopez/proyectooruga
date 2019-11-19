import { Component, OnInit } from '@angular/core';
import { SERVICES } from '../../../../config/webservices';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesProvider } from '../../../../providers/services';
//import  {MESSAGES } from '../../../../config//messages';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public page_title: string;
  formTopic: FormGroup;
  Topics: any = {};

  constructor(
    private ServicesProvider: ServicesProvider,
    public fb: FormBuilder,
  ) {

    this.page_title = 'Mis temas';
    this.formTopic = fb.group({
      titulo: ['', [Validators.required]],
      contenido: ['', [Validators.required]],
      material: ['', [Validators.required]],
      fecha: ['', []],
      user: [localStorage.getItem("id"), []],
      comentarios: [null, []],
    });
  }

  ngOnInit() {
    this.fn_getTopic();
  }

  prueba() {
    console.log("prueba de lsiatr")
  }
  fn_getTopic() {
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.get(SERVICES.GETTOPICS + localStorage.getItem("id"), {}).then(data => {
      console.log(data.topics);
      this.Topics = data.topics;
      this.ServicesProvider.preloaderOff();
    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo", null);
    });
  }

  fn_AdvertenciaElimProceso(id: any) {
    console.log(id);
  }

  /*fn_deleteProceso(id:any){
    //this.fn_acciones_seccion('delete');
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
  }*/

}
