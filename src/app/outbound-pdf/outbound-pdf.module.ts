import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutboundPDFPageRoutingModule } from './outbound-pdf-routing.module';

import { OutboundPDFPage } from './outbound-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutboundPDFPageRoutingModule
  ],
  declarations: [OutboundPDFPage]
})
export class OutboundPDFPageModule {}
