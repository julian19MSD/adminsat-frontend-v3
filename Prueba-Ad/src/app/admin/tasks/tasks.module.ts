import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TasksRoutingModule} from './tasks-routing.module';
import {TasksContainer} from './container/tasks.container';
import {TasksHeaderComponent} from '@admin/tasks/header/header.component';
import {TasksHttpService} from '@admin/tasks/services/http.service';
import {TaskItemComponent} from '@admin/tasks/item/item.component';
import {TranslateModule} from '@ngx-translate/core';
import {MaterialModule} from '@material/material.module';
import {TaskDetailsComponent} from '@admin/tasks/details/details.component';


@NgModule({
  declarations: [
    TasksContainer,
    TasksHeaderComponent,
    TaskItemComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    TranslateModule,
    MaterialModule
  ],
  providers: [
    TasksHttpService
  ]
})
export class TasksModule {
}
