import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutboundPDFPage } from './outbound-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: OutboundPDFPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutboundPDFPageRoutingModule {}
