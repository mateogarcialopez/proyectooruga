import { OnInit, Component, ViewChild, ViewChildren, QueryList, ElementRef  } from '@angular/core'; //, Input, Output, EventEmitter  
import { SBItemComponent } from 'ng-uikit-pro-standard';
//import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
//import { Router,ActivatedRoute } from '@angular/router';
import { SERVICES } from '../../config/webservices';
import { VARIABLES } from '../../config/variables';
import { MESSAGES } from '../../config/messages';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dependencia',
  templateUrl: './dependencias.component.html',
  styleUrls: ['./dependencias.component.scss']
})
export class DependenciaComponent implements OnInit {
  @ViewChild("clickscroll") clickscroll: any;


  @ViewChild("clickscrollresponsable") clickscrollresponsable: any;
  @ViewChildren('acc') acc: QueryList<ElementRef>
  @ViewChild('modalDependencia') modalDependencia: any;
  @ViewChild('modalServicioResponsable') modalServicioResponsable: any;
  @ViewChild('modalNombreServicio') modalNombreServicio: any;
  @ViewChildren(SBItemComponent) collapses: QueryList<SBItemComponent>[];
  
  oFaculad: any;
  oEvento: any;
  idEvento: string;
  aDependencias: any = [];
  oSeleccion: any = {};
  bSeleccionInicial: boolean = false;
  indexDireccion: any;
  indexResponsable: any;
  idResponsable: any;
  indexUnidad: any;
  search: any;
  formDataDependencia: any = new FormData();
  formDependencia: FormGroup;
  formArea: FormGroup;
  bSaveEditDependencia: any;
  selecdependencia = null;
  aItemsServicios: any = [];
  servicio: any;
  concepto: any;
  descripcion_dependencia: any;
  oDependenciaSeleccionada: any;
  aServiciosDependencia: any;
  aItemsArea: any = [];
  indexDependencia: any;
  indexArea: any;
  formNombreServicio: any;
  bNombreServicio: boolean;
  aNombresServicios: any = [];
  indexServicios: any;
  bEditResponsablle:boolean;
  oEstado_bolas=VARIABLES.oEstado_bolas;  
  fechas:any;
  filtro_fecha:any;
  fechaEspanol:any;
  constructor(

    private ServicesProvider: ServicesProvider,
    public fb: FormBuilder
    /*   public fb: FormBuilder,/
       /*,
       private route:ActivatedRoute*/

  ) {
    this.oSeleccion = [];
    this.fechas=this.ServicesProvider.getCurrentDates();
    this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.fechas.hoy);
    /*this.oEvento={"eventos":[{"eve_imagen":"http://proyecto-um.herokuapp.com/uploads/teatro.jpg","eve_ultima_actualizacion":"2019-05-30T16:00:23.474Z","_id":"5cef8893f15486435412e308","eve_nombre":"Muestra Curtural ","eve_lugar":"Mall principal Torre Emblematica","eve_fecha_inicio":"2019/05/31 10:00:00","eve_fecha_fin":"2019/06/01 12:00:00","eve_organizador":"Dubby","eve_extension":"312","eve_costo":0,"eve_observacion":"Muestra Curtural delas diferentes regiones dl pais asociados a la universidad de manizales","eve_estado":"pendiente","__v":0}]}
    this.oEvento.eventos;
  */
  }



  fn_addArea() {
    //this.indexArea= this.aDependencias[this.indexDependencia].dep_areas.length==0?0:this.aDependencias[this.indexDependencia].dep_areas.length-1;
    this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].responsables.push(
      {
        "Correo": this.formArea.controls['Correo'].value,
        "cargo": this.formArea.controls['cargo'].value,
        "nombre": this.formArea.controls['nombre_responsable'].value
      }
    )
    //TODO
    console.log(this.indexDependencia," ", this.indexArea);
    console.log(this.aDependencias[this.indexDependencia]);
    this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].nombre = this.formArea.controls['nombre_area'].value;
    this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].descripcion = this.formArea.controls['descripcion_area'].value;
    this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].extension = this.formArea.controls['extension'].value;
