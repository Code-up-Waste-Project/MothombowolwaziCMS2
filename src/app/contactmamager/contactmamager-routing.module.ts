import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactmamagerPage } from './contactmamager.page';

const routes: Routes = [
  {
    path: '',
    component: ContactmamagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactmamagerPageRoutingModule {}
