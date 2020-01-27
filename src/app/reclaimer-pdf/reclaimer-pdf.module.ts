import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReclaimerPDFPageRoutingModule } from './reclaimer-pdf-routing.module';

import { ReclaimerPDFPage } from './reclaimer-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReclaimerPDFPageRoutingModule
  ],
  declarations: [ReclaimerPDFPage]
})
export class ReclaimerPDFPageModule {}
