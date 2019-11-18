import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { URL,SERVICES } from '../config/webservices';
import { VARIABLES } from '../config/variables';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService  } from 'ng-uikit-pro-standard';
import { ModalgenericoComponent } from "../pages/modalgenerico/modalgenerico.component"
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';
//uso
//import { ServicesProvider } from '../../providers/services';
//qwerty
@Injectable()
export class ServicesProvider {
  protected url = URL;
  bSuperPreload:boolean=false;
  modalRef: MDBModalRef;
  numNotificaciones:any;
  aNotificaciones:any=[];
  urlActual:any;
  breadcum:any=[];
  oSeccion:any=[];
  formDifusion: FormGroup;
  parametrosSeccion:any;
  aStopwords=["de","a","la","los","las","en","y", "-", ".",""];
  intervaloNotificacion:any;
  aIndexacion:any;
  urlid:any;
  seccion:any;
  oCategoria:any=[
    {"value":"General",
     "seccion":"general"
    },
    {"value":"Cursos",
    "seccion":"curso"
    }, 
    {"value":"Foro",
    "seccion":"foro"
    },  
    {"value":"Chat",
    "seccion":"chat"
    },  
    {"value":"Dependencias",
    "seccion":"dependencia"
    },  
    {"value":"Diplomados y Cursos",
    "seccion":"curso_diplomado"
    },  
    {"value":"Procesos",
    "seccion":"proceso"
    },  
    {"value":"Servicios",
    "seccion":"servicios"
    },  
    {"value":"Institución",
    "seccion":"institucion"
    },  
    {"value":"Eventos",
    "seccion":"evento"
    },
    {"value":"Usuario",
    "seccion":"usuario"
    },
    {"value":"Solicitudes",
    "seccion":"solicitud"
    },
    {"value":"qwerty",
    "seccion":"directorio"
    }     


  ]
  oDifusionEnviar:any={};
  constructor(
    private http: Http,
    private datePipe: DatePipe,
    private router : Router,
    public modalService: MDBModalService,
    private toastService: ToastService,
    public fb: FormBuilder
  ) {
    this.formDifusion = fb.group({
      
      nombre: ['', [Validators.required]],
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: ['', []],
      termino: ['', []],
      motivo: ['', []],
      categoria: ['', []],
      id: ['', []],
      nombre_id: ['', []]

    });
  }


  //tener en el component
  //import { IMyOptions } from 'ng-uikit-pro-standard';
  //public myDatePickerOptions: IMyOptions;
  //<mdb-date-picker name="mydate" [options]="myDatePickerOptions" [placeholder]="'Selected date'" [(ngModel)]="model"
    //required></mdb-date-picker>
  //this.myDatePickerOptions=this.getDatepickerOpt("posterior");
  //fin_fecha:  'posterior' => valida que no se puedan seleccionar fechas posteriores
  //fin_fecha:  null => no valida que no se puedan seleccionar fechas posteriores
  getDatepickerOpt(fin_fecha:any){

    if(fin_fecha=="posterior"){     
       VARIABLES.datepicker["minYear"]=new Date().getFullYear();
      var fechaManana:any = new Date().setDate( new Date().getDate() + 1 );
      fechaManana=this.datePipe.transform(fechaManana, 'yyyy/MM/dd');
      fechaManana=fechaManana.split("/");
      VARIABLES.datepicker["maxYear"]=parseInt(fechaManana[0])+1;
      //VARIABLES.datepicker["disableSince"]= {year: fechaManana[0], month: fechaManana[1], day: fechaManana[2]};
    }
    else if("anterior"){
      var fechaAyer:any = new Date().setDate( new Date().getDate() - 1 );
      fechaAyer=this.datePipe.transform(fechaAyer, 'yyyy/MM/dd');
      fechaAyer=fechaAyer.split("/");
      VARIABLES.datepicker["disableUntil"]= {year: fechaAyer[0], month: fechaAyer[1], day: fechaAyer[2]};

    }
    return VARIABLES.datepicker;
  }

