import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {TranslateModule} from '@ngx-translate/core';
import {QuillModule} from 'ngx-quill';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@material/material.module';

import {AlarmsRoutingModule} from './alarms-routing.module';
import {AlarmsContainer} from './container/alarms.container';
import {AlarmCardItemComponent} from '@admin/alarms/cardItem/cardItem.component';
import {SharedModule} from '@shared/shared.module';
import {ChangeAlarmsComponent} from '@admin/alarms/change/change.component';
import {AlarmsHttpService} from '@admin/alarms/services/http.service';
import {AlarmFilterComponent} from '@admin/alarms/filter/filter.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from '@busacca/ng-pick-datetime';
import {AlarmSortComponent} from '@admin/alarms/sort/sort.component';
import {SharedAdminModule} from '@admin/shared/shared.module';

@NgModule({
  declarations: [
    AlarmsContainer,
    AlarmCardItemComponent,
    ChangeAlarmsComponent,
    AlarmFilterComponent,
    AlarmSortComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlarmsRoutingModule,
    VirtualScrollerModule,
    QuillModule.forRoot(),
    MaterialModule,
    SharedModule,
    SharedAdminModule,
    TranslateModule
  ],
  providers: [
    AlarmsHttpService
  ]
})
export class AlarmsModule {
}
