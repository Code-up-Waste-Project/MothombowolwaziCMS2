import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboundHistoryPageRoutingModule } from './inbound-history-routing.module';

import { InboundHistoryPage } from './inbound-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboundHistoryPageRoutingModule
  ],
  declarations: [InboundHistoryPage]
})
export class InboundHistoryPageModule {}
