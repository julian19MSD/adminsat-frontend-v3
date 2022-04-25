import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauTiempoMotorRoutingModule } from './tableau-tiempo-motor-routing.module';
import { TableauTiempoMotorComponent } from './tableau-tiempo-motor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { TableauTiempoMotorHttpService} from './services/http.service'


@NgModule({
  declarations: [TableauTiempoMotorComponent],
  providers:[
    TableauTiempoMotorHttpService
  ],
  imports: [
    CommonModule,
    TableauTiempoMotorRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SharedAdminModule
  ]
})
export class TableauTiempoMotorModule { }
