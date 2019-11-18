import { Component, OnInit } from '@angular/core';
//import { MDBModalRef  }  from './../../lib/ng-uikit-pro-standard';;
import { MDBModalRef } from 'ng-uikit-pro-standard';

//import { ServicesProvider } from '../../providers/services';

@Component({
  selector: 'app-modalgenerico',
  templateUrl: './modalgenerico.component.html',
  styleUrls: ['./modalgenerico.component.scss']
})
export class ModalgenericoComponent implements OnInit {

  title: string;
  body: string;
  component:any;
  estilo:string;
  icono:string;
  funcion:any;
  param:any;
  //funcion: any=this.ServicesProvider.cerrar;
  constructor(public modalRef: MDBModalRef) {

//,    private ServicesProvider: ServicesProvider
  }
  ngOnInit() {
    setTimeout(()=>{

      if(this.estilo=="success"){
        this.icono="check";
      }
      else if(this.estilo=="danger"){
        this.icono="times";
      }
      else{
        this.icono="question";
      }
    })

  }

  funcion_ok(){

    this.component[this.funcion](this.param);
  }





}
