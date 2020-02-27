import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutboundDriverInfoPageRoutingModule } from './outbound-driver-info-routing.module';

import { OutboundDriverInfoPage } from './outbound-driver-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutboundDriverInfoPageRoutingModule
  ],
  declarations: [OutboundDriverInfoPage]
})
export class OutboundDriverInfoPageModule {}
