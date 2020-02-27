import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: DirectionPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    // RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
