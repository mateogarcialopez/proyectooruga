// modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PanelRoutingModule } from './panel-routing.module';
import {MomentModule} from 'angular2-moment';


//componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';


//servicios


//ngmodule
@NgModule({
    
    declarations: [
        MainComponent,
        AddComponent,
        EditComponent,
        ListComponent,
    ],
    imports: [
        CommonModule, 
        FormsModule,
        HttpClientModule,
        PanelRoutingModule,
        ReactiveFormsModule,
        MomentModule,
    ],
    exports: [
        MainComponent,
        AddComponent,
        EditComponent,
        ListComponent,
    ],
    providers:[

    ],
    
})
export class PanelModule {


    constructor(){

    }
}