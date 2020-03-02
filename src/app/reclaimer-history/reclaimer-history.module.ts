import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReclaimerHistoryPageRoutingModule } from './reclaimer-history-routing.module';

import { ReclaimerHistoryPage } from './reclaimer-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReclaimerHistoryPageRoutingModule
  ],
  declarations: [ReclaimerHistoryPage]
})
export class ReclaimerHistoryPageModule {}
