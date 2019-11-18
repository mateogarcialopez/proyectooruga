import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { Router } from '@angular/router';


//import {of} from 'rxjs';
//ViewChild
import { ServicesProvider } from '../../providers/services';
//import  {SERVICES } from '../../config/webservices';
import { VARIABLES } from '../../config/variables';
//import { FormControl,FormGroup, Validators,FormArray, FormBuilder } from '@angular/forms';
//import { BreadcrumbModule } from 'projects/ng-uikit-pro-standard/src/public_api';
//import {VARIABLES} from '../../config/variables';
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  aCategorias:any=VARIABLES.aCategorias;
  aCategoriasBadge:any=VARIABLES.badgeCategorias;
  public oUsuario: any = {
    "nombre": localStorage.getItem("nombre"),
    "apellido": localStorage.getItem("apellido"),
    "rol": localStorage.getItem("rol")
  }
  public showSearch: any = "";
  public focus_input: any;
  public searchTop: any;
  public resultsAutocomplete: any = [];
  public animacion_input:any="";
  @ViewChild('search') searchElement: ElementRef;
  constructor(
    //public fb: FormBuilder,
   private ServicesProvider: ServicesProvider/*,
  private router : Router*/


) {
  
}
  ngOnInit() {
    /*
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.getjson(SERVICES.INDEXACION,{}).then((data:any)=>{
      this.ServicesProvider.aIndexacion=data;
      //this.numNotificaciones=this.ServicesProvider.numNotificaciones=data.solicitudes.length;
      
      this.ServicesProvider.preloaderOff();
      }, (_fail:any) => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
      */
  }

 
  searchEntries(searchTerm: string) {
    this.ServicesProvider.searchEntriesIndexacion(searchTerm,this.ServicesProvider.aIndexacion);
  }

  fn_goToSection(section:any){
    this.ServicesProvider.fn_goToSection(section);
  }

  getFilteredData() {
    this.resultsAutocomplete=this.ServicesProvider.getFilteredData(this.animacion_input,this.ServicesProvider.aIndexacion);
  }
 



}
