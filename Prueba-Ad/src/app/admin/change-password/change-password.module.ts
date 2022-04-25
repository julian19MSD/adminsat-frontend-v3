import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';

import {ChangePasswordRoutingModule} from './change-password-routing.module';
import {ChangePasswordComponent} from './change-password.component';
import {MaterialModule} from '@material/material.module';


@NgModule({
  declarations: [
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChangePasswordRoutingModule,
    MaterialModule,
    TranslateModule
  ]
})
export class ChangePasswordModule {
}


