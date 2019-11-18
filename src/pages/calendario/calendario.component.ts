import { Component, OnInit,ViewChild } from '@angular/core';
import { ServicesProvider } from '../../providers/services';
import  {SERVICES } from '../../config/webservices';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import  {MESSAGES } from '../../config/messages';
import  {VARIABLES } from '../../config/variables';
@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent implements OnInit {
  @ViewChild('modalCalendario') modalCalendario: any;
  oEstado_bolas=VARIABLES.oEstado_bolas;
  aCalendario:any=[];
  seleccionCalendario:any;
  formCalendario: FormGroup;
  bSaveEdit=false;
  oCalendarioOriginal:any;
  formDataCalendario:any = new FormData();
  opciones_fecha:any;
  opciones_fecha_fin:any;
  oCalendarios:any={};
  fechaUnica=true;
  fechaHasta=true;
  fechass=false;
  valorfecha="1";
  fechas:any;
  filtro_fecha:any;
  fechaEspanol:any;
  bPeriodo=false;
  public items_calendario = [];
  public current_temp = { current_year: 0, current_period: 0};
  public calendar_content: any[] = [];
  public filters: any[] = [
    {
      texto: 'Desmarcar todos',
      visible: true
    },
    {
      texto: 'Nuevos Estudiantes',
      visible: true
    },
    {
      texto: 'Estudiantes Antiguos',
      visible: true
    },
    {
      texto: 'Grados',
      visible: true
    },
    {
      texto: 'Fechas especiales',
      visible: true
    },
    {
      texto: 'Examen de Suficiencia en Inglés',
      visible: true
    }
  ];


  oCategoria:any=[
    "Nuevos Estudiantes",
    "Estudiantes Antiguos",
    "Grados",              
    "Fechas especiales",
    "Examen de Suficiencia en Inglés"
  ]
 

 
  constructor(public  ServicesProvider: ServicesProvider, public fb: FormBuilder){
    var date = new Date();
    date.setFullYear( date.getFullYear() + 1 );

  

    this.formCalendario = fb.group({
      cal_year: ['', [Validators.required]],
      cal_numero_periodo: ['', [Validators.required]],
      cal_categoria:['', [Validators.required]], 
      cal_nombre: ['',[Validators.required]],
      cal_fecha_inicio: [''],
      cal_fecha_fin: [''],
      cal_fecha_unica: ['' ],
      cal_fecha_hasta:[''],
      cal_costo:['']

    });
    this.fechas=this.ServicesProvider.getCurrentDates();
    this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.fechas.hoy);
    this.opciones_fecha=this.ServicesProvider.getDatepickerOpt("posterior");
    this.opciones_fecha_fin=this.ServicesProvider.getDatepickerOpt("posterior");

  }
  ngOnInit() {
    this.fn_getCalendario();
    this.fn_mostrarDatePicker();
    console.log(this.formCalendario.controls["cal_fecha_fin"].value)

  }

  fn_indexador(){
    if(this.ServicesProvider.parametrosSeccion){
      this.seleccionCalendario=this.ServicesProvider.parametrosSeccion.id;
      setTimeout(()=>{
        var elmnt:any = document.getElementById(this.seleccionCalendario);
        elmnt.scrollIntoView({ block: 'start',  behavior: 'smooth' });
      })

    }

  }

  fn_seleccionarPeriodo(event:any){
    let fecha: any
    let mes:any
    let año:any
    fecha=event.actualDateFormatted.split("/");
    año=parseInt(fecha[0])
    mes=parseInt(fecha[1])
    if(mes>=6){
      setTimeout(()=>{
        this.formCalendario.controls['cal_numero_periodo'].setValue("2");
        this.formCalendario.controls['cal_year'].setValue(año);
      })
    }else{
      setTimeout(()=>{
        this.formCalendario.controls['cal_numero_periodo'].setValue("1");
        this.formCalendario.controls['cal_year'].setValue(año);
      })

    }
  }

  /* Método para detectar el año y periodo actual */
  public getCurrentPeriod() {
    let current_date = new Date();
    this.current_temp.current_year = current_date.getFullYear();
    this.current_temp.current_period = (current_date.getMonth() <= 6) ? 1 : 2;      
  }

  public getCalendarioContent(){
    this.getCurrentPeriod()
    //Init events
    let current_year_content:any = this.items_calendario[0];
    let next_year_content:any = this.items_calendario[0];
    this.items_calendario.forEach((element:any) => {
      if(element.year == this.current_temp.current_year.toString()){
        current_year_content = element;
      }else if(element.year == (this.current_temp.current_year+1).toString()){
        next_year_content = element;
      }
    });

    if(this.current_temp.current_period == 1){
      this.calendar_content[0] = current_year_content.periodos[0];
      this.calendar_content[1] = current_year_content.periodos[1];
      /* this.calendar_content[2] = next_year_content.periodos[0]; */
    }else{
      this.calendar_content[0]= current_year_content.periodos[1];
      this.calendar_content[1] = next_year_content.periodos[0];
      /* this.calendar_content[2] = next_year_content.periodos[1]; */
    }   
  }

  public changeMarcarTodos(filtro_texto:string){
    if(filtro_texto === 'Desmarcar todos' || filtro_texto === 'Marcar todos'){
      //check todos filter
      if(this.filters[0].visible){
        this.filters[0].texto = 'Desmarcar todos';
        this.filters.forEach(filtro => {
          filtro.visible = true;
        });
      }else{
        this.filters[0].texto = 'Marcar todos';
        this.filters.forEach(filtro => {
          filtro.visible = false;
        });
      }
    }
  }

  public parseStringAsDate(date:string){
    return new Date(date);
  }
  public checkVisibility(categoria:any){
    let isVisible = false;
    this.filters.forEach(filtro => {
      if(categoria.nombre == filtro.texto){
        isVisible = filtro.visible
      }   
    });    
    return isVisible;
  }
  public parseBackResponse(calendario:any){
    
    let date = new Date();

    let json:any=[
      {
        "year":date.getFullYear(),
        "periodos": [
          {
            "numero_periodo": 1,
            "categorias": []
          },
          {
            "numero_periodo": 2,
            "categorias": []
          },
        ]
      },
      {
        "year": date.getFullYear()+1,
        "periodos": [
          {
            "numero_periodo": 1,
            "categorias": []
          },
          {
            "numero_periodo": 2,
            "categorias": []
          },
        ]
      }
    ]

   for(var i in calendario){
      if(calendario[i].cal_year.toString()==json[0].year){
          if(calendario[i].cal_numero_periodo==1){
            let isAlready = false;
            json[0].periodos[0].categorias.forEach((categoria:any) => {
              if(categoria.nombre == calendario[i].cal_categoria){
                isAlready = true;
              }
            });

            if(!isAlready){
              json[0].periodos[0].categorias.push({
                nombre: calendario[i].cal_categoria,
                conceptos: []
              });
            }

            json[0].periodos[0].categorias.forEach((categoria:any) => {
              if(categoria.nombre == calendario[i].cal_categoria){
                if(calendario[i].cal_fecha_hasta){
                  categoria.conceptos.push({
                    fecha_hasta:calendario[i].cal_fecha_hasta,
                    año: calendario[i].cal_year,
                    periodo:calendario[i].cal_numero_periodo,
                    categoria:calendario[i].cal_categoria,
                    nombre:calendario[i].cal_nombre,
                    costo:calendario[i].cal_costo,                  
                    _id:calendario[i]._id,
                    cal_admin_generacion:calendario[i].cal_admin_generacion,
                    cal_ultima_actualizacion:calendario[i].cal_ultima_actualizacion,
                    cal_admin_comentario:calendario[i].cal_admin_comentario,
                    cal_estado:calendario[i].cal_estado

                  })
                }else if(calendario[i].cal_fecha_unica){
                  categoria.conceptos.push({
                    nombre:calendario[i].cal_nombre,
                    fecha_unica: calendario[i].cal_fecha_unica,
                    _id:calendario[i]._id,
                    año:calendario[i].cal_year,
                    periodo:calendario[i].cal_numero_periodo,
                    categoria:calendario[i].cal_categoria,
                    costo:calendario[i].cal_costo,
                    cal_admin_generacion:calendario[i].cal_admin_generacion,
                    cal_ultima_actualizacion:calendario[i].cal_ultima_actualizacion,
                    cal_admin_comentario:calendario[i].cal_admin_comentario,
                    cal_estado:calendario[i].cal_estado            
                  })
                }else if(calendario[i].cal_fecha_inicio){
                  categoria.conceptos.push({
                    nombre: calendario[i].cal_nombre,
                    fecha_inicio:calendario[i].cal_fecha_inicio,
                    fecha_fin:calendario[i].cal_fecha_fin,
                    _id:calendario[i]._id,
                    año: calendario[i].cal_year,
                    periodo:calendario[i].cal_numero_periodo,
                    categoria:calendario[i].cal_categoria,
                    costo:calendario[i].cal_costo,
                    cal_admin_generacion:calendario[i].cal_admin_generacion,
                    cal_ultima_actualizacion:calendario[i].cal_ultima_actualizacion,
                    cal_admin_comentario:calendario[i].cal_admin_comentario,
                    cal_estado:calendario[i].cal_estado                                    
                  })
                }
              }
            });

          }else{
            let isAlready = false;
            json[0].periodos[1].categorias.forEach((categoria:any) => {
              if(categoria.nombre == calendario[i].cal_categoria){
                isAlready = true;
              }
            });

            if(!isAlready){
              json[0].periodos[1].categorias.push({
                nombre: calendario[i].cal_categoria,
                conceptos: []
              });
            }

            json[0].periodos[1].categorias.forEach((categoria:any) => {
              if(categoria.nombre == calendario[i].cal_categoria){
                if(calendario[i].cal_fecha_hasta){
                  categoria.conceptos.push({
                    nombre: calendario[i].cal_nombre,
                    fecha_hasta: calendario[i].cal_fecha_hasta,
                    _id:calendario[i]._id,
                    año: calendario[i].cal_year,
                    periodo: calendario[i].cal_numero_periodo,
                    categoria:calendario[i].cal_categoria,
                    costo:calendario[i].cal_costo,
                    cal_admin_generacion:calendario[i].cal_admin_generacion,
                    cal_ultima_actualizacion:calendario[i].cal_ultima_actualizacion,
                    cal_admin_comentario:calendario[i].cal_admin_comentario,
                    cal_estado:calendario[i].cal_estado 
                  })
                }else if(calendario[i].cal_fecha_unica){
                  categoria.conceptos.push({
                    nombre: calendario[i].cal_nombre,
                    fecha_unica: calendario[i].cal_fecha_unica,
                    _id:calendario[i]._id,
                    año: calendario[i].cal_year,
                    periodo: calendario[i].cal_numero_periodo,
                    categoria:calendario[i].cal_categoria,
                    costo:calendario[i].cal_costo,
                    cal_admin_generacion:calendario[i].cal_admin_generacion,
                    cal_ultima_actualizacion:calendario[i].cal_ultima_actualizacion,
                    cal_admin_comentario:calendario[i].cal_admin_comentario,
                    cal_estado:calendario[i].cal_estado  
                  })
                }else if(calendario[i].cal_fecha_inicio){
                  categoria.conceptos.push({
                    nombre: calendario[i].cal_nombre,
                    fecha_inicio: calendario[i].cal_fecha_inicio,
                    fecha_fin: calendario[i].cal_fecha_fin,
                    _id:calendario[i]._id,
                    año: calendario[i].cal_year,
                    periodo: calendario[i].cal_numero_periodo,
                    categoria:calendario[i].cal_categoria,
                    costo:calendario[i].cal_costo,
                    cal_admin_generacion:calendario[i].cal_admin_generacion,
                    cal_ultima_actualizacion:calendario[i].cal_ultima_actualizacion,
                    cal_admin_comentario:calendario[i].cal_admin_comentario,
                    cal_estado:calendario[i].cal_estado
                  })
                }
              }
            });

          }
      }
      else{
        if(calendario[i].cal_numero_periodo==1){
          let isAlready = false;
          json[1].periodos[0].categorias.forEach((categoria:any) => {
            if(categoria.nombre == calendario[i].cal_categoria){
              isAlready = true;
            }
          });

          if(!isAlready){
            json[1].periodos[0].categorias.push({
              nombre: calendario[i].cal_categoria,
              conceptos: []
            });
          }

          json[1].periodos[0].categorias.forEach((categoria:any) => {
            if(categoria.nombre == calendario[i].cal_categoria){
              if(calendario[i].cal_fecha_hasta){
                categoria.conceptos.push({
                  nombre: calendario[i].cal_nombre,
                  fecha_hasta: calendario[i].cal_fecha_hasta,
                  _id:calendario[i]._id,
                  año: calendario[i].cal_year,
                  periodo: calendario[i].cal_numero_periodo,
                  categoria:calendario[i].cal_categoria,
                  costo:calendario[i].cal_costo,
                  cal_admin_generacion:calendario[i].cal_admin_generacion,
                  cal_ultima_actualizacion:calendario[i].cal_ultima_actualizacion,
                  cal_admin_comentario:calendario[i].cal_admin_comentario,
                  cal_estado:calendario[i].cal_estado  
                })
              }else if(calendario[i].cal_fecha_unica){
                categoria.conceptos.push({
                  nombre: calendario[i].cal_nombre,
                  fecha_unica: calendario[i].cal_fecha_unica,
                  _id:calendario[i]._id,
                  año: calendario[i].cal_year,
                  periodo: calendario[i].cal_numero_periodo,
                  categoria:calendario[i].cal_categoria,
                  costo:calendario[i].cal_costo,
                  cal_admin_generacion:calendario[i].cal_admin_generacion,
                  cal_ultima_actualizacion:calendario[i].cal_ultima_actualizacion,
                  cal_admin_comentario:calendario[i].cal_admin_comentario,
                  cal_estado:calendario[i].cal_estado 
                })
              }else if(calendario[i].cal_fecha_inicio){
                categoria.conceptos.push({
                  nombre: calendario[i].cal_nombre,
                  fecha_inicio: calendario[i].cal_fecha_inicio,
                  fecha_fin: calendario[i].cal_fecha_inicio,
                  _id:calendario[i]._id,
                  año: calendario[i].cal_year,
                  periodo: calendario[i].cal_numero_periodo,
                  categoria:calendario[i].cal_categoria,
                  costo:calendario[i].cal_costo,
                  cal_admin_generacion:calendario[i].cal_admin_generacion,
                  cal_ultima_actualizacion:calendario[i].cal_ultima_actualizacion,
                  cal_admin_comentario:calendario[i].cal_admin_comentario,
                  cal_estado:calendario[i].cal_estado 
                })
              }
            }
          });

        }else{
          let isAlready = false;
          json[1].periodos[1].categorias.forEach((categoria:any) => {
            if(categoria.nombre == calendario[i].cal_categoria){
              isAlready = true;
            }
          });

          if(!isAlready){
            json[1].periodos[1].categorias.push({
              nombre: calendario[i].cal_categoria,
              conceptos: []
            });
          }

          json[1].periodos[1].categorias.forEach((categoria:any) => {
            if(categoria.nombre == calendario[i].cal_categoria){
              if(calendario[i].cal_fecha_hasta){
                categoria.conceptos.push({
                  nombre: calendario[i].cal_nombre,
                  fecha_hasta: calendario[i].cal_fecha_hasta,
                  _id:calendario[i]._id,
                  año: calendario[i].cal_year,
                  periodo:calendario[i].cal_numero_periodo,
                  categoria:calendario[i].cal_categoria,
                  costo:calendario[i].cal_costo,
                  cal_admin_generacion:calendario[i].cal_admin_generacion,
                  cal_ultima_actualizacion:calendario[i].cal_ultima_actualizacion,
                  cal_admin_comentario:calendario[i].cal_admin_comentario,
                  cal_estado:calendario[i].cal_estado
                })
              }else if(calendario[i].cal_fecha_unica){
                categoria.conceptos.push({
                  nombre: calendario[i].cal_nombre,
                  fecha_unica:calendario[i].cal_fecha_unica,
                  _id:calendario[i]._id,
                  año: calendario[i].cal_year,
                  periodo:calendario[i].cal_numero_periodo,              
                  categoria:calendario[i].cal_categoria,
                  costo:calendario[i].cal_costo,
                  cal_admin_generacion:calendario[i].cal_admin_generacion,
                  cal_ultima_actualizacion:calendario[i].cal_ultima_actualizacion,
                  cal_admin_comentario:calendario[i].cal_admin_comentario,
                  cal_estado:calendario[i].cal_estado 
                })
              }else if(calendario[i].cal_fecha_inicio){
                categoria.conceptos.push({
                  nombre: calendario[i].cal_nombre,
                  fecha_inicio:calendario[i].cal_fecha_inicio,
                  fecha_fin:calendario[i].cal_fecha_fin,
                  _id:calendario[i]._id,
                  año: calendario[i].cal_year,
                  periodo:calendario[i].cal_numero_periodo,
                  categoria:calendario[i].cal_categoria,
                  costo:calendario[i].cal_costo,
                  cal_admin_generacion:calendario[i].cal_admin_generacion,
                  cal_ultima_actualizacion:calendario[i].cal_ultima_actualizacion,
                  cal_admin_comentario:calendario[i].cal_admin_comentario,
                  cal_estado:calendario[i].cal_estado
                })
              }
            }
          });

        }
      }
    }
    /*if(json.length==2){
      if(json[0].periodos.length==2){
        json[0].periodos.splice(0,1);
      }
    }*/
    this.items_calendario = json.slice(0);


    this.fn_indexador();

    this.getCalendarioContent();

  }
  //OBTENER CALENDARIO
