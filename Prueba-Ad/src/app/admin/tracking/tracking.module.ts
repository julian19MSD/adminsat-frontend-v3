import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrackingRoutingModule} from './tracking-routing.module';
import {TrackingContainer} from './container/tracking.container';
import {SharedAdminModule} from '@admin/shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {TrackingHttpService} from '@admin/tracking/services/http.service';
import {TrackingFilterComponent} from '@admin/tracking/filter/filter.component';
import {TrackingSortComponent} from '@admin/tracking/sort/sort.component';


@NgModule({
  declarations: [
    TrackingContainer,
    TrackingFilterComponent,
    TrackingSortComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrackingRoutingModule,
    SharedAdminModule,
    SharedModule
  ],
  providers: [
    TrackingHttpService
  ]

})
export class TrackingModule {
}
