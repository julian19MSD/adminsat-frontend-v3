import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauFlotaTotalRoutingModule } from './tableau-flota-total-routing.module';
import { TableauFlotaTotalComponent } from './tableau-flota-total.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { TableauFlotaTotalHttpService} from './services/http.service'


@NgModule({
  declarations: [TableauFlotaTotalComponent],
  providers:[
    TableauFlotaTotalHttpService
  ],
  imports: [
    CommonModule,
    TableauFlotaTotalRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SharedAdminModule
  ]
})
export class TableauFlotaTotalModule { }
