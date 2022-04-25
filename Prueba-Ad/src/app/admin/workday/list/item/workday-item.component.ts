import { AssetDetailsComponent } from '@admin/shared/assets/details/details.component';
import { RoadActorDetailsComponent } from '@admin/shared/road-actor/details/details.component';
import { RouteDetailsComponent } from '@admin/shared/routes/details/details.component';
import { WorkdayDetailsComponent } from '@admin/shared/workday/details/details.component';
import { WorkdayNoveltyComponent } from '@admin/workday/novelty/novelty.component';
import { WorkdayObservationsComponent } from '@admin/workday/observations/observations.component';
import { WorkdayHttpService } from '@admin/workday/services/http.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { CommonListItem } from '@shared/commons/common-list.item';
import { IWorkdayListItem } from '@shared/models/workday.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'adms-workday-item',
  templateUrl: './workday-item.component.html',
  styleUrls: ['./workday-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class WorkdayItemComponent extends CommonListItem {

  @Input() work: IWorkdayListItem;

  detailComponent = WorkdayDetailsComponent;
  httpAction: any;


  constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef,
    public httpClient: HttpClient,
    public workHttp: WorkdayHttpService,
  ) {
    super(permissionsService, dialog, notificationService, cdRef);
  }




  openAssetDetails(id: number): void {
    this.openDetailDialog(id, AssetDetailsComponent)
  }

  openRouteDetails(id: number) {
    this.openDetailDialog(id, RouteDetailsComponent)
  }

  openRoadActorDetails(id: number) {
    this.openDetailDialog(id, RoadActorDetailsComponent)
  }

  addObservation(id: number, cliente: number) {
    this.dialog.open(WorkdayObservationsComponent, { disableClose: true, data: { id, cliente: cliente },  })
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
      (err) =>{ 
        this.notificationService.sendErrorNotification({}, err);}
    });
  }


  addNovelty(id: number, cliente: number, enturnamiento: number) {
    this.dialog.open(WorkdayNoveltyComponent, { disableClose: true, data: { id, cliente, enturnamiento } })
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
      });

  }


}
