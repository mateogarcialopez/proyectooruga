import { PanelModule } from './panel/panel.module';
import { BrowserModule } from '@angular/platform-browser';
//import { MDBBootstrapModulesPro,MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { Ng2OdometerModule } from 'ng2-odometer'; // <-- import the module
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { ToastModule } from 'ng-uikit-pro-standard';
//import { MDBBootstrapModulesPro } from '../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
//import { MDBSpinningPreloader } from '../../projects/ng-uikit-pro-standard/src/lib/pro/mdb-pro.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MomentModule} from 'angular2-moment';


//import {ToastModule, ToastService} from '../../projects/ng-uikit-pro-standard/src/lib/pro/alerts';
import { NotFoundComponent,
          MenuComponent,
          DashboardComponent,
          LoginComponent,
          ComprasComponent,
          UsuarioComponent,
          FooterComponent,
          RestorePasswordComponent,
          ModalgenericoComponent,
          SolicitudComponent,
          CursoComponent, 
          ForoComponent,         
          DetalleCursoComponent,
          InstitucionComponent,
          ChatComponent,
          TopicsComponent,
          TopicDetallesComponent,
                    
          /*
          EventoComponent,
          CalendarioComponent,
          ProgramaComponent,
          DetalleProgramaComponent,
          CursoDiplomadoComponent,
          BecasComponent,
          DetCursoDiplomadoComponent,
          ProcesoComponent,
          DetalleEventoComponent,
          DependenciaComponent,
          ServiciosComponent,
          InstitucionComponent,
         
          DirectorioComponent,
          EstadisticaComponent
          */
        } from '../pages/index.paginas';

import { ServicesProvider } from '../providers/services';
import { routing, appRoutingProviders } from './app.routing'
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
import { fechahumana } from '../pipes/pipe-fechahumana';
import { fechaespanol } from '../pipes/pipe-fecha-espanol';
import { fecha_mes_espanol } from '../pipes/pipe-fecha-mes-espanol';
import { fechanormal } from '../pipes/pipe-fecha-normal';
import { ellipsis } from '../pipes/pipe-ellipsis';
import { pipekeys } from '../pipes/pipe-keys';
import { safepipe } from '../pipes/pipe-safe';
import { inicialesnombre } from '../pipes/pipe-inicialesusuario';
import { FilterPipe } from '../pipes/pipe-filtrarusuario';
//import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
//import { TopicDetallesComponent } from '../pages/topic-detalles/topic-detalles.component';
//import { TopicsComponent } from '../pages/topics/topics.component';
//import { MainComponent } from '../pages/panel/components/main/main.component';
//import { AddComponent } from '../pages/panel/components/add/add.component';
//import { EditComponent } from '../pages/panel/components/edit/edit.component';
//import { ListComponent } from '../pages/panel/components/list/list.component';
//import { ForoComponent } from '../pages/foro/foro.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NotFoundComponent,
    DashboardComponent,
    LoginComponent,
    fechahumana,    
    fechaespanol,
    fechanormal,
    fecha_mes_espanol,
    ellipsis,
    pipekeys,
    safepipe,
    FilterPipe,
    FooterComponent,
    RestorePasswordComponent,
    ModalgenericoComponent,
    inicialesnombre,
    UsuarioComponent,
    SolicitudComponent,
    ComprasComponent,
    CursoComponent,
    ForoComponent,
    DetalleCursoComponent,
    InstitucionComponent,
    ChatComponent,
    TopicsComponent,
    TopicDetallesComponent,
    //MainComponent,
    //AddComponent,
    //EditComponent,
    //ListComponent
  
    /*
    EventoComponent,
    CalendarioComponent,
    ProgramaComponent,    
    DetalleProgramaComponent,
    CursoDiplomadoComponent,
    BecasComponent,
    DetCursoDiplomadoComponent,
    ProcesoComponent,
    DetalleEventoComponent,
    DependenciaComponent,
    ServiciosComponent,
    InstitucionComponent,
    DirectorioComponent,
    EstadisticaComponent,
    */
   
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModulesPro.forRoot(),
    Ng2OdometerModule.forRoot(), // <-- include it in your app module
    ToastModule.forRoot(),
    //ToastModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    routing,
    PanelModule,
    MomentModule

    
  ],
  entryComponents: [ ModalgenericoComponent ],
  providers: [
  //MDBSpinningPreloader, 
    //ToastService,
    DatePipe,
    ServicesProvider,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
