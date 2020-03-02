import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReclaimerHistoryPage } from './reclaimer-history.page';

const routes: Routes = [
  {
    path: '',
    component: ReclaimerHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReclaimerHistoryPageRoutingModule {}
