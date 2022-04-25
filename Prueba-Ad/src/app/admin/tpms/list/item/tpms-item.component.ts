import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ITpmsListItem } from '@shared/models/tpms.model';
import { CommonListItem } from '@shared/commons/common-list.item';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { TpmsDetailsComponent } from '@admin/shared/tpms/details/details.component';

@Component({
  selector: 'adms-tpms-item',
  templateUrl: './tpms-item.component.html',
  styleUrls: ['./tpms-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TpmsItemComponent extends CommonListItem {

  @Input() tpms: ITpmsListItem;
  detailComponent = TpmsDetailsComponent;
  noImage: boolean;

 
  constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super(permissionsService, dialog, notificationService,cdRef);
  }



}
