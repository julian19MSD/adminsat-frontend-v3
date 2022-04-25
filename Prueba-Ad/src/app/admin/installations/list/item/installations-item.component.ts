import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IInstallationsListItem } from '@shared/models/installations.model';
import { CommonListItem } from '@shared/commons/common-list.item';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { InstallationsCreateComponent } from '@admin/installations/form/form.component';
import { take } from 'rxjs/operators';
import { SubinstallationsListComponent } from '@admin/shared/installations/subinstallations-list/subinstallations.component';
import { PERMISSIONS } from '@shared/consts/permissions.consts';

@Component({
  selector: 'adms-installation-item',
  templateUrl: './installations-item.component.html',
  styleUrls: ['./installations-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstallationsItemComponent extends CommonListItem {

  @Input() installations: IInstallationsListItem;
  noImage: boolean;
  detailComponent = SubinstallationsListComponent;
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
    this.dialog.open(InstallationsCreateComponent, { disableClose: true, data: { id }, panelClass: 'full-screen'})
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
