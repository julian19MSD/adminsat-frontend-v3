import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ECUNotificationsRoutingModule } from './notifications-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { ECUNotificationHttpService } from './services/http.service';
// import { NotificationListContainer } from './list/container/list.container';

import { ECUNotificationSortComponent } from './list/sort/sort.component';
import { ECUNotificationListContainer } from './list/container/list.container';
import { ECUNotificationItemComponent } from './list/item/notification-item.component';
import { ECUNotificationCreateComponent } from './form/form.component';
import { ECUNotificationFilterComponent } from './list/filter/filter.component';



@NgModule({
  declarations: [
    ECUNotificationSortComponent,
    ECUNotificationFilterComponent,
    ECUNotificationListContainer,
    ECUNotificationSortComponent,
    ECUNotificationItemComponent,
    ECUNotificationCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VirtualScrollerModule,
    QuillModule.forRoot(),
    SharedModule,
    SharedAdminModule,
    ECUNotificationsRoutingModule
  ],
  providers: [
    ECUNotificationHttpService
  ]
})
export class ECUNotificationsModule { }
