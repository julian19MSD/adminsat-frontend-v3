import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InstallationsControlRoutingModule} from './installations-control-routing.module';
import {InstallationsControlContainer} from './container/installations-control.container';
import {SharedAdminModule} from '@admin/shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {InstallationsControlHttpService} from '@admin/installations-control/services/http.service';
import {InstallationsControlFilterComponent} from '@admin/installations-control/filter/filter.component';
import {InstallationsControlSortComponent} from '@admin/installations-control/sort/sort.component';


@NgModule({
  declarations: [
    InstallationsControlContainer,
    InstallationsControlFilterComponent,
    InstallationsControlSortComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InstallationsControlRoutingModule,
    SharedAdminModule,
    SharedModule
  ],
  providers: [
    InstallationsControlHttpService
  ]

})
export class InstallationsControlModule {
}
