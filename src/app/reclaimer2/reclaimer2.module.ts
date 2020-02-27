import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Reclaimer2PageRoutingModule } from './reclaimer2-routing.module';

import { Reclaimer2Page } from './reclaimer2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Reclaimer2PageRoutingModule
  ],
  declarations: [Reclaimer2Page]
})
export class Reclaimer2PageModule {}
