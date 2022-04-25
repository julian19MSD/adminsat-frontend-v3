import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ForgottenPasswordRoutingModule} from './forgotten-password-routing.module';
import {ForgottenPasswordComponent} from './forgotten-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [
    ForgottenPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ForgottenPasswordRoutingModule,
    SharedModule
  ]
})
export class ForgottenPasswordModule {
}

