import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'informacion'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'informacion',
        loadChildren: '../informacion/informacion.module#InformacionPageModule',

      },
      {
        path: 'solicitudes',
        loadChildren: '../solicitudes/solicitudes.module#SolicitudesPageModule',

      },
      {
        path: 'mensajes',
        loadChildren: '../mensajes/mensajes.module#MensajesPageModule',
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
