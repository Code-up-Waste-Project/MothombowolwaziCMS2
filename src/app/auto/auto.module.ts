import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoPageRoutingModule } from './auto-routing.module';

import { AutoPage } from './auto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AutoPageRoutingModule
  ],
  declarations: [AutoPage]
})
export class AutoPageModule {}
