import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReclaimerInfoPageRoutingModule } from './reclaimer-info-routing.module';

import { ReclaimerInfoPage } from './reclaimer-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReclaimerInfoPageRoutingModule
  ],
  declarations: [ReclaimerInfoPage]
})
export class ReclaimerInfoPageModule {}
