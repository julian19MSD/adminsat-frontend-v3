import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauEnturnamientoRoutingModule } from './tableau-enturnamiento-routing.module';
import { TableauEnturnamientoComponent } from './tableau-enturnamiento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { TableauEnturnamientoHttpService} from './services/http.service'


@NgModule({
  declarations: [TableauEnturnamientoComponent],
  providers:[
    TableauEnturnamientoHttpService
  ],
  imports: [
    CommonModule,
    TableauEnturnamientoRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SharedAdminModule
  ]
})
export class TableauEnturnamientoModule { }
