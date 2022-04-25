import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';
import { take, takeUntil } from 'rxjs/operators';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import * as moment from 'moment';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { IGeneralObject } from '@shared/models/general.model';
import { SharedWorkdayDetailsHttpService } from '../services/http.service';
import { IWorkdayDetails } from '@shared/models/workday.model';
import { WorkdayRecalculateComponent } from '../recalcular-jornada/recalcular-jornada.component';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
  selector: 'adms-workday-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class WorkdayDetailsComponent extends CommonDestroy implements OnInit {
  loading = true;
  instance: IWorkdayDetails = {} as IWorkdayDetails;

  permissions = PERMISSIONS;
  formStatus: IGeneralObject;

  displayedColumns: string[] = ['orden', 'estado', 'conductor1', 'conductor2', 'origen', 'destino', 'via', 'fechaInicio', 'fechaFin'];
  displayedColumnsevents: string[] = ['evento', 'actor', 'hora', 'duracion', 'tiempo_agregado'];

  constructor(public dialogRef: MatDialogRef<WorkdayDetailsComponent>,
    private dialog: MatDialog,
    private workDetailsHttp: SharedWorkdayDetailsHttpService,
    public store: Store<RootAction>,
    public notificationService: NotificationService,
    public permissionsService: PermissionsService,
    public formManageService: FormManageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit() {
    this.getInstance();
  }

  getInstance(recharge: boolean = false): void {
    this.loading = true;
    this.workDetailsHttp.details(this.data.id)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe((res) => {

        res.events.forEach((item) => {

          item.durationParse = item.duration ? this.parseDate(item.duration) : "--";
        });
        this.instance = res;

        this.loading = false;
        if (recharge)
          this.notificationService.sendSuccessNotification({}, null, 'UPDATE_SUCCESSFUL');

      },
        () => {
          this.dialogRef.close();
        });
  }


  parseDate(hora: number = 0) {
    var duration = moment.duration(hora, 'hours');
    var years = duration.years(),
      days = duration.days(),
      hrs = duration.hours(),
      mins = duration.minutes().toString().length === 1 ? ("0" + duration.minutes().toString()) : duration.minutes(),
      secs = duration.seconds().toString().length === 1 ? ("0" + duration.seconds().toString()) : duration.seconds();
    return (days * 24) + hrs + ":" + mins + ":" + secs;

  }



  /**
   * Abre  modal para modificar fecha de jornada
   * @param event id del evento
   * @param date fechaamodificar
   */
  recalculateWorkday(event: number, date: string, nombre: string, panelClass = 'full-screen') {

    this.dialog.open(WorkdayRecalculateComponent, { disableClose: true, data: { event, date, nombre } })
      .afterClosed()
      .pipe(
        take(1)
      )
      .subscribe(result => {
        if (result) {
          this.instance = null;
          this.getInstance(true);
        }
      },
        err => this.notificationService.sendErrorNotification({}, err.error))
  }

}
