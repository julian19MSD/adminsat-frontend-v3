import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';

import { CommandsRoutingModule } from './commands-routing.module';
import { CommandsListContainer } from './list/container/list.container';
import { CommandsFilterComponent } from './list/filter/filter.component';
import { CommandsItemComponent } from './list/item/commands-item.component';
import { CommandsHttpService } from './services/http.service';
import { CommandsSortComponent } from './list/sort/sort.component';
import { SharedAdminModule } from '@admin/shared/shared.module';




@NgModule({
  declarations: [
    CommandsListContainer, 
    CommandsFilterComponent, 
    CommandsItemComponent, 
    CommandsSortComponent, 
  ],
  imports: [
    CommonModule,
    CommandsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedAdminModule
  ],
  providers: [
    CommandsHttpService
  ]
})
export class CommandsModule { }
