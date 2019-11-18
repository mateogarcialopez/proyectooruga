import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { ActivatedRoute } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServicesProvider } from '../providers/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private activatedComponent:any;
  private componentActivo:any;
  hide: boolean;

	constructor(
			private router : Router,
			private activatedRoute: ActivatedRoute,				
      private ServicesProvider:ServicesProvider
		){


	}

  //onActivate(component:any){

    onActivate(component:any){
      this.componentActivo = component;
      var getRuta:any = this.activatedRoute.snapshot;
      getRuta=getRuta._routerState.url;
          if(getRuta=='/'){
            this.activatedComponent="LoginComponent";
          }
          else if(getRuta.search("/dashboard")!=-1){
            this.activatedComponent="DashboardComponent";
          }
          else if(getRuta.search("/compra")!=-1){
            this.activatedComponent="ComprasComponent";
          }
          else if(getRuta.search("/curso")!=-1){
            this.activatedComponent="CursoComponent";
          }
          else if(getRuta.search("/foro")!=-1){
            this.activatedComponent="ForoComponent";
          }
          else if(getRuta.search("/curso/detalle-curso/")!=-1){
            this.activatedComponent="DetalleCursoComponent";
          }
          else if(getRuta.search("/institucion")!=-1){
            this.activatedComponent="InstitucionComponent";
          }
          else if(getRuta.search("/chat")!=-1){
            this.activatedComponent="ChatComponent";
          }
          /*
          else if(getRuta.search("/evento/detalle-evento")!=-1){
            this.activatedComponent="DetalleEventoComponent";
          }

          else if(getRuta.search("/chat")!=-1){
            this.activatedComponent="ChatComponent";
          }
          else if(getRuta.search("/restore-password")!=-1){
            this.activatedComponent="RestorePasswordComponent";
          }
          else if(getRuta.search("/curso-diplomado/det-curso-diplomado/")!=-1){
            this.activatedComponent="DetCursoDiplomadoComponent";
          }
          else if(getRuta.search("/curso-diplomado")!=-1){
            this.activatedComponent="CursoDiplomadoComponent";
          }
          else if(getRuta.search("/calendario")!=-1){
            this.activatedComponent="CalendarioComponent";
          }
          else if(getRuta.search("/becas")!=-1){
            this.activatedComponent="BecasComponent";
          }
          else if(getRuta.search("/programa/detalle-programa/")!=-1){
            this.activatedComponent="DetalleProgramaComponent";
          }
          else if(getRuta.search("/programa")!=-1){
            this.activatedComponent="ProgramaComponent";
          }
          else if(getRuta.search("/solicitud")!=-1){
            this.activatedComponent="SolicitudComponent";
          }
          else if(getRuta.search("/solicitud")!=-1){
            this.activatedComponent="SolicitudComponent";
          }
          else if(getRuta.search("/proceso")!=-1){
            this.activatedComponent="ProcesoComponent";
          }
          else if(getRuta.search("/dependencia")!=-1){
            this.activatedComponent="DependenciaComponent";
          }
          else if(getRuta.search("/servicios")!=-1){
            this.activatedComponent="ServiciosComponent";
          }
          else if(getRuta.search("/dependencia")!=-1){
            this.activatedComponent="LoginComponent";
          }
          else if(getRuta.search("/institucion")!=-1){
            this.activatedComponent="InstitucionComponent";
          }
          else if(getRuta.search("/usuario")!=-1){
            this.activatedComponent="UsuarioComponent";
          }
          else if(getRuta.search("/directorio")!=-1){
            this.activatedComponent="DirectorioComponent";
          }
          else if(getRuta.search("/estadistica")!=-1){
            this.activatedComponent="EstadisticaComponent";
          }
          */

          else{
            this.activatedComponent="RestorePasswordComponent";
          }
      
 
    if(this.activatedComponent != 'LoginComponent' && this.activatedComponent != 'RestorePasswordComponent'  && this.activatedComponent != 'NotFoundComponent'){
      this.hide = true;
    } else {
      this.hide = false;
		}

    if(!localStorage.getItem("token") && this.activatedComponent != 'RestorePasswordComponent' ){
      this.router.navigate(['/']);
      return '';
    }
    else if(this.activatedComponent=='LoginComponent'){
      this.router.navigate(['/dashboard']);
    }
    this.ServicesProvider.urlActual=this.activatedComponent;
    this.ServicesProvider.breadcum=[];
    this.ServicesProvider.oDifusionEnviar.nombre="";
    let url:any=location.href.split("/");
    this.ServicesProvider.seccion="";
    this.ServicesProvider.urlid=url[url.length-1];

    switch(this.ServicesProvider.urlActual){
      case "DashboardComponent":
          this.ServicesProvider.formDifusion.reset();
          this.ServicesProvider.formDifusion.controls["categoria"].setValue("general");
          break;
          /*
      case "ProgramaComponent":
        this.ServicesProvider.formDifusion.controls["categoria"].setValue("programa");
        this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});
        this.ServicesProvider.breadcum.push({"titulo":"Programas","ruta":"programa","clase":"disabled","icono":"fas fa-address-card"});  
        break;
      case "DetalleProgramaComponent":
          this.ServicesProvider.formDifusion.controls["id"].setValue(url[url.length-1]);
          this.ServicesProvider.formDifusion.controls["categoria"].setValue("programa");
          this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});
          this.ServicesProvider.breadcum.push({"titulo":"Programas","ruta":"programa","clase":"pointer","icono":"fas fa-address-card"});
          this.ServicesProvider.breadcum.push({"titulo":"Detalle Programas","ruta":"detalle-programa", "clase":"disabled","icono":"fas fa-address-card"});
          this.ServicesProvider.seccion="programa"
          break;  
      case "CalendarioComponent":
          this.ServicesProvider.formDifusion.controls["categoria"].setValue("calendario");
          this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});
          this.ServicesProvider.breadcum.push({"titulo":"Calendario","ruta":"calendario","clase":"disabled","icono":"fas fa-calendar"});
          break;    
      case "BecasComponent":
          this.ServicesProvider.formDifusion.controls["categoria"].setValue("beca");
          this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});
          this.ServicesProvider.breadcum.push({"titulo":"Becas","ruta":"beca","clase":"disabled","icono":"fas fa-handshake"});
          break;  
      case "DependenciaComponent":
          this.ServicesProvider.formDifusion.controls["categoria"].setValue("dependencia");
          this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});
          this.ServicesProvider.breadcum.push({"titulo":"Dependencias","ruta":"dependencia","clase":"disabled","icono":"fas fa-building"});
          break;    
      case "CursoDiplomadoComponent":
          this.ServicesProvider.formDifusion.controls["categoria"].setValue("curso_diplomado");
          this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});
          this.ServicesProvider.breadcum.push({"titulo":"Cursos y Diplomados","ruta":"curso-diplomado","clase":"disabled","icono":"fas fa-atom"});
          break;     
      case "DetCursoDiplomadoComponent":
          this.ServicesProvider.formDifusion.controls["id"].setValue(url[url.length-1]);
          this.ServicesProvider.formDifusion.controls["categoria"].setValue("curso_diplomado");
          this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});
          this.ServicesProvider.breadcum.push({"titulo":"Cursos y Diplomados","ruta":"curso-diplomado","clase":"pointer","icono":"fas fa-atom"});
          this.ServicesProvider.breadcum.push({"titulo":"Detalles","ruta":"detalle-programa", "clase":"disabled","icono":"fas fa-atom"});
          this.ServicesProvider.seccion="curso_diplomado"
          break;  
      case "ProcesoComponent":
          this.ServicesProvider.formDifusion.controls["categoria"].setValue("proceso");
          this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});
          this.ServicesProvider.breadcum.push({"titulo":"Proceso","ruta":"proceso","clase":"disabled","icono":"fas fa-cogs"});
          break;   
      case "ServiciosComponent":
          this.ServicesProvider.formDifusion.controls["categoria"].setValue("servicios");
          this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});
          this.ServicesProvider.breadcum.push({"titulo":"Servicios","ruta":"servicios","clase":"disabled","icono":"fas fa-concierge-bell"});
          break;            
      case "InstitucionComponent":
          this.ServicesProvider.formDifusion.controls["categoria"].setValue("institucion");
          this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});
          this.ServicesProvider.breadcum.push({"titulo":"Institucion","ruta":"institucion","clase":"disabled","icono":"fas fa-landmark"});
          break;                                                    
      case "EventoComponent":
          this.ServicesProvider.formDifusion.controls["categoria"].setValue("evento");
          this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});  
          this.ServicesProvider.breadcum.push({"titulo":"Eventos","ruta":"evento","clase":"disabled","icono":"fas fa-calendar"});
        break;
      case "DetalleEventoComponent":
          this.ServicesProvider.formDifusion.controls["id"].setValue(url[url.length-1]);
          this.ServicesProvider.formDifusion.controls["categoria"].setValue("evento");
          this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});  
          this.ServicesProvider.breadcum.push({"titulo":"Eventos","ruta":"evento","clase":"pointer","icono":"fas fa-calendar"});
          this.ServicesProvider.breadcum.push({"titulo":"Detalle Eventos","ruta":"detalle-evento", "clase":"disabled","icono":"fas fa-calendar"});
          this.ServicesProvider.seccion="evento"
          break;
      case "UsuarioComponent":
            this.ServicesProvider.formDifusion.controls["categoria"].setValue("usuario");
            this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});  
            this.ServicesProvider.breadcum.push({"titulo":"Usuario","ruta":"usuario","clase":"disabled","icono":"fas fa-user-alt"});
          break;
      case "SolicitudComponent":
            this.ServicesProvider.formDifusion.controls["categoria"].setValue("solicitud");
            this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});  
            this.ServicesProvider.breadcum.push({"titulo":"Solicitudes","ruta":"solicitud","clase":"disabled","icono":"fas fa-comment-dots"});
          break;
      case "DirectorioComponent":
            this.ServicesProvider.formDifusion.controls["categoria"].setValue("directorio");
            this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});  
            this.ServicesProvider.breadcum.push({"titulo":"Directorio","ruta":"directorio","clase":"disabled","icono":"fas fa-address-book"});
          break;    
      case "EstadisticaComponent":
            this.ServicesProvider.formDifusion.controls["categoria"].setValue("estadistica");
            this.ServicesProvider.breadcum.push({"titulo":"Inicio","ruta":"dashboard","clase":"pointer","icono":"fas fa-home"});  
            this.ServicesProvider.breadcum.push({"titulo":"Estadística","ruta":"directorio","clase":"disabled","icono":"fas fa-chart-line"});
          break;   
          
        /*case "EventoComponent":
          aRutas.push("Evento");
          break;*/       

    }



  }

  fn_llamarIndexador(){

      this.componentActivo.fn_indexador();
  }




}
