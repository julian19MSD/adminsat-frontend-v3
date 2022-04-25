import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauTPMSRoutingModule } from './tableau-tpms-routing.module';
import { TableauTPMSComponent } from './tableau-tpms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { TableauTPMSHttpService} from './services/http.service'


@NgModule({
  declarations: [TableauTPMSComponent],
  providers:[
    TableauTPMSHttpService
  ],
  imports: [
    CommonModule,
    TableauTPMSRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SharedAdminModule
  ]
})
export class TableauTPMSModule { }
