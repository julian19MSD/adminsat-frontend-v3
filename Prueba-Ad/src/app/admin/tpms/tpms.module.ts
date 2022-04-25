import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';

import { TpmsRoutingModule } from './tpms-routing.module';
import { TpmsListContainer } from './list/container/list.container';
import { TpmsFilterComponent } from './list/filter/filter.component';
import { TpmsItemComponent } from './list/item/tpms-item.component';
import { TpmsHttpService } from './services/http.service';
import { TpmsSortComponent } from './list/sort/sort.component';
import { TpmsCreateComponent } from './form/form.component';
import { SharedAdminModule } from '@admin/shared/shared.module';




@NgModule({
  declarations: [
    TpmsListContainer, 
    TpmsFilterComponent, 
    TpmsItemComponent, 
    TpmsSortComponent, 
    TpmsCreateComponent
  ],
  imports: [
    CommonModule,
    TpmsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedAdminModule
  ],
  providers: [
    TpmsHttpService
  ]
})
export class TpmsModule { }
