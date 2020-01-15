import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactmamagerPageRoutingModule } from './contactmamager-routing.module';

import { ContactmamagerPage } from './contactmamager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactmamagerPageRoutingModule
  ],
  declarations: [ContactmamagerPage]
})
export class ContactmamagerPageModule {}
