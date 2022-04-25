import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardContainer} from './container/dashboard.container';
import {TranslateModule} from '@ngx-translate/core';
import {GridsterModule} from 'angular-gridster2';
import {DashboardTrackingComponent} from './tracking/tracking.component';
import {FormsModule} from '@angular/forms';
import {DashboardHeaderComponent} from './header/header.component';
import {SharedModule} from '@shared/shared.module';
import {MaterialModule} from '@material/material.module';
import {DashboardHttpService} from '@admin/dashboard/services/http.service';
import {ClientSelectorComponent} from './client-selector/client-selector.component';


@NgModule({
  declarations: [
    DashboardContainer,
    DashboardHeaderComponent,
    DashboardTrackingComponent,
    ClientSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule,
    GridsterModule,
    TranslateModule
  ],
  providers: [
    DashboardHttpService
  ]
})
export class DashboardModule {
}
