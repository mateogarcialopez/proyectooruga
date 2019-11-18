import { OnInit ,Component} from '@angular/core'; //, Input, Output, EventEmitter  
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
import { Router } from '@angular/router';
import  {SERVICES } from '../../config/webservices';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  variable:any="hola";
  ver_pass:boolean=false;
  formLogin: FormGroup;


  elegantForm: FormGroup;
  formRestorePass: FormGroup;
  secondFormGroup: FormGroup;
  formRegistro: FormGroup;


/*
  //variables para esconder login y stepper
  esconderLogin:boolean=false;
  esconderRecuperar:boolean=true;
  estado:boolean=true;
*/
  constructor(
    public fb: FormBuilder,  
    private ServicesProvider: ServicesProvider,
    private router : Router,

) {
  this.elegantForm = fb.group({
    elegantFormEmailEx: ['', [Validators.required, Validators.email]],
    elegantFormPasswordEx: ['', Validators.required],
  });

  
  this.formRegistro = fb.group({
    nombres: ['', [Validators.required,Validators.minLength(5)]],
    apellidos: ['', Validators.required],
    correo_registro:['', [Validators.required]],
    contrasena:['', [Validators.required,Validators.minLength(4),Validators.maxLength(14)]],
    telefono:['', [Validators.required]],
    rol:['', [Validators.required]]
  });

  this.formLogin = fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required])

  })
    
  }
 fn_verPass(){
    this.ver_pass=!this.ver_pass;
  }

  ngOnInit() {
    //stepper 
   /*setTimeout(()=>{
      this.ServicesProvider.fn_generarAlerta("Advertencia", "¿esta seguro?");
    },2000)
    setTimeout(()=>{
      this.ServicesProvider.fn_generarAlerta("error", "¿esta seguro?");
    },3000)
    setTimeout(()=>{
      this.ServicesProvider.fn_generarAlerta("exito", "¿esta seguro?");
    },4000)*/

    this.formRestorePass = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  get email() { return this.formRestorePass.get('email'); }

  validateAllFormFields(formGroup: FormGroup){
    this.ServicesProvider.validateAllFormFields(formGroup);
  }
//funcion para ingresar un usuario
  fn_submitFormLogin(formGroup: FormGroup) {
    if (formGroup.valid) {

      let oLogin={
        "usu_correo":this.formLogin.controls["email"].value,
        "usu_contrasena":this.formLogin.controls["pass"].value
      }
      this.ServicesProvider.preloaderOn();
      this.ServicesProvider.post(SERVICES.LOGIN,oLogin).then((data)=>{
        if(data.message=="Te has logueado correctamente"){
          localStorage.setItem("token",data.token);
          localStorage.setItem("rol",data.rol.toLowerCase());
          localStorage.setItem("id",data.id);
          localStorage.setItem("nombre",data.nombre);
          localStorage.setItem("apellido",data.apellido);
          this.router.navigate(["compra"]);
        }
        else{
          
          this.ServicesProvider.fn_generarAlerta("Error",data.message);
        }
        this.ServicesProvider.preloaderOff();
      })
    } else {
      this.validateAllFormFields(formGroup); 
    }
}
//funcion para registrar un usuario
fn_submitFormRegister(formGroup: FormGroup) {
  
  if (formGroup.valid) {

    let oRegister={
      "usu_nombres" :this.formRegistro.controls["nombres"].value,
      "usu_apellidos" : this.formRegistro.controls["apellidos"].value,
      "usu_correo" :this.formRegistro.controls["correo_registro"].value,
      "usu_contrasena": this.formRegistro.controls["contrasena"].value,
      "usu_telefono": this.formRegistro.controls["telefono"].value,
      "usu_rol": this.formRegistro.controls["rol"].value

  }
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.post(SERVICES.ADDUSUARIO,oRegister).then((data)=>{
      if(data.message=="¡Registro Exitoso!"){
        this.router.navigate(["dashboard"]);
      }
      else{
        this.ServicesProvider.fn_generarAlerta("Error",data.message);
      }
      this.ServicesProvider.preloaderOff();
    })
  } else {
    this.validateAllFormFields(formGroup);  
  }
 
}
//Funcion para recuperar cuenta
fn_submitFormRestorePasss(formGroup: FormGroup) {
  if (formGroup.valid) {

    let oRestorePass={
      "usu_correo":this.formLogin.controls["email"].value
     }
    this.ServicesProvider.preloaderOn();
    
    this.ServicesProvider.post(SERVICES.RESTOREPASS,oRestorePass).then((data)=>{
      if(data.message=="correo enviado  con exito"){
        this.router.navigate(["login"]);
      }
      else{
        
        this.ServicesProvider.fn_generarAlerta("Error",data.message);
      }
      this.ServicesProvider.preloaderOff();
   
    })
  } else {
    this.validateAllFormFields(formGroup); 
  }
  

}

fn_submitFormRestorePass(formGroup: FormGroup) {
  if (formGroup.valid) {

    let oRestorePass={
      "usu_correo":this.formRestorePass.controls["email"].value   
    }
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider.post(SERVICES.RESTOREPASS,oRestorePass).then((data)=>{
      if(data.message=="correo enviado  con exito"){
        
        this.router.navigate(["dashboard"]);
      }
      else{
        
        this.ServicesProvider.fn_generarAlerta("Error",data.message);
      }
      this.ServicesProvider.preloaderOff();
    })
  } else {
    this.validateAllFormFields(formGroup); 
  }
}




  fn_submitForm(formGroup: FormGroup) {
      if (formGroup.valid) { 
        
        this.router.navigate(["dashboard"]);
      } else {
        this.validateAllFormFields(formGroup); 
      }
  }

  onSubmit(){}
/*
  //Metodo para mostrar y esconder login y stepper
  onActivate(){
    if(this.estado){
      this.esconderLogin=true;
      this.esconderRecuperar=false;
      this.estado=false;
    }else{
      this.esconderLogin=false;
      this.esconderRecuperar=true;
      this.estado=true;
    }

  }
*/
onKeydown(event:any,formGroup: FormGroup) {
  if(event){
    if (event.key === "Enter") {
      this.fn_submitFormLogin(formGroup);

    }
  }


}


}