  fn_sesion(){
    if(!localStorage.getItem("nombre")){
       return this.router.navigate(["/"]);
    }
  }

  fn_cerrarSesion(){
    localStorage.clear();
  }
  //cuenta cuantos dias restan pasada una fecha y la cantidad de dias
  /*getDaysRemaining(dias:any,fecha:any){
    let fechaRecibida:any=new Date(fecha);

    let hoy:any = new Date();
    let fecha_mas_dias:any=fechaRecibida.setDate(fechaRecibida.getDate() + parseInt(dias)+1);
    fecha_mas_dias=new Date(this.datePipe.transform(fecha_mas_dias, 'yyyy/MM/dd')) ;
    let _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let utc1 = Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    let utc2 = Date.UTC(fecha_mas_dias.getFullYear(), fecha_mas_dias.getMonth(), fecha_mas_dias.getDate());
    return (Math.floor((utc2 - utc1) / _MS_PER_DAY));
  }*/

  
  fn_quitarAcentos(s:any){

    
    if(!isNaN(s) || !s){
      return s;
    }
    var r=s.toLowerCase();
    r = r.replace(new RegExp(/\s/g),"");
    r = r.replace(new RegExp(/[àáâãäå]/g),"a");
    r = r.replace(new RegExp(/[èéêë]/g),"e");
    r = r.replace(new RegExp(/[ìíîï]/g),"i");
    r = r.replace(new RegExp(/ñ/g),"n");                
    r = r.replace(new RegExp(/[òóôõö]/g),"o");
    r = r.replace(new RegExp(/[ùúûü]/g),"u");
    //s.normalize('NFD').replace(/[\u0300-\u036f]/g, "")

    return r;
  }

  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
  }

  fn_generarAlerta(tipo:any,mensaje:any){
    const options = { toastClass: 'opacity' };
    if(tipo.toLowerCase()=="exito" || tipo.toLowerCase()=="éxito"){
        this.toastService.success(mensaje,'Éxito', options);
    }
    else if(tipo.toLowerCase()=="error" ){
      this.toastService.error(mensaje,'Error', options);
    }
    else{
      this.toastService.warning(mensaje,'Advertencia', options);

    }
    

  }
 

  fn_getSolicitudes(){

    //this.fechaEspanol=this.fn_fechaEspanol(this.filtro_fecha);
  
    return this.get(SERVICES.GETSOLICITUDES,{"filtro":"pendiente", "add":true,"update":true,"delete":true})
  
  
  }


  
  fn_fechaEspanol(fecha_entrante:any){
    //debe estar en formato yyyy/mm/dd
    fecha_entrante=fecha_entrante.split("/");
    let fecha:any= new Date(fecha_entrante[2]+"/"+fecha_entrante[1]+"/"+fecha_entrante[0]);
    fecha=fecha+"";
    fecha=fecha.split(" ");

    let oDias:any={
      "tue":"Martes",
      "wed":"Miércoles",
      "thu":"Jueves",
      "fri":"Viernes",
      "sat":"Sabado",
      "mon": "Lunes",
      "sun":"Domingo"
    }
    
    let oMes:any={
      "jan":"Enero",
      "feb":"Febrero",
      "mar":"March",
      "apr":"Abril",
      "may":"Mayo",
      "jun":"Junio",
      "jul":"Julio",
      "aug":"Agosto",
      "sep":"Septiembre",
      "oct":"Octubre",
      "nov":"Noviembre",
      "dec":"Diciembre"
    }

    return  oDias[fecha[0].toLowerCase()]+" "+ fecha[2]+" "+ oMes[fecha[1].toLowerCase()]+", "+ fecha[3]

  }
  //dd/mm/yyyy
  checkDateBetween(fecha_inicio:any,fecha_fin:any,fecha_comparar:any){
    var dateFrom,dateTo,dateCheck:any;

    if(fecha_comparar.split(" ").length>1){
      fecha_comparar=fecha_comparar.split(" ")[0];
    }

     /* Normalizacion a dd/mm/yyyy pues se recibe como yyyyy*/
    fecha_inicio=fecha_inicio.split(":");
    let tempDate2=fecha_inicio[0].split("/");
    if(tempDate2[2].length>2){
      fecha_inicio = tempDate2[2]+"/"+tempDate2[1]+"/"+tempDate2[0];
    }
    else{
      fecha_inicio = tempDate2[0]+"/"+tempDate2[1]+"/"+tempDate2[2];
    }


    fecha_fin=fecha_fin.split(":");
    tempDate2=fecha_fin[0].split("/");
    if(tempDate2[2].length>2){
      fecha_fin = tempDate2[2]+"/"+tempDate2[1]+"/"+tempDate2[0];
    }
    else{
      fecha_fin = tempDate2[0]+"/"+tempDate2[1]+"/"+tempDate2[2];
    }

    fecha_comparar=fecha_comparar.split(":");
    tempDate2=fecha_comparar[0].split("/");
    if(tempDate2[2].length>2){
      fecha_comparar = tempDate2[2]+"/"+tempDate2[1]+"/"+tempDate2[0];
    }
    else{
      fecha_comparar = tempDate2[0]+"/"+tempDate2[1]+"/"+tempDate2[2];
    }



    dateFrom = fecha_inicio;
    dateTo = fecha_fin;
    dateCheck = fecha_comparar;
    var d1:any = dateFrom.split("/");
    var d2:any = dateTo.split("/");
    var c:any = dateCheck.split("/");

    var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    var check = new Date(c[2], parseInt(c[1])-1, c[0]);

    return (check >= from && check <= to)
  }


  // retorna desde donde empieza la semana,termina y fecha actual en dd/mm/yyyy
  getCurrentDates(){
    var oFecha:any={};
    let today:any = new Date();
    let dd:any = today.getDate();
    let mm:any = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    //today = dd + '/' + mm + '/' + yyyy;
    today = yyyy+ "/"+mm + '/' +dd ;

    oFecha["hoy"]=today;
    //inicio de semana
    let d:any=new Date(new Date());
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday


    today= new Date(d.setDate(diff));
    dd = today.getDate();
    mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    today = dd + '/' + mm + '/' + yyyy;
    oFecha["inicio_semana"]=today;


    var td = new Date(); 
    var nextSunday= new Date(td.getFullYear(),td.getMonth(),td.getDate()+(7-td.getDay()))

    today= new Date(nextSunday);
    dd = today.getDate();
    mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    today = dd + '/' + mm + '/' + yyyy;

    oFecha["fin_semana"]=today;
    return oFecha;
  }

  getCurrentYear(){
    let aAnios=[];
    let aAnioActual;
    for(let i=2017; i<=new Date().getFullYear(); i ++){
      aAnios.push(i);
    }

    aAnioActual=(new Date()).getFullYear();
    return { "aAnios":aAnios, "iAnioActual":aAnioActual};
  }

  getCurrentYear_mas1(){
    let aAnios=[(new Date()).getFullYear(),(new Date()).getFullYear()+1];    
    return aAnios;
  }

  //yyyy-mm-dd
  //si se quiere restar dias entre 2 fechsa incluir el primer argumento, asi como esta solo resta desde el dia actual a una fecha
  countDays(date2:any)
  {

      let _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // por defecto se resta desde el dia actual
      let hoy:any = new Date();
      date2 = new Date(date2);
      let utc1 = Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
      let utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
      return (Math.floor((utc2 - utc1) / _MS_PER_DAY));
  }

    //value es fecha de inicio de la primera fecha, y la segunda es opcional y se pone para hacer el between
    fn_getFechaHumana(value: string,datefin?:any): any {
      let oRemaining= this.fn_mostrarFechaHumana(value);
      if(oRemaining.horas<0 || oRemaining.horas<0 && oRemaining.minutos<0){
        if(datefin){
          let fechafinal=this.fn_mostrarFechaHumana(datefin);
          if(fechafinal.horas<0 || fechafinal.horas<0 && fechafinal.minutos<0){
            return {"mensaje":"Expirado","tiempo":"","expirado":true};
          }
          else{
            return {"mensaje":"Ya Empezó","tiempo":"","expirado":true};
          }
        }
        return {"mensaje":"Expirado","tiempo":"","expirado":true};
      }
      else{
        return this.fn_formatDate(oRemaining);
      }
        
     
      

    }

  //retorna diferencia al formato dd/mm/yyy| yyy/mm/dd hh:mm:ss
  fn_mostrarFechaHumana(date2: any): any {


    let fecha_formato_T=date2.split("T");
    if(fecha_formato_T.length>1){
      let hora_t=fecha_formato_T[1].split(".");
      let fecha=fecha_formato_T[0].split("-");
      date2=fecha[2]+"/"+fecha[1]+"/"+fecha[0]+ " "+hora_t[0];
    }
    
    date2=date2.split(" ");

    //recibe yyyy-mm-dd
    let tempDate2=date2[0].split("/");
    if(tempDate2[2].length>2){
      date2 = tempDate2[2]+"/"+tempDate2[1]+"/"+tempDate2[0]+"/"+ " "+date2[1];
    }
    else{
      date2 = tempDate2[0]+"/"+tempDate2[1]+"/"+tempDate2[2]+"/"+" "+date2[1];

    }
    let date1:any = new Date();

    date2 = new Date(date2);
    var msec = date2 - date1;
    var mins = Math.floor(msec / 60000);
    var hrs = Math.floor(mins / 60);
    var days:number = Math.floor(hrs / 24);
    var yrs = Math.floor(days / 365);
    var mins=(date2.getMinutes()==0?60:date2.getMinutes())-(date1.getMinutes()==0?60:date1.getMinutes());
    let mes:any=(days/30.417);
    mes=parseInt(mes);
    let oRemaining:any={
      "anos":yrs,
      "anos_texto":yrs==1?"Año":"Años",
      "dias":days,
      "dias_texto":days==1?"Día":"Días",
      "mes":mes,
      "mes_texto":mes==1?"Mes":"Meses",
      "minutos":mins,
      "minutos_texto":mins==1?"Min":"Min", 
      "horas":hrs,
      "horas_texto":hrs==1?"Hora":"Horas",      
      "segundos":msec,
      "segundos_texto":msec==1?"Segundo":"Segundos"    
    };
    return oRemaining;
/*
    console.log(oRemaining);
    if(message.search("-")!=-1){
      return {"mensaje":"En curso!","tiempo":"","expirado":true};
    }
    return {"mensaje":message,"tiempo":oRemaining,"expirado":false};*/
    //return "En "+message 
  }
 //retorna en formato humano es decir 1dia, 1 mes, 1 año, 23horas y 3 mintuos
  fn_formatDate(oRemaining:any){
    var message="";
    if(oRemaining.anos!=0 && oRemaining.anos>0){
      message=oRemaining.anos+" "+oRemaining.anos_texto
    }
    else if(oRemaining.mes!=0 && oRemaining.mes>0){
      message=oRemaining.mes+" "+oRemaining.anos_texto
    }
    else if(oRemaining.dias!=0 && oRemaining.dias>0){
      message=oRemaining.dias+" "+oRemaining.dias_texto
    }

    else if(oRemaining.horas!=0 && oRemaining.horas>0){
      message=oRemaining.horas+" "+oRemaining.horas_texto + " "+Math.abs(oRemaining.minutos)+" "+oRemaining.minutos_texto ;
      

    }
    else{
      message=oRemaining.minutos+" "+Math.abs(oRemaining.minutos_texto) 
    }

      return {"mensaje":message,"tiempo":oRemaining,"expirado":false};
  }

  


  generarPopupGenerico(titulo:string, cuerpo:string,funcion?:any,scope?:any,param?:any){
    this.modalRef =  this.modalService.show(ModalgenericoComponent);
    this.modalRef.content.title = titulo;
    this.modalRef.content.body = cuerpo;
    this.modalRef.content.component=scope;
    this.modalRef.content.funcion=funcion;
    this.modalRef.content.param=param;

    if(titulo.toLowerCase()=="exito" || titulo.toLowerCase()=="éxito"){
      this.modalRef.content.estilo="success";
    }
    else if(titulo.toLowerCase()=="error" ){
      this.modalRef.content.estilo="danger";
    }
    else{
      this.modalRef.content.estilo="warning";
    }
  }

  /*
    esta funcion genera un popup dinámico y además permite llamar funciones
    genera un popup genérico.
    titulo: titulo del modal, de ahi se depende el color ej: 'Éxito', 'error', 'info'
    cuerpo: cuerpo del modal

    estos parametros son para llamar una funcion contenida en el mismo componente

    funcion: nombre de la funcion en string
        scope: enviar  this

    param: parametros en cadena
    this.generarPopupGenerico("Advertencia", "¿Desea eliminar este avance del entregable","fn_deleteDetalleEntregable",this,id);
  }
  */
  /*generarPopupGenerico(titulo:string, cuerpo:string,funcion?:any,scope?:any,param?:any){
    this.modalRef =  this.modalService.show(ModalgenericoComponent);
    this.modalRef.content.title = titulo;
    this.modalRef.content.body = cuerpo;
    this.modalRef.content.component=scope;
    this.modalRef.content.funcion=funcion;
    this.modalRef.content.param=param;

    if(titulo.toLowerCase()=="exito" || titulo.toLowerCase()=="éxito"){
      this.modalRef.content.estilo="success";
    }
    else if(titulo.toLowerCase()=="error" ){
      this.modalRef.content.estilo="danger";
    }
    else{
      this.modalRef.content.estilo="warning";
    }
  }*/

  //retorna el icono de la extension
  fn_getIconMedia(extension:any){
    extension=extension.toLowerCase();
    extension=extension.split(".");
    extension=extension[extension.length-1];
    if(extension=="jpg" || extension=="jpeg" || extension=="png" || extension=="gif" || extension=="bmp" || extension=="tif"){
       return  "fas fa-image";
    }
    else if(extension=="pdf"){
      return "far fa-file-pdf";
    }
    else if(extension=="doc" || extension=="docx"){
      return "far fa-file-word";
    }
    else if(extension=="ppt" || extension=="pptx"){
      return "fa-file-powerpoint-o";
    }
    else if(extension=="xls" || extension=="xlxs"){
      return "fa-file-powerpoint";
    }
    else{
      return "far fa-file";
    }
  }

  //bSuperPreload si es true el preloadOff también debe ser true, con esto se garantiza que ningun preloader sin el parametro true lo pueda cerrar
  preloaderOn(bSuperPreload?:boolean){
    if(bSuperPreload){
      this.bSuperPreload=bSuperPreload;
    }
    if(document.querySelector('#preloader')){
      document.querySelector('#preloader')!.classList.remove("hide_preloader");
      document.querySelector('#preloader')!.classList.add("show_preloader");
    }
    else{
      var d1 = document.querySelector('body');
      d1!.insertAdjacentHTML('beforeend', '<div  id="preloader"><div class="showbox"><div class="loader1"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg><div class="cargando">Cargando...</div></div></div><div class="preloader view" style="height:100vh; width:100vw; position:fixed; top:0; left:0; z-index:9999 !important; opacity:0.5; background:black;"><div class="flex-center"></div></div></div>');
    }
  }
  preloaderOff(bSuperPreload?:boolean){
    if(bSuperPreload){
      this.bSuperPreload=false;
    }
    if(!this.bSuperPreload){
      if(document.querySelector('#preloader')){
        document.querySelector('#preloader')!.classList.remove("show_preloader");
        document.querySelector('#preloader')!.classList.add("hide_preloader");      
      }
    }
  }
  //define color en escala de 1 a 100
  estadoSemaforo(valor:any){
    if(valor>=99){
      return "background_verde";
    }
    else if(valor>=20 && valor<= 44){
      return "background_rojo_amarillo";
    }

    else if(valor>=45 && valor<= 70){
      return "background_amarillo";
    }
    else if(valor>=71 && valor<99){
      return "background_amarillo_verdoso";
    }

    else{
      return "background_rojo";
    }     
  }
  //define color en escala de 1 a 100
    getColorestadoSemaforo(valor:any){
    if(valor==100){
      return {"color": "a8e063", "class":"background_verde"};
    }
    else if(valor>20 && valor<=65){
      return  {"color": "ff4800", "class":"background_naranja"};
    }

    else if(valor>=66 && valor<= 99){
      return  {"color": "c79810", "class":"background_amarillo"};
    }
    else{
      return {"color": "ed213a", "class":"background_rojo"};
    }     
  }

  //define color segun diferencia de dias para entregables
  estadoSemaforoDia(dia:any){
    if(dia>=31){
      return "background_verde";
    }
    else if(dia>11 && dia< 30){
      return "background_amarillo";
    }
    else{
      return "background_rojo";
    }     
  }
  //define color segun diferencia de dias para entregables
  estadoSemaforoDiaSolicitudes(dia:any){
    if(dia>=7){
      return "background_verde";
    }
    else if(dia>3 && dia< 6){
      return "background_amarillo";
    }
    else{
      return "background_rojo";
    }     
  }

  alertaOn(titulo_alerta:string, cuerpo_alerta:string){
      if(titulo_alerta.toLowerCase()=='éxito' || titulo_alerta.toLowerCase()=='exito'){
        var clase_titulo="alert-success";
      }
      else if(titulo_alerta.toLowerCase()=='error' ){
        var clase_titulo="alert-danger";
      }
      else{
        var clase_titulo= "alert-warning";
      }

      if(document.querySelector('#alerta')){
        document.querySelector('#alerta')!.classList.remove("ocultar_animacion");
        document.querySelector('#alerta')!.classList.remove("ocultar");
        document.querySelector('#alerta')!.classList.remove("alert-success");
        document.querySelector('#alerta')!.classList.remove("alert-danger");
        document.querySelector('#alerta')!.classList.remove("alert-alert-warning");
        document.querySelector('#alerta')!.classList.add(clase_titulo);
      }
      else{
        var d1 = document.querySelector('body');
        d1!.insertAdjacentHTML('beforeend', '  <div #alert id="alerta" onclick="cerrarAlerta()" style="position:fixed; width:80%; top:0px; right:0px; z-index: 999999999 !important;" class="alert '+clase_titulo +' alert-dismissible fade show animated fadeIn" role="alert"><button type="button" class="close" aria-label="Close" (click)="closeAlert()"><span aria-hidden="true">&times;</span></button><strong id="titulo_alerta">*</strong> <span id="cuerpo_alerta">*</span>.</div>');
      }
      document.getElementById("titulo_alerta")!.innerHTML =titulo_alerta;
      document.getElementById("cuerpo_alerta")!.innerHTML =cuerpo_alerta;
      this.alertaOff();

  }

  alertaOff(){
      setTimeout(()=>{
        document.querySelector('#alerta')!.classList.add("ocultar_animacion");
        setTimeout(()=>{
          document.querySelector('#alerta')!.classList.add("ocultar");
        },3000)
      },2000)
  }


  //this.post(SERVICES.CONSULTAR_INFO, query,true/false)
  //is_file determina si el formulario envia un archivo
  public post(inUrl: string, query?: any,is_file?:boolean,token?: any): Promise<any> {
    return new Promise((resolve, reject) => {
 
      var headers;
      if(!is_file){
        headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization':  token

        });        

      }
      else{
        headers = new Headers({
          'Acces-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + token

        });        
      }

      const options = new RequestOptions({
        headers: headers
      });
      this.http.post(this.url +  inUrl, query, options)
      .subscribe(response => {
        try {
          response = response.json();
          resolve(response);
        } catch (error) {
          console.log('[api-274]', response);
          reject(response);
        }
      }, fail => {
        try {
          fail = fail.json();
        } catch (error) {
          console.log('[api-108]', fail);
        }
        reject(fail);
      });
    });
  }
  //this.get("https://reqres.in/api/users", {"page":2}).then((data) => {

  public get(inUrl: string, params: any): Promise<any> {
    //const formedUrl = this.filterAccents(inUrl.split(' ').join('-'));
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")

      });
      const options = new RequestOptions({
        headers: headers,
        params: params
      });
      this.http.get(this.url + inUrl, options)
      .subscribe(response => {
        try {
          response = response.json();
          resolve(response);
        } catch (error) {
          console.log('[api-274]', response);
          reject(response);
        }
      }, fail => {
        try {
          fail = fail.json();
        } catch (error) {
          console.log('[api-162]', fail);
        }
        reject(fail);
      });
    });
  }

  public getjson(inUrl: string, params: any): Promise<any> {
    //const formedUrl = this.filterAccents(inUrl.split(' ').join('-'));
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const options = new RequestOptions({
        headers: headers,
        params: params
      });
      this.http.get(inUrl, options)
      .subscribe(response => {
        try {
          response = response.json();
          resolve(response);
        } catch (error) {
          console.log('[api-274]', response);
          reject(response);
        }
      }, fail => {
        try {
          fail = fail.json();
        } catch (error) {
          console.log('[api-162]', fail);
        }
        reject(fail);
      });
    });
  }

  public delete(inUrl: string,params:any): Promise<any> {
    //const formedUrl = this.url +  inUrl;
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const options = new RequestOptions({
        headers: headers,
        params: params
      });
      this.http.delete(this.url + inUrl, options)
      .subscribe(response => {
        try {
          response = response.json();
          resolve(response);
        } catch (error) {
          console.log('[api-274]', response);
          reject(response);
        }
      }, fail => {
        try {
          fail = fail.json();
        } catch (error) {
          console.log('[api-227]', fail);
        }
        reject(fail);
      });
    });
  }


  public put(inUrl: string,id:any, query?: any): Promise<any> { 
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const options = new RequestOptions({
        headers: headers,
        params:id
      });
      this.http.put(this.url + inUrl, query, options)
      .subscribe(response => {
        try {
          response = response.json();
          resolve(response);
        } catch (error) {
          console.log('[api-274]', response);
          reject(response);
        }
      }, fail => {
        try {
          fail = fail.json();
        } catch (error) {
          console.log('[api-284]', fail);
        }
        reject(fail);
      });
    });
  }

  searchEntriesIndexacion(searchTerm: string,data:any) {
    let results:any[] = [];
    let term:any = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    term=term.split(" ");
    for(var i in this.aStopwords){
      for(var j in term){
        if(this.aStopwords[i]==term[j]){
          term.splice(j,1);
        }
      }
    }
    term=term.join(' ');
    data.forEach((found:any) => {
      let aItemSinEspacios=term.trim().split(' ');
        for(var i=0; i< aItemSinEspacios.length;i++){
          if(aItemSinEspacios[i] && (this.fn_quitarAcentos(found.texto.toString().replace(/,/gi,' ')).includes(this.fn_quitarAcentos(aItemSinEspacios[i])))){
            if(aItemSinEspacios.length-1==i){
              results.push(found);
            }
          }
        }
    });
    
    return results;

  }

  getFilteredData(input:any,data:any) {
    if(input.length>=3){
      return this.searchEntriesIndexacion(input,data)
    }
    else{
      return [];
    }
  }
 

  //recibe el objeto del autocompletar e input es el campo de texto
  fn_goToSection(section:any){
    this.parametrosSeccion=section;
    console.log(section)
    switch(section.ruta){
      case "/evento/":
          this.router.navigate(['evento/detalle-evento/',section.id]);
        break;
        
        case "//":
            let filtro:any="";


            if(this.parametrosSeccion.texto[0]=="onlypregrado"){
              filtro="pregrado";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);

            }
            else if(this.parametrosSeccion.texto[0]=="onlyposgrado"){
              filtro="posgrado";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);

            }
            else if(this.parametrosSeccion.texto[0]=="onlyespecializacion"){
              filtro="especializacion";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);

            }      
            else if(this.parametrosSeccion.texto[0]=="onlymaestria"){
              filtro="maestria";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);

            }      
            else if(this.parametrosSeccion.texto[0]=="onlydoctorado"){
              filtro="doctorado";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);

            }      
            else if(this.parametrosSeccion.texto[0]=="onlyposdoctorados"){
              filtro="posdoctorado";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);

            }   
            else if(this.parametrosSeccion.textoM=="Presencial / Virtual"){
              filtro="presencial_virtual";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);

            }              
            else if(this.parametrosSeccion.texto[0]=="onlypresencial"){
              filtro="presencial";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);
            }              
            else if(this.parametrosSeccion.texto[0]=="onlyvirtual"){
              filtro="virtual";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);
            }      
            else if(this.parametrosSeccion.texto[0]=="onlytecnologia"){
              filtro="tecnologia";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);
            }     
            else if(this.parametrosSeccion.texto[0]=="onlytecnico"){
              filtro="tecnico";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);
            }     
            else if(this.parametrosSeccion.texto[0]=="onlyprofesional"){
              filtro="profesional";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);
            }
            else if(this.parametrosSeccion.texto[0]=="onlyofertado"){
              filtro="ofertado";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);
            }   
            else if(this.parametrosSeccion.texto[0]=="onlynoofertado"){
              filtro="noOfertado";
              this.parametrosSeccion["filtro"]=filtro;
              this.router.navigate(['//']);
            }                      

            
            else{
              this.router.navigate(['/curs/detalle-curs/',section.id]);
            }
          break;
          case "/proceso/":
              this.parametrosSeccion=section;
              this.router.navigate(['/proceso/']);
          break;
          case "/cuenta/":
              this.parametrosSeccion=section;
              this.parametrosSeccion.filtro="cuenta";
              this.router.navigate(['/proceso/']);
          break;

          case "/beca/":
              this.parametrosSeccion=section;
              this.router.navigate(['/becas/']);
          break;     
          case "/dependencia/":
            this.parametrosSeccion=section;
            var texto=this.parametrosSeccion.textoM.split("-");
            this.parametrosSeccion.filtro=texto[texto.length-1];
            
            this.router.navigate(['/dependencia/']);
          break; 
          case "/servicio/":
            this.parametrosSeccion=section;
            var texto=this.parametrosSeccion.textoM.split("-");
            this.parametrosSeccion.filtro=texto[texto.length-1];
            
            this.router.navigate(['/servicios/']);
          break; 
          case "/calendario/":
            this.parametrosSeccion=section;
            this.router.navigate(['/calendario/']);
          break; 


          case "/directorio/":
            this.parametrosSeccion=section;
            this.router.navigate(['/directorio/']);
          break; 

          case "/curso_diplomado/":
              filtro="";
              if(this.parametrosSeccion.texto[0]=="onlydiplomado"){
                filtro="diplomado";
                this.parametrosSeccion["filtro"]=filtro;
                this.router.navigate(['/curso-diplomado/']);
              }    
              else if(this.parametrosSeccion.texto[0]=="onlycurso"){
                filtro="curso";
                this.parametrosSeccion["filtro"]=filtro;
                this.router.navigate(['/curso-diplomado/']);
              }  
              else{
                this.parametrosSeccion=section;
                this.router.navigate(['curso-diplomado/det-curso-diplomado/',section.id]);
              }
          break; 

          
          
    }

  }

}
