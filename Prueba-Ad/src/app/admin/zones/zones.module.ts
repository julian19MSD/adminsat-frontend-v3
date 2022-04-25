import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';

import { ZonesRoutingModule } from './zones-routing.module';
import { ZonesListContainer } from './list/container/list.container';
import { ZonesFilterComponent } from './list/filter/filter.component';
import { ZonesItemComponent } from './list/item/zones-item.component';
import { ZonesHttpService } from './services/http.service';
import { ZonesSortComponent } from './list/sort/sort.component';
import { ZonesCreateComponent } from './form/form.component';
import { SharedAdminModule } from '@admin/shared/shared.module';




@NgModule({
  declarations: [
    ZonesListContainer, 
    ZonesFilterComponent, 
    ZonesItemComponent, 
    ZonesSortComponent, 
    ZonesCreateComponent
  ],
  imports: [
    CommonModule,
    ZonesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedAdminModule
  ],
  providers: [
    ZonesHttpService
  ]
})
export class ZonesModule { }
