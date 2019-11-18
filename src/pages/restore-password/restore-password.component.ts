import { OnInit ,Component} from '@angular/core'; 
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
import  {SERVICES } from '../../config/webservices';
import { Router } from '@angular/router';
import  {MESSAGES } from '../../config/messages';
@Component({
    selector: 'restore-password',
    templateUrl: './restore-password.component.html',
    styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
    formRestaurar: FormGroup;
    ver_pass:boolean=false;
    
    oRestorePass:any={};
    constructor(  public fb: FormBuilder,
                  private router : Router,
                  public ServicesProvider:ServicesProvider/*,
                  //private router : Router*/
                  ){

        this.formRestaurar = fb.group({
            contrasena:  new FormControl(null, [Validators.required,
                this.matchOtherValidator('confirmar_contrasena')]),
            confirmar_contrasena:new FormControl(null, [Validators.required])
        });
    }
    ngOnInit() {
        
    }


    matchOtherValidator(otherControlName: string) {
        console.log("validar pass")
        let thisControl: FormControl;
        let otherControl: FormControl;
    
        return function matchOtherValidate (control: FormControl) {
    
          if (!control.parent) {
            return null;
          }
    
          // Initializing the validator.
          if (!thisControl) {
            thisControl = control;
            otherControl = control.parent.get(otherControlName) as FormControl;
            if (!otherControl) {
              throw new Error('matchOtherValidator(): other control is not found in parent group');
            }
            otherControl.valueChanges.subscribe(() => {
              thisControl.updateValueAndValidity();
            });
          }
    
          if (!otherControl) {
            return null;
          }
    
          if (otherControl.value !== thisControl.value) {
            return {
              matchOther: true
            };
          }
          return null;
        }
    }

    validateAllFormFields(formGroup: FormGroup){
        this.ServicesProvider.validateAllFormFields(formGroup);
    }

    fn_submitForm(formGroup: FormGroup) {
        if (formGroup.valid) { 
        } else {
          this.validateAllFormFields(formGroup); 
        }
    }

    fn_verPass(){
        this.ver_pass=!this.ver_pass;
    }

    fn_verificarToken(){

      //var url = "http://localhost:3000/operador/social/2017-0169"; 
      var url = location.href;
      var urll= url.split('/');
      var folio = urll[urll.length-1];
      console.log(folio);
    }

    fn_setFormData(){
      this.oRestorePass.usu_contrasena=this.formRestaurar.controls["contrasena"].value;
     }

  fn_submitFormNewPass(formGroup: FormGroup) {
   this.fn_setFormData();
    if (formGroup.valid) {
      let url = location.href;
      var urll= url.split('/');
      let folio = urll[urll.length-1];
      let oNewPass=folio;
      console.log(oNewPass);
      this.ServicesProvider.preloaderOn();
      this.ServicesProvider.get(SERVICES.NEWPASS+oNewPass,{}).then(data=>{
       
        console.log(data.message);
        if(data.message=="Token Valido Para el usuario"){
          this.fn_restorePass();
          this.router.navigate([""]);
          this.ServicesProvider.preloaderOff();
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
fn_restorePass(){ 
  let url = location.href;
  var urll= url.split('/');
  let folio = urll[urll.length-1];
  let oNewPass=folio;
  console.log(oNewPass);
  this.fn_setFormData();
  this.ServicesProvider.preloaderOn();
  this.ServicesProvider.post(SERVICES.RESETPASS+oNewPass,this.oRestorePass,false,{}).then(data=>{
    console.log(data);
    if(data.message.toLowerCase()=="Contraseña Cambiada".toLowerCase()){
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.fn_generarAlerta("Éxito", "Contraseña cambiada con exito");
      console.log(MESSAGES);

     
    } 
    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
  
}






}


/*
//variables para esconder login y stepper
esconderLogin:boolean=false;
esconderRecuperar:boolean=true;
estado:boolean=true;
*/

