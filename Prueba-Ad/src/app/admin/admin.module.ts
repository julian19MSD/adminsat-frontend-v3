import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxTwitterTimelineModule} from 'ngx-twitter-timeline';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminContainer} from './container/admin.container';
import {SideMenuComponent} from '@admin/container/side-menu/side-menu.component';
import {ControlsComponent} from '@admin/container/controls/controls.component';
import {WebSocketService} from '@admin/shared/services/web-socket.service';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {ListHeaderComponent} from '@admin/container/list-header/list-header.component';
import {FormHeaderComponent} from '@admin/container/form-header/form-header.component';
import {InviasTwitterDialogComponent} from '@admin/container/invias-twitter/invias-twitter.component';


@NgModule({
  declarations: [
    AdminContainer,
    SideMenuComponent,
    ListHeaderComponent,
    FormHeaderComponent,
    InviasTwitterDialogComponent,
    ControlsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule,
    NgxTwitterTimelineModule
  ],
  providers: [
    WebSocketService,
    HeaderMessengerService
  ]
})
export class AdminModule {
}
