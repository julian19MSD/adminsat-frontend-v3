import { NewMessageComponent } from '@admin/messaging/message/message.component';
import { AssetDetailsComponent } from '@admin/shared/assets/details/details.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { Store } from '@ngrx/store';
import { CommonListItem } from '@shared/commons/common-list.item';
import { IMessagingListItem } from '@shared/models/messaging.model';
import { RootAction } from '@store/root.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'adms-messaging-item',
  templateUrl: './messaging-item.component.html',
  styleUrls: ['./messaging-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MessagingItemComponent extends CommonListItem {

  @Input() messaging: IMessagingListItem;

  httpAction: any;

  constructor(
    public store: Store<RootAction>,
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super(permissionsService, dialog, notificationService, cdRef);
  }

  
  openAssetDetails(id: number): void {
    this.openDetailDialog(id, AssetDetailsComponent)
  }


  newMessage(activo:number, device:number, cliente: number) {
    this.dialog.open(NewMessageComponent, { disableClose: true, data: { activo, device, cliente} })
      .afterClosed()
      .pipe(
        take(1)
      )
      .subscribe((result) => {
        if (true === result) {
          this.notificationService.sendSuccessNotification({}, null, 'CREATED_SUCCESSFUL');
          this.refrehsList.emit();
        } else if (!!result?.error) {
          this.notificationService.sendErrorNotification({}, result.error);
        }        
      },
      (err) => {
        this.notificationService.sendErrorNotification({}, err)});
  }
}
