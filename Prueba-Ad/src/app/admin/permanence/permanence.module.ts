import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermanenceRoutingModule } from './permanence-routing.module';
import { PermanenceContainerComponent } from './list/container/list.container';
import { PermanenceHttpService } from './services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { PermanenceSortComponent } from './list/sort/sort.component';
import { PermanenceFilterComponent } from './list/filter/filter.component';
import { PermanenceItemComponent } from './list/item/permanence-item.component';


@NgModule({
  declarations: [
    PermanenceContainerComponent,
    PermanenceItemComponent,
    PermanenceFilterComponent,
    PermanenceFilterComponent,
    PermanenceSortComponent,
    PermanenceFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedAdminModule,
    PermanenceRoutingModule
  ],
  providers: [
    PermanenceHttpService
  ],
})
export class PermanenceModule { }
