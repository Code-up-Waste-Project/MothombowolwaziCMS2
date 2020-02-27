import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Inbound2PageRoutingModule } from './inbound2-routing.module';

import { Inbound2Page } from './inbound2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Inbound2PageRoutingModule
  ],
  declarations: [Inbound2Page]
})
export class Inbound2PageModule {}
