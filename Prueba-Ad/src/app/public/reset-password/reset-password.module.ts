import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResetPasswordRoutingModule} from './reset-password-routing.module';
import {ResetPasswordComponent} from './reset-password.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {MaterialModule} from '@material/material.module';
import {ResetPasswordHttpService} from '@public/reset-password/shared/http.service';


@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResetPasswordRoutingModule,
    MaterialModule,
    SharedModule,
    TranslateModule
  ],
  providers:[
    ResetPasswordHttpService
  ]
})
export class ResetPasswordModule {
}