console.log(this.aDependencias[this.indexDependencia].dep_areas[this.indexArea]);
    this.fn_resetDataResponsable();

  }


  fn_callModalResponsable(accion: any, idx_dependencia?: any, idx_area?: any) {
    this.indexDependencia = idx_dependencia;
    this.formArea.reset();
    this.bSaveEditDependencia = accion;
    this.modalServicioResponsable.show();
    if (idx_area!=undefined) {
      this.indexArea = idx_area;
    }
    if (accion == true) {

      this.aDependencias[this.indexDependencia].dep_areas.push({

        /*"nombre":this.formArea.controls['nombre_area'].value,*/
        "responsables": [],
        "servicios": []/*,
      "descripcion": this.formArea.controls['descripcion_area'].value,
      "extension": this.formArea.controls['extension'].value*/
      })
      //<ng-container *ngFor="let dep of oSeleccion?.dep_areas">
      this.indexArea = this.aDependencias[this.indexDependencia].dep_areas.length - 1;
    }
    else {
      this.formArea.controls['descripcion_area'].setValue(this.aDependencias[idx_dependencia].dep_areas[idx_area].descripcion);
      this.formArea.controls['extension'].setValue(this.aDependencias[idx_dependencia].dep_areas[idx_area].extension);
      this.formArea.controls['nombre_area'].setValue(this.aDependencias[idx_dependencia].dep_areas[idx_area].nombre);
      //this.aDependencias[this.indexUnidad].dep_areas;

    }


  }
