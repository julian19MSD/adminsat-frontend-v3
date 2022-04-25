import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {CommonListItem} from '@shared/commons/common-list.item';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {IShiftAsingmentListItem} from '@shared/models/shift-assignment';
import {AssetDetailsComponent} from '@admin/shared/assets/details/details.component';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '@core/services/notification/notification.service';
import {RoadActorDetailsComponent} from '@admin/shared/road-actor/details/details.component';
import {RouteDetailsComponent} from '@admin/shared/routes/details/details.component';
import {ControlZoneDetailComponent} from '@admin/shared/control-zones/details/details.component';
import {ShiftAssignmentDetailsComponent} from '@admin/shared/shift-assignment/details/details.component';
import {ShiftAssignmentAlarmsDetailsComponent} from '@admin/shift-assignment/list/alarms-details/shift-assignment-alarms-details.component';
import {hideLoader} from '@shared/utils/general.utils';
import {ShiftAssignmentHttpService} from '@admin/shift-assignment/services/http.service';
import {ActionConfirmComponent} from '@shared/components/action-confirm/action-confirm.component';
import {filter, switchMap, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ShiftAssignmentObservationsComponent} from '@admin/shift-assignment/list/observations/observations.component';
import { ShiftAssignmentDeparturesComponent } from '@admin/shared/shift-assignment/departures/departures.component';

@Component({
  selector: 'adms-shift-assignment-item',
  templateUrl: './shift-assignment-item.component.html',
  styleUrls: ['./shift-assignment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftAssignmentItemComponent extends CommonListItem {

  @Input() shift: IShiftAsingmentListItem;


  detailComponent = ShiftAssignmentDetailsComponent;
  httpAction: any;

  constructor(
    public permissionsService: PermissionsService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public cdRef: ChangeDetectorRef,
    public httpClient: HttpClient,
    public shiftAssignmentHttp: ShiftAssignmentHttpService,
  ) {
    super(permissionsService, dialog, notificationService, cdRef);
  }

  openRouteDetails(id: number) {
    this.openDetailDialog(id, RouteDetailsComponent)
  }

  openAssetDetails(id: number): void {
    this.openDetailDialog(id, AssetDetailsComponent)
  }

  openApertures(id: number): void {
    this.openDetailDialog(id, ShiftAssignmentDeparturesComponent, this.shift.orden_cargue)
  }


  openRoadActorDetails(id: number) {
    this.openDetailDialog(id, RoadActorDetailsComponent)
  }

  openControlZoneDetails(id: number) {
    this.openDetailDialog(id, ControlZoneDetailComponent)
  }

  openAlarmDetails(id: number) {
    this.openDetailDialog(id, ShiftAssignmentAlarmsDetailsComponent)
  }

  addObservation({id, cliente}) {
    this.dialog.open(ShiftAssignmentObservationsComponent, {disableClose: true, data: {id, cliente: cliente?.id}})
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

  pauseShiftAssignment(id: number) {
    this.httpAction = this.shiftAssignmentHttp.pause;
    this.confirmAction(id, 'PAUSE_SHIFT_ASSIGNMENT_CONFIRM', 'PAUSE');
  }

  startShiftAssignment(id: number) {
    this.httpAction = this.shiftAssignmentHttp.start;
    this.confirmAction(id, 'START_SHIFT_ASSIGNMENT_CONFIRM', 'START');
  }

  resetShiftAssignment(id: number) {
    this.httpAction = this.shiftAssignmentHttp.reset;
    this.confirmAction(id, 'RESET_SHIFT_ASSIGNMENT_CONFIRM', 'RESET');
  }

  unPauseShiftAssignment(id: number) {
    this.httpAction = this.shiftAssignmentHttp.pause;
    this.confirmAction(id, 'START_SHIFT_ASSIGNMENT_CONFIRM', 'START');
  }

  private confirmAction(id: number, message: string, button: string) {
    this.dialog.open(ActionConfirmComponent, {
      data: {actionMessage: message, mainButtonMessage: button},
      panelClass: 'notification'
    })
      .afterClosed()
      .pipe(
        take(1),
        filter((e: any) => true === e),
        switchMap(() => {
          hideLoader(false);
          return this.httpAction(id);
        })
      )
      .subscribe(() => {
        this.notificationService.sendSuccessNotification();
        this.refrehsList.emit();
      }, (err) => {
        this.notificationService.sendErrorNotification({}, err);
      });
  }
}
