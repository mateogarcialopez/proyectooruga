
/*
export const URL = "https://proyecto-um.herokuapp.com/api";
export const URL_INDEXACION = "https://proyecto-um.herokuapp.com/uploads";
*/
//producccion

export const URL = "https://oruga-learnig.herokuapp.com/api";

/*
export const URL = "https://csumanizales.herokuapp.com/api";
export const URL_INDEXACION = "https://csumanizales.herokuapp.com/uploads";
*/
export const SERVICES = {
	
	LOGIN:"/signin",
	ADDUSUARIO:"/signup",
	GETUSUARIOS:"/usuario",
	DELETE_USUARIO:"/usuario/delete",
	RESTOREPASS:"/forgot",
	NEWPASS:"/confirm/",
	RESETPASS:"/reset/",
	POSTPROGRAMA:"/nuevo",
	ADDEVENTO:"/evento/nuevo",
	GETEVENTOS:"/evento",
	GETEVENTOID:"/evento/",
	DELETE_EVENTO:"/evento/delete",
	GETSOLICITUDES:"/solicitud",
	EJECUTARSOLICITUD:"/solicitud/verificar/",
	ADDCURSODIP:"/curso_diplomado/",
	GETCURSODIP:"/curso_diplomado",
	DELETE_CURSODIP:"/curso_diplomado/delete",
	GETCURSODIPID:"/curso_diplomado/",
	GETPROCESOS:"/proceso",
	ADDPROCESO:"/proceso/",
	DELETE_PROCESO:"/proceso/delete",
	GETCURSOS:"/curso",
	GETPROGRAMAID:"/programa/",
	ADDPROGRAMA:"/programa/nuevo",
	DELETE_PROGRAMA:"/programa/delete",
	GETBECAS:"/beca",
	ADDBECA:"/beca/",
	DELETE_BECA:"/beca/delete",
	GETCALENDARIO:"/calendario",
	ADDCALENDARIO:"/calendario/",
	DELETE_CALENDARIO:"/calendario/delete",
	SERVICIOS:"/servicio",
	INSTITUCION:"/institucion",
	GETDEPENDENCIAS:"/dependencia",
	ADDDIFUSION:"/difusion",
	GETCUENTASBANCARIAS:"/cuenta",
	ADDDEPENDENCIA:"/dependencia",
	ADDSERVICIO:"/servicio",
	DELETESERVICIO:"/servicio/delete",
	GETDIRECTORIO:"/directorio",
	ADDDIRECTORIO:"/directorio",
	ESTADISTICA:"/consultas",
	ESTADISTICA_TOTAL:"/consultas/total",
	CURSOS:"/curso",
	COMPRAR:"/compra",
	TOPIC:"/saveTopic",
	GETTOPICS:"/user-topics/",
	GETTOPIC: "/getTopic/",
	UPDATETOPIC: "/updateTopic/",
	LISTTOPIC: "/listTopic/",
	TOPICS: "/getTopic/",
	ADDCOMENT: "/addComment/",
	BUSCAR: "/buscar/",
};
