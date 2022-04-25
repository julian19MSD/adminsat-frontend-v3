import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';

import { InstallationsRoutingModule } from './installations-routing.module';
import { InstallationsListContainer } from './list/container/list.container';
import { InstallationsFilterComponent } from './list/filter/filter.component';
import { InstallationsItemComponent } from './list/item/installations-item.component';
import { InstallationsHttpService } from './services/http.service';
import { InstallationsSortComponent } from './list/sort/sort.component';
import { InstallationsCreateComponent } from './form/form.component';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';




@NgModule({
  declarations: [
    InstallationsListContainer, 
    InstallationsFilterComponent, 
    InstallationsItemComponent, 
    InstallationsSortComponent, 
    InstallationsCreateComponent
  ],
  imports: [
    CommonModule,
    InstallationsRoutingModule,
    SharedModule,
    VirtualScrollerModule,
    FormsModule,
    ReactiveFormsModule,
    SharedAdminModule
  ],
  providers: [
    InstallationsHttpService
  ]
})
export class InstallationsModule { }
