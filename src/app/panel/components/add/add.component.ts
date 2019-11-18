import { Component, OnInit } from '@angular/core';
import  {SERVICES } from '../../../../config/webservices';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesProvider } from '../../../../providers/services';
import  {MESSAGES } from '../../../../config//messages';
// import { Router, ActivatedRoute, Params} from '@angular/router';
//import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';

//import {Topic} from '../../../models/topic';
//import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
  //providers: [UserService],
})
export class AddComponent implements OnInit {

  public page_title : string;
  //public topic : Topic, 
  //public indentity;
  //public token;
  //public status;
  formTopic: FormGroup;
  oTopic:any={};


  constructor(
    private ServicesProvider: ServicesProvider,
    public fb: FormBuilder,
    //private _route: ActivatedRoute,
    //private _router: Router,c
    //private _userService: UserService,
  ) {
    this.page_title = 'Crear Nuevo Tema';
    //this topic = new toPublicName;
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
  }

  prueba(){
    console.log(this.formTopic);
  }



  onSubmit(){ 
    this.fn_resetFormData();
    this.fn_setFormData();    
    this.ServicesProvider.preloaderOn();    
    this.ServicesProvider.post(SERVICES.TOPIC,this.oTopic,true,localStorage.getItem("token")).then(data=>{
      console.log(data);
      if(data.status.toLowerCase()=="succes".toLowerCase()){
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.insertar);
        this.fn_resetFormData();
        console.log(MESSAGES);
      }else{
        this.ServicesProvider.fn_generarAlerta("error", data.status);        
        this.ServicesProvider.preloaderOff();  
      }
  
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
    
  }

  fn_resetFormData(){
    delete this.oTopic.titulo;
    delete this.oTopic.contenido;
    delete this.oTopic.material;
    delete this.oTopic.fecha;
    delete this.oTopic.user;
    delete this.oTopic.comentarios;     
  }

  fn_setFormData(){
    this.oTopic.titulo=this.formTopic.controls["titulo"].value;
    this.oTopic.contenido=this.formTopic.controls["contenido"].value;
    this.oTopic.material=this.formTopic.controls["material"].value;
    this.oTopic.fecha=this.formTopic.controls["fecha"].value;
    this.oTopic.user=this.formTopic.controls["user"].value;
    this.oTopic.comentarios=this.formTopic.controls["comentarios"].value;    
  }






}
