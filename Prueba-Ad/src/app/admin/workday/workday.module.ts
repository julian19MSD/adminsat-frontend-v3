import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkdayRoutingModule } from './workday-routing.module';
import { WorkdayContainerComponent } from './list/container/list.container';
import { WorkdayItemComponent } from './list/item/workday-item.component';
import { WorkdayHttpService } from './services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { WorkdayObservationsComponent } from './observations/observations.component';
import { WorkdayNoveltyComponent } from './novelty/novelty.component';
import { WorkdayCreateComponent } from './form/form.component';
import { WorkdaySortComponent } from './list/sort/sort.component';
import { WorkdayFilterComponent } from './list/filter/filter.component';


@NgModule({
  declarations: [
     WorkdayContainerComponent,
     WorkdayItemComponent,
     WorkdayNoveltyComponent,
     WorkdayObservationsComponent,
     WorkdayItemComponent,
     WorkdaySortComponent,
     WorkdayFilterComponent,
     WorkdayCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedAdminModule,
    WorkdayRoutingModule
  ],
  providers: [
    WorkdayHttpService
  ],
})
export class WorkdayModule { }
