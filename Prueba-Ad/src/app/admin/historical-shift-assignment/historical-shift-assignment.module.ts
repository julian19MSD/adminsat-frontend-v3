import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HistoricalShiftAssignmentRoutingModule} from './historical-shift-assignment-routing.module';
import {HistoricalShiftAssignmentContainer} from '@admin/historical-shift-assignment/container/historical-shift-assignment.container';
import {SharedModule} from '@shared/shared.module';
import {SharedAdminModule} from '@admin/shared/shared.module';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {HistoricalShiftAssignmentHttpService} from '@admin/historical-shift-assignment/services/http.service';
import {HistoricalShiftAssignmentItemComponent} from './item/historical-shift-assignment-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HistoricalShiftAssignmentFilterComponent} from '@admin/historical-shift-assignment/filter/filter.component';
import {HistoricalShiftAssignmentSortComponent} from '@admin/historical-shift-assignment/sort/sort.component';


@NgModule({
  declarations: [
    HistoricalShiftAssignmentContainer,
    HistoricalShiftAssignmentItemComponent,
    HistoricalShiftAssignmentFilterComponent,
    HistoricalShiftAssignmentSortComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HistoricalShiftAssignmentRoutingModule,
    VirtualScrollerModule,
    SharedModule,
    SharedAdminModule
  ],
  providers: [
    HistoricalShiftAssignmentHttpService
  ]
})
export class HistoricalShiftAssignmentModule {
}
