import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendCommandsRoutingModule } from './send-commands-routing.module';
import { SendCommandsComponent } from './send-commands.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendCommandsHttpService} from './services/http.service'
import { SharedModule } from '@shared/shared.module';
import { SharedAdminModule } from '@admin/shared/shared.module';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { CustomCommandComponent } from './custom-command/custom-command.component';


@NgModule({
  declarations: [
    SendCommandsComponent,
    CustomCommandComponent
  ],
  providers:[
    SendCommandsHttpService
  ],
  imports: [
    CommonModule,
    FormsModule,
    SendCommandsRoutingModule,
    ReactiveFormsModule,
    VirtualScrollerModule,
    SharedModule,
    SharedAdminModule,
  ]
})
export class SendCommandsModule { }
