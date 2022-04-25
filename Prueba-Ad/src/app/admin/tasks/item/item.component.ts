import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';

import {ITasks} from '@shared/models/tasks.models';
import {CommonListItem} from '@shared/commons/common-list.item';
import {TaskDetailsComponent} from '@admin/tasks/details/details.component';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '@core/services/notification/notification.service';

@Component({
  selector: 'adms-task-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent extends CommonListItem {
  @Input() task: ITasks;

  detailComponent = TaskDetailsComponent;

  constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super(permissionsService, dialog, notificationService, cdRef);
  }
}
