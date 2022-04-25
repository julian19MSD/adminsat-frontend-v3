import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShiftAssignmentRoutingModule} from './shift-assignment-routing.module';
import {SharedAdminModule} from '@admin/shared/shared.module';
import {ShiftAssignmentListContainer} from './list/container/list.container';
import {ShiftAssignmentHttpService} from '@admin/shift-assignment/services/http.service';
import {ShiftAssignmentItemComponent} from './list/item/shift-assignment-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShiftAssignmentAlarmsDetailsComponent} from '@admin/shift-assignment/list/alarms-details/shift-assignment-alarms-details.component';
import {ShiftAssignmentObservationsComponent} from '@admin/shift-assignment/list/observations/observations.component';
import {ShiftAssignmentFilterComponent} from '@admin/shift-assignment/list/filter/filter.component';
import {ShiftAssignmentSortComponent} from '@admin/shift-assignment/list/sort/sort.component';
import {ShiftAssignmentCreateComponent} from './form/form.component';


@NgModule({
  declarations: [
    ShiftAssignmentListContainer,
    ShiftAssignmentItemComponent,
    ShiftAssignmentAlarmsDetailsComponent,
    ShiftAssignmentObservationsComponent,
    ShiftAssignmentFilterComponent,
    ShiftAssignmentSortComponent,
    ShiftAssignmentCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShiftAssignmentRoutingModule,
    SharedAdminModule,
  ],
  providers: [
    ShiftAssignmentHttpService
  ]
})
export class ShiftAssignmentModule {
}
