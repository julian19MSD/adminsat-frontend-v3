import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

import { CommonListItem } from '@shared/commons/common-list.item';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { DeviceDetailsComponent } from '@admin/shared/devices/details/details.component';
import { RoadActorDetailsComponent } from '@admin/shared/road-actor/details/details.component';
import { IRoadActorListItem } from '@shared/models/road-actor.model';

@Component({
  selector: 'adms-actor-road-item',
  templateUrl: './actor-road-item.component.html',
  styleUrls: ['./actor-road-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorRoadItemComponent extends CommonListItem {

  @Input() actor: IRoadActorListItem;
  detailComponent = RoadActorDetailsComponent;
  noImage: boolean;

  constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super(permissionsService, dialog, notificationService,cdRef);
  }


  openDeviceDetails(id: number) {
   this.openDetailDialog(id, DeviceDetailsComponent)
  }
}
