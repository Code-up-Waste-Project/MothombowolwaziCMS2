import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReclaimerPage } from './reclaimer.page';

const routes: Routes = [
  {
    path: '',
    component: ReclaimerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReclaimerPageRoutingModule {}
