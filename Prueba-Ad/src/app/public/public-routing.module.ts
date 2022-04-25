import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PublicContainer} from './container/public.container';

const routes: Routes = [
  {
    path: '',
    component: PublicContainer,
    children: [
      {
        path: '',
        redirectTo: '/public/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        data: {
          preload: true
        },
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
      },
      {
        path: 'forgotten-password',
        data: {
          preloadUrls: ['/public/login']
        },
        loadChildren: () => import('./forgotten-password/forgotten-password.module').then(m => m.ForgottenPasswordModule),
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule),
      },
      {
        path: 'mail-validation',
        loadChildren: () => import('./mail-validation/mail-validation.module').then(m => m.MailValidationModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/public/login'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
