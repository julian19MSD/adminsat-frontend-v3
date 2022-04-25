import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {INotificationItem} from '@shared/models/notification.model';


@Component({
  selector: 'adms-notification-dialog',
  templateUrl: './notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationDialogComponent {
  showWeft: boolean;

  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: INotificationItem
  ) {
  }
}
