import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboundPDFPage } from './inbound-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: InboundPDFPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboundPDFPageRoutingModule {}
