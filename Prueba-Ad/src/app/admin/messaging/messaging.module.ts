import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagingRoutingModule } from './messaging-routing.module';
import { MessagingContainerComponent } from './list/container/list.container';
import { MessagingHttpService } from './services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { MessagingSortComponent } from './list/sort/sort.component';
import { MessagingFilterComponent } from './list/filter/filter.component';
import { MessagingItemComponent } from './list/item/messaging-item.component';
import { NewMessageComponent } from './message/message.component';
import { MessagingCreateComponent } from './form/form.component';


@NgModule({
  declarations: [
    MessagingContainerComponent,
    MessagingItemComponent,
    MessagingFilterComponent,
    MessagingFilterComponent,
    MessagingSortComponent,
    MessagingFilterComponent,
    NewMessageComponent,
    MessagingCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedAdminModule,
    MessagingRoutingModule
  ],
  providers: [
    MessagingHttpService
  ],
})
export class MessagingModule { }
