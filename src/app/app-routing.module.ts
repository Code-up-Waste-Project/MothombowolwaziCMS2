import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'inbound',
    loadChildren: () => import('./inbound/inbound.module').then( m => m.InboundPageModule)
  },
  {
    path: 'outbound',
    loadChildren: () => import('./outbound/outbound.module').then( m => m.OutboundPageModule)
  },
  {
    path: 'reclaimer',
    loadChildren: () => import('./reclaimer/reclaimer.module').then( m => m.ReclaimerPageModule)
  },
  {
    path: 'manageusers',
    loadChildren: () => import('./manageusers/manageusers.module').then( m => m.ManageusersPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'registers',
    loadChildren: () => import('./registers/registers.module').then( m => m.RegistersPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'home2',
    loadChildren: () => import('./home2/home2.module').then( m => m.Home2PageModule)
  },
  {
    path: 'inbound-pdf/:id',
    loadChildren: () => import('./inbound-pdf/inbound-pdf.module').then( m => m.InboundPDFPageModule)
  },
  {
    path: 'outbound-pdf/:id',
    loadChildren: () => import('./outbound-pdf/outbound-pdf.module').then( m => m.OutboundPDFPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
