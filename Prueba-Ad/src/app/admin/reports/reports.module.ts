import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { ReportsHttpService} from './services/http.service'
import { EcuModule } from './consults/ecu/ecu.module';

@NgModule({
  declarations: [ReportsComponent],
  providers:[
    ReportsHttpService
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    EcuModule,
    SharedAdminModule
  ]
})
export class ReportsModule { }
