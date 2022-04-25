import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcuAlarmRoutingModule } from './ecu-alert-routing.module';
import { EcuAlarmContainerComponent } from './list/container/list.container';
import { EcuAlarmHttpService } from './services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { EcuAlarmSortComponent } from './list/sort/sort.component';
import { EcuAlarmFilterComponent } from './list/filter/filter.component';
import { EcuAlarmItemComponent } from './list/item/ecu-alarm-item.component';


@NgModule({
  declarations: [
    EcuAlarmContainerComponent,
    EcuAlarmItemComponent,
    EcuAlarmFilterComponent,
    EcuAlarmFilterComponent,
    EcuAlarmSortComponent,
    EcuAlarmFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedAdminModule,
    EcuAlarmRoutingModule
  ],
  providers: [
    EcuAlarmHttpService
  ],
})
export class EcuAlarmModule { }
