import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification/notification.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { Store } from '@ngrx/store';
import { CommonListItem } from '@shared/commons/common-list.item';
import { IWorkdayConfigListItem } from '@shared/models/workday-config.model';
import { RootAction } from '@store/root.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'adms-workday-config-item',
  templateUrl: './workday-config-item.component.html',
  styleUrls: ['./workday-config-item.component.scss']
})
export class WorkdayConfigItemComponent  extends CommonListItem{


  @Input() work: IWorkdayConfigListItem;
  // detailComponent = AssetDetailsComponent;
  noImage: boolean;
  metricsAlias: any;

  constructor(
    public store: Store<RootAction>,
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef,
    public router: Router
  ) {
    super(permissionsService, dialog, notificationService,cdRef);

    this.store
    .select('theme', 'metrics_alias')
    .pipe(take(1))
    .subscribe((info) =>{ this.metricsAlias = info
    });
  }



}
