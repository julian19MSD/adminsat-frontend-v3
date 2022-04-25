import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';

import {ISession} from '@shared/models/opened-sessions.model';
import {CommonListItem} from '@shared/commons/common-list.item';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '@core/services/notification/notification.service';

@Component({
  selector: 'adms-opened-session-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpenedSessionItemComponent extends CommonListItem {
  @Input() session: ISession;

  constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super(permissionsService, dialog, notificationService, cdRef);
  }

}
