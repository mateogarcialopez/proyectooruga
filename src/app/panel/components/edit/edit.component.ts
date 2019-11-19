  import { Component, OnInit } from '@angular/core';
  import  {SERVICES } from '../../../../config/webservices';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { ServicesProvider } from '../../../../providers/services';
  import {ActivatedRoute} from '@angular/router';
  import  {MESSAGES } from '../../../../config//messages';

  @Component({
    selector: 'app-edit',
    templateUrl: '../add/add.component.html',
    styleUrls: ['./edit.component.scss']
  })
  export class EditComponent implements OnInit {

    public page_title : string;
    public titulo: string;
    public contenido: string;
    public material: string;
    oTopicEditOriginal: any;
    idTopic: string;
    formTopic: FormGroup;
    oTopic:any={};
    oTopicEdit:any={};
    Topics: any = {};
    //id: string;

    constructor(
      private ServicesProvider: ServicesProvider,
      public fb: FormBuilder,
      public _route: ActivatedRoute,   

    ) { 
      this.page_title = 'Editar Tema';
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
      this.getTopic();
      //this.fn_editTopic();      
    }

    onSubmit(){ 
    this._route.params.subscribe(params=>{
    this.fn_resetFormData();
    this.fn_setFormData();    
    this.ServicesProvider.preloaderOn();    
    this.ServicesProvider.post(SERVICES.UPDATETOPIC + params['id'],this.oTopic,true,localStorage.getItem("token")).then(data=>{
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

    getTopic(){
      this._route.params.subscribe(params=>{   
        console.log(params['id']);         
        this.ServicesProvider.preloaderOn();
        this.ServicesProvider.get(SERVICES.GETTOPIC + params['id'], {}).then(data => {
        console.log(data.topic);
        this.Topics = data.topic;   
        this.titulo = data.topic.titulo;
        this.contenido = data.topic.contenido;
        this.material = data.topic.material;      
        this.ServicesProvider.preloaderOff();
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo", null);
      });
        
      });
    }




/*fn_editTopic(){ 
    this.fn_resetFormData(); 
    let keys:any=Object.keys(this.formTopic.controls);
    console.log('1' + this.oTopicEdit);
    for(var i in keys){
      if(this.formTopic.controls[keys[i]].value!=this.oTopicEdit[keys[i]]){
            this.oTopicEdit[keys[i]]=this.formTopic.controls[keys[i]].value;
      }
    }
    console.log(this.oTopicEdit);
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.post(SERVICES.UPDATETOPIC+"/"+this.oTopicEdit._id, this.oTopicEdit,true,localStorage.getItem("token")).then(data=>{
        if(data.message.toLowerCase()=="success"){          
          this.fn_getUsuarios();
          this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);
        }
          else{          
          this.ServicesProvider.fn_generarAlerta("Error", data.message);
        }
        //this.router.navigate(["home"]);
      this.ServicesProvider.preloaderOff();

      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
  }*/

  }
