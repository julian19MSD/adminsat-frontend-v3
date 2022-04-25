import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification/notification.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { Store } from '@ngrx/store';
import { CommonListItem } from '@shared/commons/common-list.item';
import { IECUNotificationListItem } from '@shared/models/ecu-notification.model';
import { RootAction } from '@store/root.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'adms-ecu-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class ECUNotificationItemComponent  extends CommonListItem{


  @Input() notification: IECUNotificationListItem;
  // detailComponent = AssetDetailsComponent;
  noImage: boolean;
  metricsAlias: any;

  constructor(
    public store: Store<RootAction>,
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef,
    public router: Router
  ) {
    super(permissionsService, dialog, notificationService,cdRef);

    this.store.select('theme', 'metrics_alias').pipe(take(1)).subscribe(info => this.metricsAlias = info);

  }

}
