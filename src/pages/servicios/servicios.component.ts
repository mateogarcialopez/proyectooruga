

import { OnInit ,Component,ViewChild} from '@angular/core'; //, Input, Output, EventEmitter  
//import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
//import { Router,ActivatedRoute } from '@angular/router';
import  {SERVICES } from '../../config/webservices';
import  {VARIABLES } from '../../config/variables';
import  {MESSAGES } from '../../config/messages';


@Component({
  selector: 'servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {
  aServicios:any;
  bSeleccionInicial:boolean=false;
  oSeleccion:any;
  index_area:any=-1;
  search:any;
  indexIntegrante:any;
  @ViewChild ("clickscroll") clickscroll:any;
  //@ViewChildren('acc') acc: QueryList<ElementRef>
  selecServicio:any;
  descripcion_area:any;
  aItemsServicios:any;
  bSaveEditServicio:any;
  servicio:any;
  oAreaSeleccionada:any;
  idArea:any;
  nombre_responsable:any;
  correo_responsable:any;
  cargo_responsable:any;
  extension_responsable:any;
  index_responsable:any;
  fechaEspanol:any;
  fechas:any;
  filtro_fecha:any;
  oEstado_bolas=VARIABLES.oEstado_bolas;
  @ViewChild ("modalServicio") modalServicio:any;
  @ViewChild ("modalServicioResponsable") modalServicioResponsable:any;

  
  constructor(

    private ServicesProvider: ServicesProvider
 /*   public fb: FormBuilder,/
    /*,
    private route:ActivatedRoute*/

) {
  this.fechas=this.ServicesProvider.getCurrentDates();
  this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.fechas.hoy);
 }

 
  ngOnInit() {


    this.getServicios();

  }
  fn_indexador(){
    if(this.ServicesProvider.parametrosSeccion){
      //this.se
      //Cuando se haga el ajuste de quitar "Servicio - remover la siguiente linea 
      this.ServicesProvider.parametrosSeccion.filtro=this.ServicesProvider.parametrosSeccion.filtro.replace("Servicio - ","");
      this.ServicesProvider.parametrosSeccion.filtro=this.ServicesProvider.parametrosSeccion.filtro.split("-");
      if(this.ServicesProvider.parametrosSeccion.filtro.length!=1){
        this.ServicesProvider.parametrosSeccion.filtro=this.ServicesProvider.parametrosSeccion.filtro[this.ServicesProvider.parametrosSeccion.filtro.length-1];
      }
      else{
        this.ServicesProvider.parametrosSeccion.filtro=this.ServicesProvider.parametrosSeccion.filtro[0];
        this.ServicesProvider.parametrosSeccion.filtro=this.ServicesProvider.parametrosSeccion.filtro.replace("Servicio ","");
      }
      this.search=this.ServicesProvider.parametrosSeccion.filtro;
      this.fn_busquedaCampo();
    
    }
  }

  fn_resetItemsResponsable(){
    this.nombre_responsable="";
    this.correo_responsable="";
    this.cargo_responsable="";
    this.extension_responsable="";
  }

  fn_callModalArea(accion:any,modalresponsable?:any,index_responsable?:any,index_item_responsable?:any){
    if(modalresponsable=="modalresponsable"){
      this.modalServicioResponsable.show();
    }
    else{
      this.modalServicio.show();
      console.log(this.aItemsServicios)
    }
    this.bSaveEditServicio=accion;
    //modal area
    this.descripcion_area="";
    this.selecServicio="";
    
    //modal responsable
    this.fn_resetItemsResponsable();

    if(accion==false){

      
      //modal area
      if(modalresponsable!="modalresponsable"){
        setTimeout(()=>{
          this.aItemsServicios=this.oAreaSeleccionada.ser_items;
          this.descripcion_area=this.oAreaSeleccionada.ser_descripcion;
          this.selecServicio=this.oAreaSeleccionada.ser_area;
          console.log(this.aItemsServicios);
        },500)

      }
      else{
        this.aItemsServicios=this.oAreaSeleccionada;

        this.indexIntegrante=index_item_responsable;
        this.index_responsable=index_responsable;
        this.indexIntegrante=index_item_responsable;
        this.nombre_responsable=this.oAreaSeleccionada[index_responsable].extension_users[index_item_responsable].nombre;
        this.correo_responsable=this.oAreaSeleccionada[index_responsable].extension_users[index_item_responsable].correo;
        this.cargo_responsable=this.oAreaSeleccionada[index_responsable].extension_users[index_item_responsable].cargo;
        this.extension_responsable=this.oAreaSeleccionada[index_responsable].extension_users[index_item_responsable].ext.toString();


      }




    }
    else{

      this.aItemsServicios=[]; 

    }

    
  }

  fn_addServicio(){
    this.aItemsServicios.push(this.servicio);
    this.servicio="";
  }


  fn_addResponsable(){
   /* if(!this.aItemsServicios[0]){
      this.aItemsServicios[0]={ "extension_users":[] };
    }
    else{*/

 //   }
 
 
      ;
    let oJsonResponsable=
    {
      "cargo": this.cargo_responsable,
      "correo": this.correo_responsable,
      "ext": this.extension_responsable.toString(),
      "nombre": this.nombre_responsable
    }

    this.aItemsServicios=this.aServicios[this.index_area].ser_integrantes;
    this.aItemsServicios.splice(0,0,{ "extension_users":[] });

    this.aItemsServicios[0].extension_users.unshift(oJsonResponsable);
    this.aServicios[this.index_area].ser_integrantes=this.aItemsServicios;
    this.fn_resetItemsResponsable();



  }

  fn_acciones_seccion(accion:any){
    return {"acccion":accion, "categoria":"servicio"};
  }

  fn_deleteArea(index:any){
    this.aItemsServicios.splice(index,1);
  }
  fn_AdvertenciaElimResponsable(id:any){
    this.ServicesProvider.generarPopupGenerico("Advertencia", "¿Desea eliminar al responsable?","fn_submitResponsable",this,id);
  }

  fn_submitServicio(){
    if(this.servicio  ){
      this.ServicesProvider.generarPopupGenerico("Advertencia","Quedan campos pendientes sin guardar, asegurate de agregarlos");
    }
    else{

      let oJsonArea:any={};

      oJsonArea.ser_area=this.selecServicio;
      oJsonArea.ser_descripcion=this.descripcion_area;
      oJsonArea.ser_items=this.aItemsServicios;

      if(this.bSaveEditServicio){
          oJsonArea["ser_integrantes"]=[];


          let acciones=this.fn_acciones_seccion('add');
          oJsonArea.accion=acciones.acccion;
          oJsonArea.categoria=acciones.categoria;
  
  
  
          this.ServicesProvider.post(SERVICES.ADDSERVICIO, oJsonArea,true,localStorage.getItem("token")).then(data=>{
            if(data.message.toLowerCase()=="registro afectado".toLowerCase()){
              this.modalServicio.hide();
              this.ServicesProvider.preloaderOff();
              this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.insertar);    
              this.getServicios();
            } 
            else if(data.message.toLocaleLowerCase()=="registro pendiente".toLocaleLowerCase()){
              this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
              this.modalServicio.hide();
              this.ServicesProvider.preloaderOff();
              this.getServicios();
  
            }
            else{
              this.ServicesProvider.fn_generarAlerta("error", data.message);
              this.modalServicio.hide();
              this.ServicesProvider.preloaderOff();  
            }
            //this.aDetalleAvance.unshift();
            //this.router.navigate(["home"]);
        
            }, _fail => {
              this.ServicesProvider.preloaderOff();
              this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
            });
  
  
        }
        else{

          let acciones=this.fn_acciones_seccion('update');
          oJsonArea.accion=acciones.acccion;
          oJsonArea.categoria=acciones.categoria;
  
  
  
          this.ServicesProvider.post(SERVICES.ADDSERVICIO+"/"+this.idArea, oJsonArea,true,localStorage.getItem("token")).then(data=>{
            if(data.message.toLowerCase()=="registro afectado".toLowerCase()){
              this.modalServicio.hide();
              this.ServicesProvider.preloaderOff();
              this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);    
              this.getServicios();
            } 
            else if(data.message.toLocaleLowerCase()=="registro pendiente".toLocaleLowerCase()){
              this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
              this.modalServicio.hide();
              this.ServicesProvider.preloaderOff();
              this.getServicios();
  
            }
            else{
              this.ServicesProvider.fn_generarAlerta("error", data.message);
              this.modalServicio.hide();
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

   
  }


  fn_submitResponsable(accion?:any){
    /*if(this.cargo_responsable || this.correo_responsable || this.extension_responsable || this.nombre_responsable ){
      this.ServicesProvider.generarPopupGenerico("Advertencia","Quedan campos pendientes sin guardar, asegurate de agregarlos");
    }*/
      
      if(accion=='editar'){
        this.aItemsServicios[this.index_responsable].extension_users[this.indexIntegrante].cargo=this.cargo_responsable;
        this.aItemsServicios[this.index_responsable].extension_users[this.indexIntegrante].nombre=this.nombre_responsable;
        this.aItemsServicios[this.index_responsable].extension_users[this.indexIntegrante].ext=this.extension_responsable.toString();
        this.aItemsServicios[this.index_responsable].extension_users[this.indexIntegrante].correo=this.correo_responsable;
      }
      if(accion=='eliminar'){

        this.aItemsServicios.splice(this.index_responsable,1);
      }

      

      let oJsonArea:any={};


          let acciones=this.fn_acciones_seccion('update');
          oJsonArea.accion=acciones.acccion;
          oJsonArea.categoria=acciones.categoria;
          oJsonArea.ser_integrantes=this.aItemsServicios;

          this.idArea=this.aServicios[this.index_area]._id;
          this.ServicesProvider.preloaderOn();
          this.ServicesProvider.post(SERVICES.ADDSERVICIO+"/"+this.idArea, oJsonArea,true,localStorage.getItem("token")).then(data=>{
            if(data.message.toLowerCase()=="registro afectado".toLowerCase()){
              this.modalServicioResponsable.hide();
              this.ServicesProvider.preloaderOff();
              this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);    
              this.getServicios();
            } 
            else if(data.message.toLocaleLowerCase()=="registro pendiente".toLocaleLowerCase()){
              this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
              this.modalServicioResponsable.hide();
              this.ServicesProvider.preloaderOff();
              this.getServicios();
  
            }
            else{
              this.ServicesProvider.fn_generarAlerta("error", data.message);
              this.modalServicioResponsable.hide();
              this.ServicesProvider.preloaderOff();  
            }
            //this.aDetalleAvance.unshift();
            //this.router.navigate(["home"]);
        
            }, _fail => {
              this.ServicesProvider.preloaderOff();
              this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
            });
  
  }


  

  fn_AdvertenciaElimArea(id:any){
    this.ServicesProvider.generarPopupGenerico("Advertencia", "¿Desea eliminar esta área?","fn_deleteAreaServicio",this,id);
  }

  fn_deleteAreaServicio(){
    /*if(this.cargo_responsable || this.correo_responsable || this.extension_responsable || this.nombre_responsable ){
      this.ServicesProvider.generarPopupGenerico("Advertencia","Quedan campos pendientes sin guardar, asegurate de agregarlos");
    }*/
      
  
      let oJsonArea:any={};


          let acciones=this.fn_acciones_seccion('delete');
          oJsonArea.accion=acciones.acccion;
          oJsonArea.categoria=acciones.categoria;
          this.ServicesProvider.preloaderOn();
          this.ServicesProvider.post(SERVICES.DELETESERVICIO+"/"+this.oAreaSeleccionada._id, oJsonArea,true,localStorage.getItem("token")).then(data=>{
            if(data.message.toLowerCase()=="registro afectado".toLowerCase()){
              this.modalServicioResponsable.hide();
                            this.ServicesProvider.preloaderOff();
              this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);    
              this.getServicios();
            } 
            else if(data.message.toLocaleLowerCase()=="registro pendiente".toLocaleLowerCase()){
              this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
              this.modalServicioResponsable.hide();
              this.ServicesProvider.preloaderOff();
              this.getServicios();
  
            }
            else{
              this.ServicesProvider.fn_generarAlerta("error", data.message);
              this.modalServicioResponsable.hide();
              this.ServicesProvider.preloaderOff();  
            }
            //this.aDetalleAvance.unshift();
            //this.router.navigate(["home"]);
        
            }, _fail => {
              this.ServicesProvider.preloaderOff();
              this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
            });
  
  }











  fn_busquedaCampo(){
    this.bSeleccionInicial=true;
    let encontrado=false;
    for(var i in this.aServicios){
      this.index_area=i;
      this.aItemsServicios=this.aServicios[i].ser_integrantes;

      if(this.ServicesProvider.fn_quitarAcentos(this.aServicios[i].ser_area).search(this.ServicesProvider.fn_quitarAcentos(this.search))!=-1){
        this.oSeleccion=this.aServicios[i];
        return '';

      }
          for(var j in this.aServicios[i].ser_integrantes){
            
            for(var t in this.aServicios[i].ser_integrantes[j].extension_users){
              if(this.ServicesProvider.fn_quitarAcentos(this.aServicios[i].ser_integrantes[j].extension_users[t].nombre).search(this.ServicesProvider.fn_quitarAcentos(this.search))!=-1 || this.ServicesProvider.fn_quitarAcentos(this.aServicios[i].ser_integrantes[j].extension_users[t].ext.toString()).search(this.ServicesProvider.fn_quitarAcentos(this.search))!=-1 ){
                this.indexIntegrante=this.aServicios[i].ser_integrantes[j].extension_users[t]._id;
      
                this.oSeleccion=this.aServicios[i];
                /*setTimeout(()=>{
                  let el: HTMLElement = this.clickscroll.nativeElement;
                  el.click();
                }) */
                setTimeout(()=>{
                  var elmnt:any = document.getElementById(this.indexIntegrante);
                  elmnt.scrollIntoView({ block: 'start',  behavior: 'smooth' });
                })

                encontrado=true;
                return '';
                break;
              }

            }
          }
      }
    
    if(encontrado==false){
      this.ServicesProvider.fn_generarAlerta("Advertencia", "No existen resultados a tu búsqueda")
      this.index_area=-1;
      this.bSeleccionInicial=false;
    }

  }



  getServicios(){
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.get(SERVICES.SERVICIOS,{}).then(data=>{
      this.aServicios=data.servicios;

      this.fn_indexador();


      this.ServicesProvider.preloaderOff();
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });

  }
    
  onKeydown(event:any) {
    if(event){
      if (event.key === "Enter") {
        this.fn_busquedaCampo();

      }
    }


  }

  fn_mostrarTarjeta(servicio:any,index_area:any){
    this.bSeleccionInicial=true;
    this.oSeleccion=servicio;
    this.index_area=index_area;
    this.aItemsServicios=servicio.ser_integrantes

    this.indexIntegrante=-1;
    /*this.indexResponsable=-1;
    this.indexUnidad=this.aServicios.indexOf(dependencia);
    let indexDireccion=dependencia.direccion.indexOf(direccion);
    this.indexDireccion=this.indexUnidad+""+indexDireccion;
    console.log(dependencia,direccion);
    console.log(this.indexDireccion);
    setTimeout(()=>{
      let el: HTMLElement = this.clickscroll.nativeElement;
      el.click();
    })*/

        //this.aServicios[indexUnidad].direccion[this.indexDireccion]["class_seleccion_direccion"]=true
  }

}

