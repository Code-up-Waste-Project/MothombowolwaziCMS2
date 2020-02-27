import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutboundDriverInfoPage } from './outbound-driver-info.page';

const routes: Routes = [
  {
    path: '',
    component: OutboundDriverInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutboundDriverInfoPageRoutingModule {}
