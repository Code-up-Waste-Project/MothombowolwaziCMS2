import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageusersPageRoutingModule } from './manageusers-routing.module';

import { ManageusersPage } from './manageusers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ManageusersPageRoutingModule
  ],
  declarations: [ManageusersPage]
})
export class ManageusersPageModule {}
