import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorRoadRoutingModule } from './actor-road-routing.module';
import { ActorRoadListContainer } from './list/container/list.container';
import { ActorRoadItemComponent } from './list/item/actor-road-item.component';
import { ActorRoadSortComponent } from './list/sort/sort.component';
import { ActorTicketsHttpService, RoadActorHttpService } from './services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { ActorRoadFilterComponent } from './list/filter/filter.component';
import { ActorRoadCreateComponent } from './form/form.component';
import { ActorTicketsCreateComponent } from './tickets/tickets.component';


@NgModule({
  declarations: [
    ActorRoadListContainer,
    ActorRoadItemComponent,
    ActorRoadSortComponent,
    ActorRoadFilterComponent,
    ActorRoadCreateComponent,
    ActorTicketsCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VirtualScrollerModule,
    SharedModule,
    SharedAdminModule,
    ActorRoadRoutingModule
  ],
  providers: [
    RoadActorHttpService,
    ActorTicketsHttpService
  ]
})
export class ActorRoadModule { }
