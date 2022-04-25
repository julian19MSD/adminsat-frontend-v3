import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IZonesListItem } from '@shared/models/zones.model';
import { CommonListItem } from '@shared/commons/common-list.item';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { ZonesCreateComponent } from '@admin/zones/form/form.component';
import { take } from 'rxjs/operators';
import { SubzonesListComponent } from '@admin/shared/zones/subzones-list/subzones.component';
import { PERMISSIONS } from '@shared/consts/permissions.consts';

@Component({
  selector: 'adms-zones-item',
  templateUrl: './zones-item.component.html',
  styleUrls: ['./zones-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZonesItemComponent extends CommonListItem {

  @Input() zones: IZonesListItem;
  noImage: boolean;
  detailComponent = SubzonesListComponent;
 permissions = PERMISSIONS;

  constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super(permissionsService, dialog, notificationService,cdRef);
  }


  openEditDialog(id: number) {
    this.dialog.open(ZonesCreateComponent, { disableClose: true, data: { id }, panelClass: 'full-screen'})
      .afterClosed()
      .pipe(
        take(1)
      )
      .subscribe((result) => {
        if (true === result) {
          this.notificationService.sendSuccessNotification({}, null, 'CREATED_SUCCESSFUL');
          this.refrehsList.emit();
        } 
      (err) =>{ 
        this.notificationService.sendErrorNotification({}, err);}
    });
  }


}
