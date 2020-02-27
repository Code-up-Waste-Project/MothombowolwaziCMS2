import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Reclaimer2Page } from './reclaimer2.page';

const routes: Routes = [
  {
    path: '',
    component: Reclaimer2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Reclaimer2PageRoutingModule {}
