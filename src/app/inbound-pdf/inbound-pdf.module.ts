import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboundPDFPageRoutingModule } from './inbound-pdf-routing.module';

import { InboundPDFPage } from './inbound-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboundPDFPageRoutingModule
  ],
  declarations: [InboundPDFPage]
})
export class InboundPDFPageModule {}
