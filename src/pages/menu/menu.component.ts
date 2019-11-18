import { OnInit ,Component,ViewChild,ElementRef,Output,EventEmitter} from '@angular/core'; //, Input, Output, EventEmitter  
import { ServicesProvider } from '../../providers/services';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
//import { Router } from '@angular/router';
import  {SERVICES } from '../../config/webservices';
import  {MESSAGES } from '../../config/messages';
import {VARIABLES} from '../../config/variables';
//import {of} from 'rxjs';
@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  @ViewChild('frame') modalDifusion:any;
  @ViewChild('modalCompra') modalCompra: any;
  aCategoriasBadge:any=VARIABLES.badgeCategorias;
  formCompra: FormGroup;
  formDataCompra:any = new FormData()
  public data: any;
  public showSearch: any = "";
  public focus_input: any;
  public searchTop: any;
  public resultsAutocomplete: any = [];
  public animacion_input:any="";
  clase_icon_user:any=false;
  aCategorias:any=VARIABLES.aCategorias;
  urlActual:any;
  numNotificaciones:any;
  aSolicitudes:any=[];
  seccion:any="Eventos";
  oDifusion:any={};
  bSaveEdit=false;
  preview:any=false;
  oProceso:any={};
  oUsuario:any={
 
    "nombre":localStorage.getItem("nombre"),
    "apellido":localStorage.getItem("apellido"),
    "rol":localStorage.getItem("rol")
  }
  @ViewChild('search') searchElement: ElementRef;
  @Output() llamarIndexador: EventEmitter<any>;


  oIcons:any=
  {
    "add":{
      "tipo":"Inserción",
      "icono":"fas fa-plus-square background_bola_verde tamano_icons"
    },
    "update":{
      "tipo":"Actualización",
      "icono":"fas fa-pen-square background_bola_amarilla tamano_icons",
      
    },
    "delete":{
      "tipo":"Eliminación",
      "icono":"fas fa-minus-square background_bola_roja tamano_icons"      
    }
  }
  aNotificaciones=[
    {
      "tipo":"add",
      "categoria":"Eventos",
      "fecha":"(24/05/2019)"
    },
    {
      "tipo":"update",
      "categoria":"Eventos",
      "fecha":"(24/05/2019)"

    },
    {
      "tipo":"delete",
      "categoria":"Eventos",
      "fecha":"(24/05/2019)"

    }

  ]

  constructor(
    //private router : Router,
    public ServicesProvider: ServicesProvider,
    public fb: FormBuilder,
   

) {
    this.llamarIndexador = new EventEmitter();
  
    this.formCompra = fb.group({
      numero_tarjeta: ['', [Validators.required]],
      exp: ['', [Validators.required]],
      ccv: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    console.log(localStorage.getItem("nombre"))
    /* setTimeout(()=>{
      this.showSearch="hide_container_search";
      //this.showSearch=false;
      this.sidenav.show();
      

    }); */
    if(localStorage.getItem("rol")=="administrador"){
      this.fn_intervaloNotificaciones();
      this.ServicesProvider.intervaloNotificacion=setInterval(()=>{
        this.fn_intervaloNotificaciones();
      },300000);   
    }

  }



  fn_intervaloNotificaciones(){
    /*
    this.ServicesProvider.fn_getSolicitudes().then((data:any)=>{
      //this.numNotificaciones=this.ServicesProvider.numNotificaciones=data.solicitudes.length;
      this.ServicesProvider.aNotificaciones=[];
      this.ServicesProvider.numNotificaciones=data.total_items;
      for(var i=0;i<=data.solicitudes.length-1;i++){
        if(i==3){
          break;
        }
        this.ServicesProvider.aNotificaciones.push(data.solicitudes[i]);
      }
      this.ServicesProvider.preloaderOff();
    })/*, (_fail:any) => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });*/
      
  }


  fn_cerrarSesion(){
    //TODO
    localStorage.clear();
    if(this.ServicesProvider.intervaloNotificacion){
      clearInterval(this.ServicesProvider.intervaloNotificacion);
    }
  }


  fn_goToSection(section:any){
    
    this.ServicesProvider.fn_goToSection(section);
    this.llamarIndexador.emit({});
  }

  getFilteredData(){
    /*
    if(!this.ServicesProvider.aIndexacion){
      this.ServicesProvider.preloaderOn();
      this.ServicesProvider.getjson(SERVICES.INDEXACION,{}).then((data:any)=>{
        this.ServicesProvider.aIndexacion=data;

        //sólo en menú y esto se hace si no se ha cargado el array de indexación
        this.resultsAutocomplete=this.ServicesProvider.getFilteredData(this.animacion_input,this.ServicesProvider.aIndexacion);
        //this.numNotificaciones=this.ServicesProvider.numNotificaciones=data.solicitudes.length;
        
        this.ServicesProvider.preloaderOff();
        }, (_fail:any) => {
          this.ServicesProvider.preloaderOff();
          this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
        });
    }
    else{
      this.resultsAutocomplete=this.ServicesProvider.getFilteredData(this.animacion_input,this.ServicesProvider.aIndexacion);

    }
    */

  }
 

  fn_showSearch(){
    this.showSearch="hide_container_search";
    this.searchTop="search_top_focus";
    setTimeout(()=>{
      this.searchElement.nativeElement.focus();
    })
  }

 

  fn_resetFormData(){
    delete this.oDifusion.nombre;
    delete this.oDifusion.correo;
    delete this.oDifusion.telefono;
    delete this.oDifusion.termino;
    delete this.oDifusion.categoria;
    delete this.oDifusion.motivo;   
  }
  fn_setFormData(){
    this.oDifusion.nombre=this.ServicesProvider.formDifusion.controls["nombre"].value;
    this.oDifusion.correo=this.ServicesProvider.formDifusion.controls["correo"].value;
    this.oDifusion.telefono=this.ServicesProvider.formDifusion.controls["telefono"].value;
    this.oDifusion.termino=this.ServicesProvider.formDifusion.controls["termino"].value;
    this.oDifusion.categoria=this.ServicesProvider.formDifusion.controls["categoria"].value;
    this.oDifusion.motivo=this.ServicesProvider.formDifusion.controls["motivo"].value;
    this.oDifusion.id=this.ServicesProvider.formDifusion.controls["id"].value;
  }
  
  fn_submitformDifusion(formGroup: FormGroup) {
    if (formGroup.valid) {    
      this.fn_addDifusion();
    } else {
      this.validateAllFormFields(formGroup); 
    }
  }

  validateAllFormFields(formGroup: FormGroup){
    this.ServicesProvider.validateAllFormFields(formGroup);
  }
  fn_addDifusion(){ 
    this.fn_resetFormData();
    this.fn_setFormData();
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.post(SERVICES.ADDDIFUSION,this.oDifusion,true,localStorage.getItem("token")).then(data=>{
      if(data.message.toLowerCase()=="correo enviado"){
        this.modalDifusion.hide();
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.fn_generarAlerta("Éxito", data.message);
        this.ServicesProvider.formDifusion.reset();
        this.ServicesProvider.formDifusion.controls["categoria"].setValue(this.ServicesProvider.seccion);
        this.ServicesProvider.formDifusion.controls["id"].setValue(this.ServicesProvider.urlid);

      } 

      else{
        this.ServicesProvider.fn_generarAlerta("error", data.message);
        
        this.ServicesProvider.preloaderOff();  
      }
      //this.aDetalleAvance.unshift();
      //this.router.navigate(["home"]);
  
      }, _fail => {
        this.ServicesProvider.preloaderOff();
      
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);

      });
    
  }
  
  fn_callModalCompra(saveEdit:boolean){
    this.preview=false;
    this.bSaveEdit=saveEdit;
    this.fn_resetFormCompras();
    this.modalCompra.show();
  }
  fn_resetFormCompras(){
    this.formCompra.reset();
    this.fn_resetFormDataCompra();
  }

  fn_resetFormDataCompra(){
    delete this.oProceso.pro_nombre;
    delete this.oProceso.accion;
   
  }
  fn_acciones_seccion(accion:any){

    this.oProceso.categoria="proceso";
    this.oProceso.accion=accion;
  }

  fn_submitFormCompra(formGroup: FormGroup) {
    if (formGroup.valid) {    
          this.fn_addCompra();
    } else {
      this.validateAllFormFields(formGroup); 
    }
  }

  
fn_setFormDataCompra(){
 
   this.formDataCompra.append("numero_tarjeta", this.formCompra.controls["numero_tarjeta"].value);
   this.formDataCompra.append("exp", this.formCompra.controls["exp"].value);
   this.formDataCompra.append("ccv", this.formCompra.controls["ccv"].value);
   this.formDataCompra.append("nombre","Visa");

}

fn_addCompra(){ 
  
  this.fn_resetFormData();
  this.fn_setFormDataCompra();
  this.ServicesProvider.preloaderOn();
  this.fn_acciones_seccion('add');
  this.ServicesProvider.post(SERVICES.COMPRAR,this.formDataCompra,true,localStorage.getItem("token")).then(data=>{
    console.log(data);
    if(data.message.toLowerCase()=="registro afectado".toLowerCase()){
      this.modalCompra.hide();
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.insertar);
      console.log(MESSAGES);
    } 
    else if(data.message.toLocaleLowerCase()=="registro pendiente".toLocaleLowerCase()){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      console.log(MESSAGES.pendiente);
      this.modalCompra.hide();
      this.ServicesProvider.preloaderOff();
    }
    else{
      this.ServicesProvider.fn_generarAlerta("error", data.message);
      this.modalCompra.hide();
      this.ServicesProvider.preloaderOff();  
    }
    //this.aDetalleAvance.unshift();
    //this.router.navigate(["home"]);

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
  
}

}
