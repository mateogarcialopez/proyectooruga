export const VARIABLES:any = {
    datepicker: {
    // Strings and translations
    dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'},
    dayLabelsFull: {su: "Domingo", mo: "Lunes", tu: "Martes", we: "Miércoles", th: "Jueves", fr: "Viernes", sa:
    "Sabado"},
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10:
    'Oct', 11: 'Nov', 12: 'Dic' },
    monthLabelsFull: { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8:
    "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" },
    // Buttons
    todayBtnTxt: "Hoy",
    clearBtnTxt: "Borrar",
    closeBtnTxt: "Cerrar",
    // Format
    dateFormat: 'yyyy/mm/dd',
    // First day of the week
    firstDayOfWeek: 'Lun',
    // // Disable dates
    /*disableUntil: {year: 2018, month: 10, day: 1},
    disableSince: {year: 2018, month: 10, day: 31},/*
    disableDays: [{year: 2018, month: 10, day: 3}],*/
    //disableDateRanges: [{begin: {year: 2018, month: 10, day: 5}, end: {year: 2018, month: 10, day: 7}}],
    disableWeekends: false,
    // Enable dates (when disabled)
    // Year limits
    minYear: 2017,
    maxYear: 9999,
    // Show Today button
    showTodayBtn: true,
    // Show Clear date button
    showClearDateBtn: true,
    markCurrentDay: true,
    //markDates: [{dates: [{year: 2018, month: 10, day: 20}], color: '#303030'}],
    markWeekends: undefined,
    disableHeaderButtons: false,
    showWeekNumbers: false,
    height: '100px',
    width: '90%',
    top:"0px",
    selectionTxtFontSize: '15px'
    },
    oEstado_bolas:
    {
        "rechazado":{
          "color": "background_bola_roja",
          "texto": "Rechazado"
        },
        "pendiente":{
          "color": "background_bola_amarilla",
          "texto": "Pendiente"
        },
        "verificado":{
          "color": "background_bola_verde",
          "texto": "Verificado"
        }               
    },
    oEstadoPrioridad:{
        "alta": "bola_roja",
        "media": "bola_amarilla",
        "baja": "bola_gris"
    },
    oFacultad:{
      "Ciencias de la Salud":{
        "icon": "fas fa-medkit",
        "background": "bg_ciencias_salud",
        "checkbox":"check_ciencias_salud",
        "color":"color_ciencias_salud",
        
      },
      "Ciencias Jurídicas":{
        "icon": "fas fa-gavel",
        "background": "bg_ciencias_juridicas",
        "checkbox":"check_ciencias_juridicas",
        "color":"color_ciencias_juridicas"
      },
      "Ciencias Sociales y Humanas":{
        "icon": "fas fa-child",
        "background": "bg_ciencias_sociales",
        "checkbox":"check_ciencias_sociales",
        "color":"color_ciencias_sociales"
      },
      "Ciencias Contables, Económicas y Administrativas":{
        "icon": "fas fa-search-dollar",
        "background": "bg_ciencias_contables",
        "checkbox":"check_ciencias_contables",
        "color":"color_ciencias_contables"
      },        
      "Ciencias e Ingeniería":{
        "icon": "fas fa-laptop",
        "background": "bg_ciencias_ingenieria",
        "checkbox":"check_ciencias_ingenieria",
        "color":"color_ciencias_ingenieria"
      }


    },

    aCategorias:
  [
    {
      "icono": "far fa-user-graduate",
      "nombre": "Cursos",
      "clase_icon": "animated bounceInDown",
      "redirect": "curso",
      "ruta_indexacion":"/curso/",
      "clase_badge":"badge_programa",
      "texto_mostrar":"Cursos"
    },
    {
      "icono": "far fa-bullhorn",
      "nombre": "Foro",
      "clase_icon": "animated bounceInDown",
      "redirect": "foro",
      "ruta_indexacion":"/foro/",
      "clase_badge":"badge_calendario",
      "texto_mostrar":"Foro"
    },
    {
      "icono": "fas fa-comments",
      "nombre": "Mensajes",
      "clase_icon": "animated bounceInDown",
      "redirect": "/chat",
      "ruta_indexacion":"/chat/",
      "clase_badge":"badge_institucion",
      "texto_mostrar":"chat"
    },
    {
      "icono": "fas fa-swatchbook",
      "nombre": "Mis Cursos",
      "clase_icon": "animated bounceInDown",
      "redirect": "/institucion",
      "ruta_indexacion":"/institucion/",
      "clase_badge":"badge_institucion",
      "texto_mostrar":"Institución"
    },
    {
      "icono": "fas fa-user-alt",
      "nombre": "Mi Perfil",
      "clase_icon": "animated bounceInDown",
      "redirect": "/institucions",
      "ruta_indexacion":"/institucions/",
      "clase_badge":"badge_institucion",
      "texto_mostrar":"Institución"
    },
    {
      "icono": "fas fa-piggy-bank",
      "nombre": "Ayudanos a Crecer",
      "clase_icon": "animated bounceInDown",
      "redirect": "/institucionw",
      "ruta_indexacion":"/institucionw/",
      "clase_badge":"badge_institucion",
      "texto_mostrar":"Institución"
    },
    {
      "icono": "fas fa-landmark",
      "nombre": "Sobre Nosotros",
      "clase_icon": "animated bounceInDown",
      "redirect": "/institucion",
      "ruta_indexacion":"/institucion/",
      "clase_badge":"badge_institucion",
      "texto_mostrar":"Institución"
    },

    

  ],
  badgeCategorias:{
    "/programa/":{
      "icono": "far fa-address-card",
      "texto_mostrar":"Programas",
      "clase_badge":"badge_programa"
    },
    "/calendario/":{
      "icono": "far fa-calendar-alt",
      "texto_mostrar":"Calendario",
      "clase_badge":"badge_calendario"
    }, 
    "/beca/":{
      "icono": "far fa-handshake",
      "texto_mostrar":"Becas",
      "clase_badge":"badge_beca"
    }, 
    "/dependencia/":{
      "icono": "fas fa-building",
      "texto_mostrar":"Dependencias",
      "clase_badge":"badge_dependencia"
    }, 
    "/proceso/":{
      "icono": "fas fa-cogs",
      "texto_mostrar":"Procesos",
      "clase_badge":"badge_proceso"
    }, 
    "/curso_diplomado/":{
      "icono": "fas fa-graduation-cap",
      "texto_mostrar":"Diplomados",
      "clase_badge":"badge_diplomado"
    }, 
    "/servicio/":{
      "icono": "fas fa-concierge-bell",
      "texto_mostrar":"Servicios",
      "clase_badge":"badge_servicio"
    },
    "/institucion/":{
      "icono": "fas fa-landmark",
      "texto_mostrar":"Institución",
      "clase_badge":"badge_institucion"
    },
    "/evento/":{
      "icono": "far fa-calendar",
      "texto_mostrar":"Eventos",
      "clase_badge":"badge_evento"
    },
    "/cuenta/":{
      "icono": "far fa-credit-card",
      "texto_mostrar":"Cuenta",
      "clase_badge":"badge_cuentasBanc"
    },
    "/directorio/":{
      "icono": "far fa-address-book",
      "texto_mostrar":"Directorio",
      "clase_badge":"badge_directorio"
    }

    
  }


  };
