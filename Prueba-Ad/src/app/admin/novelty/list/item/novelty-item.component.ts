import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonListItem} from '@shared/commons/common-list.item';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {INovletyListItem} from '@shared/models/novlety.models';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '@core/services/notification/notification.service';

@Component({
  selector: 'adms-novelty-item',
  templateUrl: './novelty-item.component.html',
  styleUrls: ['./novelty-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoveltyItemComponent extends CommonListItem {

  @Input() novelty: INovletyListItem;
  @Output() deviceDetailClick: EventEmitter<number> = new EventEmitter();

  constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super(permissionsService, dialog, notificationService,cdRef);
  }

}
