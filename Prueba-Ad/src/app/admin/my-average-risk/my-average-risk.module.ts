import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyAverageRiskRoutingModule} from './my-average-risk-routing.module';
import {MyAverageRiskComponent} from './my-average-risk.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {SharedAdminModule} from '@admin/shared/shared.module';


@NgModule({
  declarations: [MyAverageRiskComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyAverageRiskRoutingModule,
    SharedModule,
    SharedAdminModule
  ]
})
export class MyAverageRiskModule {
}
