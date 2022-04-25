import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OpenedSessionsRoutingModule} from './opened-sessions-routing.module';
import {OpenedSessionsListContainer} from './containers/opened-sessions.container';
import {OpenedSessionsHeaderComponent} from './header/header.component';
import {OpenedSessionItemComponent} from './item/item.component';
import {MaterialModule} from '@material/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {OpenedSessionsHttpService} from '@admin/opened-sessions/services/http.service';


@NgModule({
  declarations: [
    OpenedSessionsListContainer,
    OpenedSessionsHeaderComponent,
    OpenedSessionItemComponent
  ],
  imports: [
    CommonModule,
    OpenedSessionsRoutingModule,
    MaterialModule,
    TranslateModule
  ],
  providers: [
    OpenedSessionsHttpService
  ]
})
export class OpenedSessionsModule {
}

