import { Component, OnInit } from '@angular/core';
import { SERVICES } from '../../config/webservices';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
import { ActivatedRoute, Router } from '@angular/router';
import  {MESSAGES } from '../../config//messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { identity } from 'rxjs';

@Component({
  selector: 'app-topic-detalles',
  templateUrl: './topic-detalles.component.html',
  styleUrls: ['./topic-detalles.component.scss']
})
export class TopicDetallesComponent implements OnInit {

  Topic: any = {};
  public status: any;
  formComent: FormGroup;
  oComent:any={};
  contenido: string;
  public indentity: any;
  public search: any;
  
  constructor(
    private ServicesProvider: ServicesProvider,
    public _route: ActivatedRoute,
    public fb: FormBuilder,
    public _router: Router,
  ) {

    this.formComent = fb.group({
      
      contenido: ['', [Validators.required]],
      fecha: ['', []],
      user: [localStorage.getItem("id"), []],
    });

    }

  ngOnInit() {
    this.indentity = localStorage.getItem("id");    
    this.fn_getTopics();
  }

  fn_resetFormData(){
    
    delete this.oComent.contenido;    
    delete this.oComent.fecha;
    delete this.oComent.user;
        
  }

  fn_setFormData(){    
    this.oComent.contenido=this.formComent.controls["contenido"].value;
    this.oComent.fecha=this.formComent.controls["fecha"].value;
    this.oComent.user=this.formComent.controls["user"].value;
       
  }

  onSubmit(){ 
    this.fn_resetFormData();
    this.fn_setFormData();    
    this.ServicesProvider.preloaderOn();    
    this.ServicesProvider.post(SERVICES.ADDCOMENT+this.Topic._id,this.oComent,true,localStorage.getItem("token")).then(data=>{
      console.log(data);
      if(data.status.toLowerCase()=="success".toLowerCase()){
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.insertar);
        this.fn_resetFormData();                  
      }else{
        this.ServicesProvider.fn_generarAlerta("error", data.status);        
        this.ServicesProvider.preloaderOff();  
      }
  
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
    
  }

  fn_getTopics() {
    this._route.params.subscribe(params => {
      this.ServicesProvider.preloaderOn();
      this.ServicesProvider.get(SERVICES.TOPICS + params[''], {}).then(data => {
        console.log(data);
        this.Topic = data.topic;        
        this.ServicesProvider.preloaderOff();
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo", null);
      });
    });
  }

  goSearch(){
    this._router.navigate(['/buscar', this.search]);
    //console.log(this.search);
  }



  deleteComment(id: String){
    console.log(id);
  }
}
