import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MailValidationRoutingModule} from './mail-validation-routing.module';
import {MailValidationComponent} from './mail-validation.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '@shared/shared.module';
import {MaterialModule} from '@material/material.module';


@NgModule({
  declarations: [MailValidationComponent],
  imports: [
    CommonModule,
    MailValidationRoutingModule,
    MaterialModule,
    TranslateModule,
    SharedModule
  ]
})
export class MailValidationModule {
}

