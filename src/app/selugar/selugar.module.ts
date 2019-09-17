import { PipesModule } from './../pipes/pipes.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelugarPage } from './selugar.page';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: SelugarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ComponentsModule
   
  ],
  declarations: [SelugarPage]
})
export class SelugarPageModule {}
