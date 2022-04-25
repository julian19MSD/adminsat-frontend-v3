import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {CommonListItem} from '@shared/commons/common-list.item';
import {IHistoricalShiftAsingmentListItem} from '@shared/models/shift-assignment';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '@core/services/notification/notification.service';
import {AssetDetailsComponent} from '@admin/shared/assets/details/details.component';
import {RouteDetailsComponent} from '@admin/shared/routes/details/details.component';
import {ShiftAssignmentDetailsComponent} from '@admin/shared/shift-assignment/details/details.component';

@Component({
  selector: 'adms-historical-shift-assignment-item',
  templateUrl: './historical-shift-assignment-item.component.html',
  styleUrls: ['./historical-shift-assignment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoricalShiftAssignmentItemComponent extends CommonListItem {
  @Input() shift: IHistoricalShiftAsingmentListItem;

  detailComponent = ShiftAssignmentDetailsComponent;

  constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super(permissionsService, dialog, notificationService,cdRef);
  }

  openAssetDetails(id: number) {
    this.openDetailDialog(id, AssetDetailsComponent);
  }

  openRouteDetails(id: number) {
    this.openDetailDialog(id, RouteDetailsComponent);
  }
}
