import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReclaimerPDFPage } from './reclaimer-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: ReclaimerPDFPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReclaimerPDFPageRoutingModule {}
