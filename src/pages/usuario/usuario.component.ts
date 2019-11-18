import { OnInit ,Component, ViewChild} from '@angular/core'; //, Input, Output, EventEmitter  
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
//import { Router } from '@angular/router';
import  {SERVICES } from '../../config/webservices';
///import  {VARIABLES } from '../../config/variables';
import  {MESSAGES } from '../../config/messages';


@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  @ViewChild('modalUsuario') modalUsuario: any;
  formUsuario: FormGroup;
  oUsuario:any={}
  aUsuario:any=[];
  bSaveEdit=false;
  oUsuarioOriginal:any;
  iIndexBolas:number=1;
  registros:any="25";
  aPaginacion:any;
  ver_pass:boolean=false;
  constructor(

   private ServicesProvider: ServicesProvider,
   public fb: FormBuilder,
   //private router:Router

) {
  this.formUsuario = fb.group({
    usu_nombres: ['', [Validators.required,Validators]],
    usu_apellidos: ['', Validators.required],
    usu_correo:['', [Validators.required]],
    usu_contrasena:['', [Validators.required,Validators.minLength(4),Validators.maxLength(14)]],
    usu_telefono:['', []],
    usu_rol:['', [Validators.required]]
  });

 }
 oCheckFilter:any={
  "Consulta":true,
  "Administrador":true,
}

fn_editUsuario(){
  //this.fn_setFormData();
  //this.fn_resetFormEvento();
  this.fn_resetFormData(); 
  let keys:any=Object.keys(this.formUsuario.controls);
  console.log(this.oUsuarioOriginal);
  for(var i in keys){
    if(this.formUsuario.controls[keys[i]].value!=this.oUsuarioOriginal[keys[i]]){
          this.oUsuario[keys[i]]=this.formUsuario.controls[keys[i]].value;
    }
  }
  this.ServicesProvider.preloaderOn();
  this.ServicesProvider.post(SERVICES.GETUSUARIOS+"/"+this.oUsuarioOriginal._id, this.oUsuario,true,localStorage.getItem("token")).then(data=>{
      if(data.message.toLowerCase()=="registro afectado"){
        this.modalUsuario.hide();
        this.fn_getUsuarios();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);
      }
        else{
        this.modalUsuario.hide();
        this.ServicesProvider.fn_generarAlerta("Error", data.message);
      }
      //this.router.navigate(["home"]);
    this.ServicesProvider.preloaderOff();

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
}


























fn_verPass(){
  this.ver_pass=!this.ver_pass;
}

fn_changeContrasena(){
  setTimeout(()=>{
    if(!this.bSaveEdit){
      this.formUsuario.get('usu_contrasena')!.setValidators([]); // or clearValidators()
      this.formUsuario.get('usu_contrasena')!.updateValueAndValidity();    
    }else{
      this.formUsuario.get('usu_contrasena')!.setValidators([Validators.required]); // or clearValidators()
      this.formUsuario.get('usu_contrasena')!.updateValueAndValidity();
    }
  })

}
 
  ngOnInit() {
    this.fn_getUsuarios();
  }

  validateAllFormFields(formGroup: FormGroup){
    this.ServicesProvider.validateAllFormFields(formGroup);
  }

  fn_callModalUsuario(saveEdit:boolean){
    this.bSaveEdit=saveEdit;
    this.fn_resetFormUsuario();
    this.modalUsuario.show();
    this.fn_changeContrasena();
  }

  fn_submitFormUsuario(formGroup: FormGroup) {
    if (formGroup.valid) {
  

        if(this.bSaveEdit){
          
          this.fn_addUsuario();
        }
        else{
          this.fn_editUsuario();
        }
      


  
    } else {
      this.validateAllFormFields(formGroup); 
    }
  }

  fn_resetFormUsuario(){
    this.formUsuario.reset();
    this.fn_resetFormData();
  }

  //OBTENER Usuarios
  fn_getUsuarios(){
  
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.get(SERVICES.GETUSUARIOS,{"Administrador":this.oCheckFilter.Administrador,"Consulta":this.oCheckFilter.Consulta,limit:this.registros,page:this.iIndexBolas}).then(data=>{
      let totalitems=data.total_items;
      let paginas=Math.ceil(totalitems/this.registros);
      paginas=paginas>=5?5:paginas;
      let bolas:any=[];
      for(var i=1; i<=paginas;i++ ){
        bolas.push(i);
      }
      this.aPaginacion={
        "total":totalitems,
        "paginasTotales":Math.ceil(totalitems/this.registros),
        "paginas":paginas,
        "bolas": bolas
      };
    this.aUsuario=data.usuarios;
      console.log(this.aUsuario);

  
      this.ServicesProvider.preloaderOff();
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
  }

  fn_resetFormData(){
    delete this.oUsuario.usu_nombres;
    delete this.oUsuario.usu_apellidos;
    delete this.oUsuario.usu_correo;
    delete this.oUsuario.usu_contrasena;
    delete this.oUsuario.usu_telefono;
    delete this.oUsuario.usu_rol;
    delete this.oUsuario.accion;  
  }

  fn_setFormData(){
    this.oUsuario.usu_nombres=this.formUsuario.controls["usu_nombres"].value;
    this.oUsuario.usu_apellidos=this.formUsuario.controls["usu_apellidos"].value;
    this.oUsuario.usu_correo=this.formUsuario.controls["usu_correo"].value;
    this.oUsuario.usu_contrasena=this.formUsuario.controls["usu_contrasena"].value;
    this.oUsuario.usu_telefono=this.formUsuario.controls["usu_telefono"].value;
    this.oUsuario.usu_rol=this.formUsuario.controls["usu_rol"].value;
    this.fn_changeContrasena();
  }
  //funcion para registrar un usuario
  fn_addUsuario(){ 
    this.fn_resetFormData();
    this.fn_setFormData();
    this.ServicesProvider.preloaderOn();
    //this.fn_acciones_seccion('add');
    this.ServicesProvider.post(SERVICES.ADDUSUARIO,this.oUsuario,true,localStorage.getItem("token")).then(data=>{
      console.log(data);
      if(data.message.toLowerCase()=="¡registro exitoso!".toLowerCase()){
        this.modalUsuario.hide();
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.insertar);
        console.log(MESSAGES);
        this.fn_getUsuarios();
      } 
      else{
        this.ServicesProvider.fn_generarAlerta("error", data.message);
        this.modalUsuario.hide();
        this.ServicesProvider.preloaderOff();  
        this.fn_getUsuarios();
      }
      //this.aDetalleAvance.unshift();
      //this.router.navigate(["home"]);
  
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
    
  }
//EDITAR PROCESO

  fn_setDataUsuarioEdit(item:any){
    this.oUsuarioOriginal=item;
    console.log(this.oUsuarioOriginal)
    this.fn_resetFormUsuario();

    this.formUsuario.controls["usu_nombres"].setValue(item.usu_nombres);
    this.formUsuario.controls["usu_apellidos"].setValue(item.usu_apellidos);
    this.formUsuario.controls["usu_correo"].setValue(item.usu_correo);
    this.formUsuario.controls["usu_contrasena"].setValue(item.usu_contrasena);
    this.formUsuario.controls["usu_telefono"].setValue(item.usu_telefono);
    this.formUsuario.controls["usu_rol"].setValue(item.usu_rol);
  }





//ELIMINAR USUARIO

fn_AdvertenciaElimUsuario(id:any){
  this.ServicesProvider.generarPopupGenerico("Advertencia", "¿Desea eliminarlo?","fn_deleteUsuario",this,id);
}

fn_deleteUsuario(id:any){
  this.ServicesProvider.preloaderOn();

  this.ServicesProvider.post(SERVICES.DELETE_USUARIO+"/"+id, {},true,localStorage.getItem("token")).then(data=>{
      
    if(data.message.toLocaleLowerCase()=="registro afectado"){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.eliminar);
      this.fn_getUsuarios();
    }
    else if(data.message.toLocaleLowerCase()=="registro pendiente"){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      this.fn_getUsuarios();

    }
    else{
      this.ServicesProvider.fn_generarAlerta("Error", data.message);
    }
    this.ServicesProvider.preloaderOff();

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema eliminando el evento, por favor intentalo de nuevo",null);
    });
}

fn_setBolas(index:any){
  this.iIndexBolas=index;
  let auxBolas:any=[];
  let contadorMax5=0;
    if(this.aPaginacion.paginasTotales-this.iIndexBolas<=3){
     auxBolas[0]=this.aPaginacion.paginasTotales-4;
     auxBolas[1]=this.aPaginacion.paginasTotales-3;
     auxBolas[2]=this.aPaginacion.paginasTotales-2;
     auxBolas[3]=this.aPaginacion.paginasTotales-1;
     auxBolas[4]=this.aPaginacion.paginasTotales;

   }
   else{
    for(var i:any=this.iIndexBolas; i<= this.aPaginacion.paginasTotales; i++){
      contadorMax5++;

      if(contadorMax5<=5){
        auxBolas.push(i);
      }

    }
   }





  this.aPaginacion.bolas=auxBolas;

  this.fn_getUsuarios()
}


}

