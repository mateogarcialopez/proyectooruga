import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes


import { NotFoundComponent,
		SolicitudComponent,
		DashboardComponent,
		LoginComponent,
		RestorePasswordComponent,
		UsuarioComponent,
		ComprasComponent,
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
		ProcesoComponent,
		DetCursoDiplomadoComponent,
		DetalleEventoComponent,
		DependenciaComponent,
		ServiciosComponent,
		InstitucionComponent,
		
		DirectorioComponent,
		EstadisticaComponent
		*/
		 } from '../pages/index.paginas';

const appRoutes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'usuario', component: UsuarioComponent},
	{path: 'solicitud', component: SolicitudComponent},
	{path: 'compras', component: ComprasComponent},
	{path: 'curso', component: CursoComponent},
	{path: 'restore-password', component: RestorePasswordComponent},
	{path: "restaurarpass/:token" , component:RestorePasswordComponent},
	{path: "foro" , component:ForoComponent},
	{path: 'curso/detalle-curso/:cursoId', component: DetalleCursoComponent},
	{path: 'institucion', component: InstitucionComponent},
	{path: 'chat', component: ChatComponent},
	{path: 'temas', component: TopicsComponent},
	{path: 'temas/:page', component: TopicsComponent},
	{path: 'tema/:', component: TopicDetallesComponent},
	{path: '**', component: NotFoundComponent},

/*
	{path: 'evento/detalle-evento/:eventoId', component: DetalleEventoComponent},
	{path: 'curso-diplomado', component: CursoDiplomadoComponent},
	{path: 'curso-diplomado/det-curso-diplomado/:cursoDipId', component: DetCursoDiplomadoComponent},
	{path: 'calendario', component: CalendarioComponent},
	{path: 'becas', component: BecasComponent},
	{path: 'programa', component: ProgramaComponent},
	{path: 'programa/detalle-programa/:programaId', component: DetalleProgramaComponent},
	{path: 'evento', component: EventoComponent},
	{path: 'directorio', component: DirectorioComponent},
	{path: 'proceso', component: ProcesoComponent},
	{path: 'dependencia', component: DependenciaComponent},
	{path: 'servicios', component: ServiciosComponent},
	{path: 'institucion', component: InstitucionComponent},
	{path: 'estadistica', component: EstadisticaComponent},
	//{path: 'LoginComponent', component: LoginComponent},

	*/
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
