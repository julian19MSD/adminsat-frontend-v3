import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyFleetRoutingModule} from './my-fleet-routing.module';
import {MyFleetContainer} from './container/my-fleet.container';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {MyFleetHeaderComponent} from './header/header.component';
import {SharedModule} from '@shared/shared.module';
import {MaterialModule} from '@material/material.module';
import {ClientSelectorComponent} from './client-selector/client-selector.component';
import { MyFleetDashboardHttpService, MyFleetHttpService } from './services/http.service';


@NgModule({
  declarations: [
    MyFleetContainer,
    MyFleetHeaderComponent,
    ClientSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MyFleetRoutingModule,
    SharedModule,
    MaterialModule,
    TranslateModule
  ],
  providers: [
    MyFleetHttpService,
    MyFleetDashboardHttpService
  ]
})
export class MyFleetModule {
}