fn_getCalendario(){
  //this.fechaEspanol=this.ServicesProvider.fn_fechaEspanol(this.filtro_fecha);

  this.ServicesProvider.preloaderOn();
  //se transforma fecha a yyyy-mm-dd
  //let fecha=this.fechas.hoy.split("/")
  this.ServicesProvider.get(SERVICES.GETCALENDARIO,{}).then(data=>{
  this.parseBackResponse(data.calendarios);
    this.ServicesProvider.preloaderOff();
    this.ServicesProvider.preloaderOff();
    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
}


fn_mostrarDatePicker(){
  this.formCalendario.controls["cal_fecha_inicio"].setValue("");
  this.formCalendario.controls["cal_fecha_fin"].setValue("");
  this.formCalendario.controls["cal_fecha_unica"].setValue("");
  this.formCalendario.controls["cal_fecha_hasta"].setValue("");
  if(this.valorfecha=="1"){
    this.fechass=false;
    this.fechaHasta=true;
    this.fechaUnica=true;
  }else if(this.valorfecha=="2"){
    this.fechass=true;
    this.fechaHasta=true;
    this.fechaUnica=false;
  }else if(this.valorfecha=="3"){
    this.fechass=true;
    this.fechaHasta=false;
    this.fechaUnica=true;
  }
}

//MODAL

fn_callModalCalendario(saveEdit:boolean){

  this.bSaveEdit=saveEdit;
  this.fn_resetFormCalendario();
  if(this.bSaveEdit){

    setTimeout(() => {
      this.formCalendario.controls['cal_year'].setValue(this.ServicesProvider.getCurrentYear_mas1()[0]);
    });
    setTimeout(() => {
      this.formCalendario.controls['cal_numero_periodo'].setValue("1");
    });
        
    setTimeout(() => {
      this.valorfecha="1";
    });


  }
    this.modalCalendario.show();
  
}
fn_resetFormCalendario(){
  
  this.formCalendario.reset();
  this.fn_resetFormData();

}

fn_resetFormData(){

  delete this.oCalendarios.cal_year;
  delete this.oCalendarios.cal_numero_periodo;
  delete this.oCalendarios.cal_categoria;
  delete this.oCalendarios.cal_nombre;
  delete this.oCalendarios.cal_fecha_inicio;
  delete this.oCalendarios.cal_fecha_fin;
  delete this.oCalendarios.cal_fecha_unica;
  delete this.oCalendarios.cal_fecha_hasta;
  delete this.oCalendarios.cal_costo;
}



fn_acciones_seccion(accion:any){

  this.oCalendarios.categoria="calendario";
  this.oCalendarios.accion=accion;
}

fn_submitFormCalendario(formGroup: FormGroup) {
  if (formGroup.valid) {

        if(this.bSaveEdit){
 
        this.fn_addCalendario();

      }
      else{
    
        this.fn_editCalendario();
      }
      
  } else {
    this.validateAllFormFields(formGroup); 
  }
}


fn_mostrarCalPickEdit(){
  if(this.oCalendarioOriginal.fecha_inicio && this.oCalendarioOriginal.fecha_fin){
    this.valorfecha="1"
    this.fn_mostrarDatePicker();
  }else if(this.oCalendarioOriginal.fecha_unica){
    this.valorfecha="2"
    this.fn_mostrarDatePicker();
  }else if(this.oCalendarioOriginal.fecha_hasta){
    this.valorfecha="3"
    this.fn_mostrarDatePicker();
  }
}
//EDIT
fn_setDataCalendarioEdit(item:any){
  this.oCalendarioOriginal=item;
  this.fn_mostrarCalPickEdit();
  this.fn_resetFormCalendario();
  for (let i in  this.ServicesProvider.getCurrentYear_mas1()) {
    if(this.ServicesProvider.getCurrentYear_mas1()[i]==item.año){
      this.formCalendario.controls["cal_year"].setValue(this.ServicesProvider.getCurrentYear_mas1()[i]);
    }
  }
  for (let i in  this.oCategoria) {
    if(this.oCategoria[i]==item.categoria){
      this.formCalendario.controls["cal_categoria"].setValue(this.oCategoria[i]);
    }
  }

 
  this.formCalendario.controls["cal_year"].setValue(item.año);
  this.formCalendario.controls["cal_numero_periodo"].setValue(item.periodo.toString());
  this.formCalendario.controls["cal_nombre"].setValue(item.nombre);
    
  if(this.valorfecha=="1"){
    this.formCalendario.controls["cal_fecha_inicio"].setValue(item.fecha_inicio);
    this.formCalendario.controls["cal_fecha_fin"].setValue(item.fecha_fin);
    this.formCalendario.controls["cal_fecha_unica"].setValue("");
    this.formCalendario.controls["cal_fecha_hasta"].setValue("");
  }
  if(this.valorfecha=="2"){
    this.formCalendario.controls["cal_fecha_inicio"].setValue("");
    this.formCalendario.controls["cal_fecha_fin"].setValue("");
    this.formCalendario.controls["cal_fecha_unica"].setValue(item.fecha_unica);
    this.formCalendario.controls["cal_fecha_hasta"].setValue("");
  }  
  if(this.valorfecha=="3"){
    this.formCalendario.controls["cal_fecha_inicio"].setValue("");
    this.formCalendario.controls["cal_fecha_fin"].setValue("");
    this.formCalendario.controls["cal_fecha_unica"].setValue("");
    this.formCalendario.controls["cal_fecha_hasta"].setValue(item.fecha_hasta);
  }
  this.formCalendario.controls["cal_costo"].setValue(item.costo);
}

fn_editCalendario(){
  this.fn_resetFormData();
  let keys:any=Object.keys(this.formCalendario.controls);
  for(var i in keys){
    if(this.formCalendario.controls[keys[i]].value!=this.oCalendarioOriginal[keys[i]]){
          this.oCalendarios[keys[i]]=this.formCalendario.controls[keys[i]].value;
    }
  }
  this.fn_acciones_seccion('update');
  this.ServicesProvider.preloaderOn();
  this.ServicesProvider.post(SERVICES.GETCALENDARIO+"/"+this.oCalendarioOriginal._id,this.oCalendarios,true,localStorage.getItem("token")).then(data=>{
      if(data.message.toLowerCase()=="registro afectado"){
        this.modalCalendario.hide();
        this.fn_getCalendario();
        this.valorfecha="1";
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.actualizar);
      }
      
      else if(data.message.toLowerCase()=="registro pendiente"){
        this.modalCalendario.hide();
        this.fn_getCalendario();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      }
      else{
        this.modalCalendario.hide();
        this.ServicesProvider.fn_generarAlerta("Error", data.message);
      }
      //this.router.navigate(["home"]);
    this.ServicesProvider.preloaderOff();

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
    });
}


 validateAllFormFields(formGroup: FormGroup){
  this.ServicesProvider.validateAllFormFields(formGroup);
}
//ADD
  fn_setFormData(){
    this.oCalendarios.cal_year=this.formCalendario.controls["cal_year"].value;
    this.oCalendarios.cal_numero_periodo=this.formCalendario.controls["cal_numero_periodo"].value;
    this.oCalendarios.cal_categoria=this.formCalendario.controls["cal_categoria"].value;
    this.oCalendarios.cal_nombre=this.formCalendario.controls["cal_nombre"].value;
    this.oCalendarios.cal_fecha_inicio=this.formCalendario.controls["cal_fecha_inicio"].value;
    this.oCalendarios.cal_fecha_fin=this.formCalendario.controls["cal_fecha_fin"].value;
    this.oCalendarios.cal_fecha_unica=this.formCalendario.controls["cal_fecha_unica"].value;
    this.oCalendarios.cal_fecha_hasta=this.formCalendario.controls["cal_fecha_hasta"].value;
    this.oCalendarios.cal_costo=this.formCalendario.controls["cal_costo"].value;

  }
  fn_addCalendario(){ 
    this.fn_resetFormData();
    this.fn_setFormData();
    this.ServicesProvider.preloaderOn();
    this.fn_acciones_seccion('add');
    this.ServicesProvider.post(SERVICES.ADDCALENDARIO,this.oCalendarios,true,localStorage.getItem("token")).then(data=>{
      if(data.message.toLowerCase()=="registro afectado".toLowerCase()){
        this.modalCalendario.hide();
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.insertar);
        this.valorfecha="1";
        this.fn_getCalendario();
      } 
      else if(data.message.toLocaleLowerCase()=="registro pendiente".toLocaleLowerCase()){
        this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
        this.modalCalendario.hide();
        this.ServicesProvider.preloaderOff();
      }
      else{
        this.ServicesProvider.fn_generarAlerta("error", data.message);
        this.modalCalendario.hide();
        this.ServicesProvider.preloaderOff();  
      }
      //this.aDetalleAvance.unshift();
      //this.router.navigate(["home"]);
  
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo",null);
      });
  }     
  
    //Borrar Fecha
fn_AdvertenciaElimCalendario(id:any){
  this.ServicesProvider.generarPopupGenerico("Advertencia", "¿Desea eliminarlo?","fn_deleteCalendario",this,id);
}

fn_deleteCalendario(id:any){
  this.fn_acciones_seccion('delete');
  this.ServicesProvider.preloaderOn();
  let oSendDeleteCalendario={
    "categoria":"calendario",
    "accion":"delete"
  }
  this.ServicesProvider.post(SERVICES.DELETE_CALENDARIO+"/"+id, oSendDeleteCalendario,true,localStorage.getItem("token")).then(data=>{
      
    if(data.message.toLocaleLowerCase()=="registro afectado"){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.eliminar);
      this.fn_getCalendario();
    }
    else if(data.message.toLocaleLowerCase()=="registro pendiente"){
      this.ServicesProvider.fn_generarAlerta("Éxito", MESSAGES.pendiente);
      this.fn_getCalendario();

    }
    else{
      this.ServicesProvider.fn_generarAlerta("Error", data.message);
    }
    this.ServicesProvider.preloaderOff();

    }, _fail => {
      this.ServicesProvider.preloaderOff();
      this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema eliminanar esta fecha, por favor intentalo de nuevo",null);
    });
}


}