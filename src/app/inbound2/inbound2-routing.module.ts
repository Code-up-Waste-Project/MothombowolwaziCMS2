import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Inbound2Page } from './inbound2.page';

const routes: Routes = [
  {
    path: '',
    component: Inbound2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Inbound2PageRoutingModule {}
