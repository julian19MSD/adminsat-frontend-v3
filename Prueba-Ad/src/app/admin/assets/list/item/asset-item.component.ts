import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, } from '@angular/core';
import { IAssetListItem } from '@shared/models/assets.model';
import { CommonListItem } from '@shared/commons/common-list.item';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { AssetDetailsComponent } from '@admin/shared/assets/details/details.component';
import { DeviceDetailsComponent } from '@admin/shared/devices/details/details.component';
import { AssetHttpService } from '@admin/assets/services/http.service';

@Component({
  selector: 'adms-asset-item',
  templateUrl: './asset-item.component.html',
  styleUrls: ['./asset-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetItemComponent extends CommonListItem {
  @Input() asset: IAssetListItem;
  detailComponent = AssetDetailsComponent;
  noImage: boolean;

  constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef,
    public httpAsset: AssetHttpService
  ) {
    super(permissionsService, dialog, notificationService, cdRef);
  }


  openDeviceDetails(id: number) {
    this.openDetailDialog(id, DeviceDetailsComponent)
  }

  getCertificate(id: number) {
    this.httpAsset.getCertificate(id).subscribe(
      (res)=>{ console.log(res)},
      err => this.notificationService.sendErrorNotification({}, err.error)
    )

  }

}
