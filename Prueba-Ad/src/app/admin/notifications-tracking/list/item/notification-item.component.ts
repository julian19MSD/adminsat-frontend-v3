import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification/notification.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { Store } from '@ngrx/store';
import { CommonListItem } from '@shared/commons/common-list.item';
import { INotificationListItem } from '@shared/models/admin-notification.model';
import { RootAction } from '@store/root.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'adms-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent  extends CommonListItem{


  @Input() notification: INotificationListItem;
  // detailComponent = AssetDetailsComponent;
  noImage: boolean;

  constructor(
    public store: Store<RootAction>,
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef,
    public router: Router
  ) {
    super(permissionsService, dialog, notificationService,cdRef);

  }

}