//fix para cerrar el modal y que si existe un objeto blanco se elimine
  fn_CloseremoveDependenciaBlanca(){
    this.bEditResponsablle=false;
    if(!this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].nombre){
      this.aDependencias[this.indexDependencia].dep_areas.splice(this.indexArea,1)
    }
    this.modalServicioResponsable.hide();
  }

  fn_callModalDependencia(accion: any, index_dependencia?: any) {
    this.indexServicios = -1;
    this.aNombresServicios = [];
    this.formDependencia.reset();
    this.modalDependencia.show();
    this.bSaveEditDependencia = accion;
    if (accion == false) {
      this.indexDependencia = index_dependencia;

      this.formDependencia.controls["selecdependencia"].setValue(this.aDependencias[index_dependencia].dep_nombre);
      this.formDependencia.controls["descripcion_dependencia"].setValue(this.aDependencias[index_dependencia].dep_descripcion);
      //this.aItemsServicios=this.aDependencias[index_dependencia].dep_servicios;
      this.aNombresServicios = this.aDependencias[index_dependencia].dep_servicios;
      for (var i in this.aNombresServicios) {
        if (!this.aNombresServicios[i].concepto) {
          this.aNombresServicios[i].concepto = "sin nombre de servicio";
        }
      }


    }


  }

  fn_setIndexServicios() {
    for (var i in this.aNombresServicios) {
      if (this.aNombresServicios[i].concepto == this.formDependencia.controls['selectconcepto'].value) {
        this.indexServicios = parseInt(i);
        break;
      }
    }
  }

  fn_eliminarConcepto(idx_servicios: any) {
    this.aItemsServicios.splice(idx_servicios, 1);

  }


  fn_eliminarServicio(idx_itemservicio: any) {
    let indexConcepto = parseInt(this.fn_obtenerIndexConcepto());
    this.aNombresServicios[indexConcepto].items.splice(idx_itemservicio, 1);
  }

  fn_acciones_seccion(accion: any) {


    return { "acccion": accion, "categoria": "dependencia" };

  }

  fn_AdvertenciaElimDependencia(id: any) {
    this.ServicesProvider.generarPopupGenerico("Advertencia", "¿Desea eliminar esta dependencia?", "fn_deleteDependencia", this, id);
  }

  fn_deleteArea(idx: any) {
    idx = idx.split(",");
    this.aDependencias[idx[0]].dep_areas.splice(idx[1], 1);
    this.fn_submitArea('eliminar');
  }

  fn_resetDataResponsable(){
    this.formArea.controls['Correo'].reset();
    this.formArea.controls['cargo'].reset();
    this.formArea.controls['nombre_responsable'].reset();

  }

  fn_editResponsable(){
    this.bEditResponsablle=false;
    this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].responsables[this.indexResponsable].Correo=this.formArea.controls["Correo"].value;
    this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].responsables[this.indexResponsable].cargo=this.formArea.controls["cargo"].value;
    this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].responsables[this.indexResponsable].nombre=this.formArea.controls["nombre_responsable"].value;
    
    this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].descripcion=this.formArea.controls["descripcion_area"].value;
    this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].extension=this.formArea.controls["extension"].value;
    this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].nombre=this.formArea.controls["nombre_area"].value;
    this.fn_resetDataResponsable();


  }

  fn_setResponsable(idx_area: any, idx_responsable: any,abrir_modal:any) {
    this.indexArea=idx_area;
    this.indexResponsable=idx_responsable;
    if(abrir_modal){
      this.modalServicioResponsable.show();
    }
    this.bEditResponsablle=true;
    this.formArea.controls["Correo"].setValue(this.aDependencias[this.indexDependencia].dep_areas[idx_area].responsables[idx_responsable].Correo);
    this.formArea.controls["cargo"].setValue(this.aDependencias[this.indexDependencia].dep_areas[idx_area].responsables[idx_responsable].cargo);
    this.formArea.controls["nombre_responsable"].setValue(this.aDependencias[this.indexDependencia].dep_areas[idx_area].responsables[idx_responsable].nombre);
    
    this.formArea.controls["descripcion_area"].setValue(this.aDependencias[this.indexDependencia].dep_areas[idx_area].descripcion);
    this.formArea.controls["extension"].setValue(this.aDependencias[this.indexDependencia].dep_areas[idx_area].extension);
    this.formArea.controls["nombre_area"].setValue(this.aDependencias[this.indexDependencia].dep_areas[idx_area].nombre);

  }


  fn_deleteResponsable(idx_area: any) {
    let splitIndex=idx_area.split(",");
      idx_area=splitIndex[0];
      let idx_responsable=splitIndex[1];
 
    this.indexArea=idx_area;
    this.aDependencias[this.indexDependencia].dep_areas[idx_area].responsables.splice(idx_responsable, 1);
    if(splitIndex[2]=='true' || splitIndex[2]==true){
      this.fn_submitArea('eliminar');
    }
  }

  fn_AdvertenciaElimnResponsable(idx_area:any,idx_responsable: any,eliminar_servico:any) {
    this.ServicesProvider.generarPopupGenerico("Advertencia", "¿Desea eliminar al responsable?", "fn_deleteResponsable", this, idx_area + "," + idx_responsable+ "," + eliminar_servico);

  }

  fn_AdvertenciaElimnArea(idx_dependencia: any, idx_area: any) {
    this.indexArea=idx_area;
    this.ServicesProvider.generarPopupGenerico("Advertencia", "¿Desea eliminar esta área?", "fn_deleteArea", this, idx_dependencia + "," + idx_area);
  }

  fn_deleteDependencia(index_dependencia: any) {
    this.indexUnidad = index_dependencia;
    let oJsonDependencia: any =
    {

    };
    let acciones = this.fn_acciones_seccion('delete');
    oJsonDependencia.accion = acciones.acccion;
    oJsonDependencia.categoria = acciones.categoria;


    this.ServicesProvider.post(SERVICES.ADDDEPENDENCIA + "/delete/" + this.aDependencias[this.indexUnidad]._id, oJsonDependencia, true, localStorage.getItem("token")).then(data => {
      if (data.message.toLowerCase() == "registro afectado".toLowerCase()) {
        this.modalDependencia.hide();
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.eliminar);
        this.fn_getDependencia();
      }
      else if (data.message.toLocaleLowerCase() == "registro pendiente".toLocaleLowerCase()) {
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
        this.modalDependencia.hide();
        this.ServicesProvider.preloaderOff();
        this.fn_getDependencia();

      }
      else {
        this.ServicesProvider.fn_generarAlerta("error", data.message);
        this.modalDependencia.hide();
        this.ServicesProvider.preloaderOff();
      }
      //this.aDetalleAvance.unshift();
      //this.router.navigate(["home"]);

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo", null);
    });



  }




  fn_submitDependencia() {

    if (this.formDependencia.controls["servicio"].value) {
      this.ServicesProvider.generarPopupGenerico("Advertencia", "Quedan campos pendientes sin guardar, asegurate de agregarlas");
    }

    else {
      let oJsonDependencia: any =
      {
        "dep_nombre": this.formDependencia.controls["selecdependencia"].value,
        "dep_descripcion": this.formDependencia.controls["descripcion_dependencia"].value,
        "dep_servicios": this.aNombresServicios,

      };


      var id = ""; //puede enviarse el id o no segun si se edita o agrega

      if (!this.bSaveEditDependencia) {
        var acciones = this.fn_acciones_seccion('update');
        oJsonDependencia.accion = acciones.acccion;
        oJsonDependencia.categoria = acciones.categoria;
        id = "/" + this.aDependencias[this.indexDependencia]._id;
      }
      else {
        var acciones = this.fn_acciones_seccion('add');
        oJsonDependencia.accion = acciones.acccion;
        oJsonDependencia.categoria = acciones.categoria;
        oJsonDependencia.dep_areas = [];
        id = "";
      }




      this.ServicesProvider.post(SERVICES.ADDDEPENDENCIA + id, oJsonDependencia, true, localStorage.getItem("token")).then(data => {
        if (data.message.toLowerCase() == "registro afectado".toLowerCase()) {
          this.modalDependencia.hide();
          this.ServicesProvider.preloaderOff();
          this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);
          this.fn_getDependencia();
        }
        else if (data.message.toLocaleLowerCase() == "registro pendiente".toLocaleLowerCase()) {
          this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
          this.modalDependencia.hide();
          this.ServicesProvider.preloaderOff();
          this.fn_getDependencia();

        }
        else {
          this.ServicesProvider.fn_generarAlerta("error", data.message);
          this.modalDependencia.hide();
          this.ServicesProvider.preloaderOff();
        }
        //this.aDetalleAvance.unshift();
        //this.router.navigate(["home"]);

      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo", null);
      });







    }

  }





  fn_submitArea(accion?:any) {


    let oJsonDependencia: any =
    {
      "dep_areas": this.aDependencias[this.indexDependencia].dep_areas,
    };

    if(accion!="eliminar"){
      if (!this.bSaveEditDependencia) {
        this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].nombre = this.formArea.controls['nombre_area'].value;
        this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].descripcion = this.formArea.controls['descripcion_area'].value;
        this.aDependencias[this.indexDependencia].dep_areas[this.indexArea].extension = this.formArea.controls['extension'].value;
      }
  
  
    }


    let acciones = this.fn_acciones_seccion('update');
    oJsonDependencia.accion = acciones.acccion;
    oJsonDependencia.categoria = acciones.categoria;


    this.bEditResponsablle=false; //para saber si se edita

    this.ServicesProvider.post(SERVICES.ADDDEPENDENCIA + "/" + this.aDependencias[this.indexDependencia]._id, oJsonDependencia, true, localStorage.getItem("token")).then(data => {
      if (data.message.toLowerCase() == "registro afectado".toLowerCase()) {
        this.modalServicioResponsable.hide();
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);
        this.fn_getDependencia();
      }
      else if (data.message.toLocaleLowerCase() == "registro pendiente".toLocaleLowerCase()) {
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
        this.modalServicioResponsable.hide();
        this.ServicesProvider.preloaderOff();
        this.fn_getDependencia();

      }
      else {
        this.ServicesProvider.fn_generarAlerta("error", data.message);
        this.modalServicioResponsable.hide();
        this.ServicesProvider.preloaderOff();
      }
          this.bEditResponsablle=false; //para saber si se edita


    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo", null);
    });

  }


  fn_obtenerIndexConcepto() {


    var i: any = 0;
    for (i in this.aNombresServicios) {
      if (this.formDependencia.controls['selectconcepto'].value == this.aNombresServicios[i].concepto) {

        break;
      }
    }
    return i;


  }


  fn_addServicioDep() {

    this.indexServicios = parseInt(this.fn_obtenerIndexConcepto());
    this.aNombresServicios[this.indexServicios].items.push(
      this.formDependencia.controls["servicio"].value
    )

    this.formDependencia.controls["servicio"].reset();


  }



  ngOnInit() {

    this.fn_getDependencia();

    this.formDependencia = this.fb.group({
      selecdependencia: ['', [Validators.required]],
      descripcion_dependencia: ['', []],
      concepto: ['', []],
      selectconcepto: ['', []],
      servicio: ['', []]
    });

    this.formArea = this.fb.group({
      nombre_area: ['', [Validators.required]],
      descripcion_area: ['', []],
      extension: ['', [Validators.required]],
      Correo: ['', []],
      cargo: ['', []],
      nombre_responsable: ['', [Validators.required]]
    });


    this.formNombreServicio = this.fb.group({
      concepto: ['', [Validators.required]]
    })

  }

  fn_callModalNombreServicio(accion: any) {
    this.bNombreServicio = accion;
    this.modalNombreServicio.show();
    this.formNombreServicio.reset();
    if (!accion) {
      this.formNombreServicio.controls['concepto'].setValue(this.formDependencia.controls['selectconcepto'].value);
    }
  }

  fn_advertenciaNombreServico() {
    this.ServicesProvider.generarPopupGenerico("Advertencia", "Si eliminas esta categoría de servicio, se eliminarán los servicios pertenenecientes a él. ¿Deseas continuar?", "fn_deleteNombreServicio", this, 0);

  }

  fn_deleteNombreServicio() {
    this.aNombresServicios.forEach((element: any, index: any) => {
      if (this.formDependencia.controls['selectconcepto'].value == element.concepto) {
        this.aNombresServicios.splice(index, 1);
      }
      return "";
    });
  }

  fn_saveNombreServicio() {
    if (this.bNombreServicio) {
      let index = this.aNombresServicios.length;

      this.aNombresServicios.push(
        { "concepto": this.formNombreServicio.controls['concepto'].value, "items": [] }
      );
      this.indexServicios=index;
      this.formDependencia.controls['selectconcepto'].setValue(this.aNombresServicios[index].concepto);
    }
    else {
      this.aNombresServicios.forEach((element: any, indexN: any) => {
        if (element.concepto == this.formDependencia.controls['selectconcepto'].value) {
          this.aNombresServicios[indexN].concepto = this.formNombreServicio.controls['concepto'].value;
          this.formDependencia.controls['selectconcepto'].setValue(this.formNombreServicio.controls['concepto'].value);
          return "";
        }
      })
    }
    this.modalNombreServicio.hide();
  }


  fn_indexador(){
    if (this.ServicesProvider.parametrosSeccion) {
      setTimeout(() => {
        this.search = this.ServicesProvider.parametrosSeccion.filtro;
        this.fn_busquedaCampo();
        this.ServicesProvider.parametrosSeccion = false;
      })

    }
  }


  fn_getDependencia() {
    //this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.filtro_fecha);

    this.ServicesProvider.preloaderOn();
    //se transforma fecha a yyyy-mm-dd
    //let fecha=this.fechas.hoy.split("/")
    this.ServicesProvider.get(SERVICES.GETDEPENDENCIAS, {}).then(data => {
      this.aDependencias = data.dependencias;

      this.fn_indexador();
      if(this.indexDependencia){
        setTimeout(()=>{
          let el: HTMLElement = this.acc["_results"][this.indexDependencia].nativeElement;
          el.click();
          var elmnt: any = document.getElementById(this.aDependencias[this.indexDependencia]._id);
          elmnt.scrollIntoView({ block: 'start', behavior: 'smooth' });

          if(this.indexArea){
            setTimeout(() => {

              setTimeout(() => {
                var elmnt: any = document.getElementById(this.aDependencias[this.indexDependencia].dep_areas[this.indexArea]._id);
                elmnt.scrollIntoView({ block: 'start', behavior: 'smooth' });
              })





          })


        }


      },500)
    }
      //var flags_direccion = [], jsondireccion:any = [], l = jsondireccion.length;

      /*this.aDependencias=output;
      output=null;*/




      this.ServicesProvider.preloaderOff();
    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo", null);
    });
  }


  onKeydown(event: any) {
    if (event) {
      if (event.key === "Enter") {
        this.fn_busquedaCampo();

      }
    }


  }

  fn_busquedaCampo() {
    let encontrado = false;
    for (var i in this.aDependencias) {
      if (this.ServicesProvider.fn_quitarAcentos(this.aDependencias[i]._id).search(this.ServicesProvider.fn_quitarAcentos(this.search)) != -1 || this.ServicesProvider.fn_quitarAcentos(this.aDependencias[i].dep_nombre).search(this.ServicesProvider.fn_quitarAcentos(this.search)) != -1) {
        this.indexUnidad = this.aDependencias[i]._id;
        encontrado = true;
        this.bSeleccionInicial = false;
        let el: HTMLElement = this.acc["_results"][i].nativeElement;
        el.click();
        return '';
      }
      for (var j in this.aDependencias[i].dep_areas) {
        if (this.ServicesProvider.fn_quitarAcentos(this.aDependencias[i].dep_areas[j]._id+"").search(this.ServicesProvider.fn_quitarAcentos(this.search+"")) != -1 || this.ServicesProvider.fn_quitarAcentos(this.aDependencias[i].dep_areas[j].nombre+"").search(this.ServicesProvider.fn_quitarAcentos(this.search+"")) != -1 || this.ServicesProvider.fn_quitarAcentos(this.aDependencias[i].dep_areas[j].extension+"").search(this.ServicesProvider.fn_quitarAcentos(this.search+"")) != -1) {

          document.getElementById(this.aDependencias[i].dep_areas[j]._id)!.click();
          encontrado = true;
          this.bSeleccionInicial = true;
          let el: HTMLElement = this.acc["_results"][i].nativeElement;
          el.click();
          setTimeout(() => {
            var elmnt: any = document.getElementById(this.aDependencias[i].dep_areas[j]._id);
            elmnt.scrollIntoView({ block: 'start', behavior: 'smooth' });
          })

          this.indexDireccion = this.aDependencias[i].dep_areas[j]._id;
          return '';
        }
        for (var t in this.aDependencias[i].dep_areas[j].responsables) {
          if (this.ServicesProvider.fn_quitarAcentos(this.aDependencias[i].dep_areas[j].responsables[t]._id).search(this.ServicesProvider.fn_quitarAcentos(this.search)) != -1 || this.ServicesProvider.fn_quitarAcentos(this.aDependencias[i].dep_areas[j].responsables[t].nombre).search(this.ServicesProvider.fn_quitarAcentos(this.search)) != -1) {

            encontrado = true;
            this.bSeleccionInicial = true;
            let el: HTMLElement = this.acc["_results"][i].nativeElement;
            el.click();

            this.indexDireccion = this.aDependencias[i].dep_areas[j]._id;
            document.getElementById(this.aDependencias[i].dep_areas[j]._id)!.click();
            this.idResponsable = this.aDependencias[i].dep_areas[j].responsables[t]._id;

            setTimeout(() => {
              var elmnt: any = document.getElementById(this.aDependencias[i].dep_areas[j].responsables[t]._id);
              elmnt.scrollIntoView({ block: 'start', behavior: 'smooth' });
            })
            return '';

          }
        }

      }


    }
    if (encontrado == false) {
      this.ServicesProvider.fn_generarAlerta("Advertencia", "No existen resultados a tu búsqueda")
    }

  }

  fn_mostrarTarjeta(dependencia: any, direccion: any, idx_dependencia?: any, idx_area?: any) {
    this.indexDireccion = -1;
    this.idResponsable = -1;
    this.indexUnidad = -1;
    this.bSeleccionInicial = true;
    this.oSeleccion = dependencia;
    this.indexDependencia = idx_dependencia;
    if (direccion) {
      this.indexArea = idx_area;
      setTimeout(()=>{
        this.indexUnidad = direccion._id;
        this.indexDireccion = direccion._id;

      })
      this.indexDireccion = direccion._id;
      setTimeout(() => {
        var elmnt: any = document.getElementById('r' + direccion._id);
        elmnt.scrollIntoView({ block: 'start', behavior: 'smooth' });
      })



    }

  }


}

