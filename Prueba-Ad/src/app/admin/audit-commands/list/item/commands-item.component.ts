import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonListItem } from '@shared/commons/common-list.item';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { ICommandsListItem } from '@shared/models/commands.model';
import { CommandsDetailsComponent } from '@admin/shared/commands/details/details.component';
import { AssetDetailsComponent } from '@admin/shared/assets/details/details.component';

@Component({
  selector: 'adms-commands-item',
  templateUrl: './commands-item.component.html',
  styleUrls: ['./commands-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsItemComponent extends CommonListItem {

  @Input() commands: ICommandsListItem;
  noImage: boolean;

 
  constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super(permissionsService, dialog, notificationService,cdRef);
  }

  openAssetDetails(id: number): void {
    this.openDetailDialog(id, AssetDetailsComponent)
  }


  viewTechnicalCommand(item, type){
   
    this.notificationService.sendSuccessNotification({
      title: item.asset_name,
      content: [ type ==='response'? item.technical_response :item.technical_command],
      contentTitle: type ==='response'? "TECHNICAL_RESPONSE":"TECHNICAL_COMMAND"
    })
  }

}
