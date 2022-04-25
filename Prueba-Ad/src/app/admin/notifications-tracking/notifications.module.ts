import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { NotificationHttpService } from './services/http.service';
// import { NotificationListContainer } from './list/container/list.container';

import { NotificationSortComponent } from './list/sort/sort.component';
import { NotificationListContainer } from './list/container/list.container';
import { NotificationItemComponent } from './list/item/notification-item.component';
import { NotificationCreateComponent } from './form/form.component';
import { NotificationFilterComponent } from './list/filter/filter.component';



@NgModule({
  declarations: [
    NotificationSortComponent,
    NotificationFilterComponent,
    NotificationListContainer,
    NotificationSortComponent,
    NotificationItemComponent,
    NotificationCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VirtualScrollerModule,
    QuillModule.forRoot(),
    SharedModule,
    SharedAdminModule,
    NotificationsRoutingModule
  ],
  providers: [
    NotificationHttpService
  ]
})
export class NotificationsModule { }
