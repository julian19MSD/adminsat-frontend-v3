import { AssetDetailsComponent } from '@admin/shared/assets/details/details.component';
import { EcuAlarmDetailsComponent } from '@admin/shared/ecu-alarm/details/details.component';
import { RoadActorDetailsComponent } from '@admin/shared/road-actor/details/details.component';

// import { WorkdayDetailsComponent } from '@admin/shared/workday/details/details.component';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@core/services/notification/notification.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { Store } from '@ngrx/store';
import { CommonListItem } from '@shared/commons/common-list.item';
import { IEcuAlarmListItem } from '@shared/models/ecu-alarm.model';
import { RootAction } from '@store/root.action';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'adms-ecu-alarm-item',
  templateUrl: './ecu-alarm-item.component.html',
  styleUrls: ['./ecu-alarm-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class EcuAlarmItemComponent extends CommonListItem {

  @Input() alarm: IEcuAlarmListItem;

  detailComponent = EcuAlarmDetailsComponent;
  httpAction: any;
  metricsAlias:any;

  constructor(
    public store: Store<RootAction>,
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef
  ) {
    super(permissionsService, dialog, notificationService, cdRef);

    this.store
    .select('theme', 'metrics_alias')
    .pipe(take(1))
    .subscribe((info) =>{ this.metricsAlias = info
    });
  }


  openAssetDetails(id: number): void {
    this.openDetailDialog(id, AssetDetailsComponent)
  }

  // openDetails(id: number): void {
  //   this.openDetailDialog(id, EcuAlarmDetailsComponent)
  // }
  openRoadActorDetails(id: number) {
    this.openDetailDialog(id, RoadActorDetailsComponent)
  }

    /**
   * Abre el dialogo con los detalles del elemento.
   * @param id: El id del elemto
   * @param component: DialogComponent reference
   * @param params: Parametros adicionales
   * @param panelClass: El nombre de la clase que se quiere agragar al dialogo.
   */
     openHistoric(id: number, component: any = null, params: any = null, panelClass = 'full-screen') {
      const dialogComponent = component ? component : this.detailComponent;
  
      this.dialog.open(dialogComponent, {data: {id, params}, panelClass,})
        .afterClosed()
        .pipe(
          take(1),
          filter((e: any) => e?.error)
        )
        .subscribe((err) => this.notificationService.sendErrorNotification({}, err.error));
    }

}
