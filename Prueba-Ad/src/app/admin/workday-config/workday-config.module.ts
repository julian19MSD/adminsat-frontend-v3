import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkdayConfigRoutingModule } from './workday-config-routing.module';
import { WorkdayConfigListContainer } from './list/container/list.container';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { WorkdayConfigHttpService } from './services/http.service';
import { WorkdayConfigItemComponent } from './list/item/workday-config-item.component';
import { WorkdayConfigCreateComponent } from './form/form.component';
import { WorkdayConfigSortComponent } from './list/sort/sort.component';
import { WorkdayConfigFilterComponent } from './list/filter/filter.component';



@NgModule({
  declarations: [
    WorkdayConfigListContainer,
    WorkdayConfigItemComponent,
    WorkdayConfigCreateComponent,
    WorkdayConfigFilterComponent,
    WorkdayConfigSortComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VirtualScrollerModule,
    QuillModule.forRoot(),
    SharedModule,
    SharedAdminModule,
    WorkdayConfigRoutingModule
  ],
  providers: [
    WorkdayConfigHttpService
  ]
})
export class WorkdayConfigModule { }
