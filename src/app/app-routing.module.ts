import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ingresar', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'home/:id', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'eventos', loadChildren: './paginas/eventos/eventos.module#EventosPageModule' },
  { path: 'loginn', loadChildren: './loginn/loginn.module#LoginnPageModule' },
  { path: 'ingresar', loadChildren: './ingresar/ingresar.module#IngresarPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'informacion', loadChildren: './informacion/informacion.module#InformacionPageModule' },
  { path: 'solicitudes', loadChildren: './solicitudes/solicitudes.module#SolicitudesPageModule' },
  { path: 'mensajes', loadChildren: './mensajes/mensajes.module#MensajesPageModule' },
  { path: 'selugar', loadChildren: './selugar/selugar.module#SelugarPageModule' },
  { path: 'veterinarias', loadChildren: './veterinarias/veterinarias.module#VeterinariasPageModule' },
  { path: 'mapav', loadChildren: './mapav/mapav.module#MapavPageModule' },
  { path: 'tienda', loadChildren: './paginas/tienda/tienda.module#TiendaPageModule' },
  { path: 'informacion-a', loadChildren: './informacion-a/informacion-a.module#InformacionAPageModule' },
  { path: 'informacion-a/:id', loadChildren: './informacion-a/informacion-a.module#InformacionAPageModule' },
  { path: 'mapav/:id', loadChildren: './mapav/mapav.module#MapavPageModule' },
  { path: 'reportes', loadChildren: './reportes/reportes.module#ReportesPageModule' },
  { path: 'favoritos', loadChildren: './favoritos/favoritos.module#FavoritosPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
     ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
