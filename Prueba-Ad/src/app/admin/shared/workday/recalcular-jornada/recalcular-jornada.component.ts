import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import {distinctUntilChanged, filter, take, takeUntil} from 'rxjs/operators';
import {IGeneralObject, IName} from '@shared/models/general.model';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {IHttpParameters} from '@shared/models/form.model';
import {API_URL} from '@shared/consts/api.consts';
import { SharedWorkdayDetailsHttpService } from '../services/http.service';
import { FormFieldsWorkdayRecalculate } from './recalcular-jornada.forms';
import { endOfToday } from 'date-fns';

@Component({
  selector: 'adms-workday-recalculate',
  templateUrl: './recalcular-jornada.component.html',
  styleUrls: ['./recalcular-jornada.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkdayRecalculateComponent extends CommonDestroy implements OnInit, AfterViewInit {

  formGroup = new FormGroup(cloneDeep(FormFieldsWorkdayRecalculate));
  today = endOfToday();

  formStatus: IGeneralObject;
  tipoOptions: IName[] = [];
  subTipoOptions: IName[] = [];
  zonasControlOptions = [];

  loading = true;

  httpParams: IHttpParameters = {
    method: 'post',
    url: API_URL.routes.workday.recalculate
  };

  constructor(
    public dialog: MatDialog,
    private formManageService: FormManageService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    private workRecalculateHttp: SharedWorkdayDetailsHttpService,
    public dialogRef: MatDialogRef<WorkdayRecalculateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }
  ngOnInit(){
    this.formGroup.get('event').setValue(this.data.event);
    this.formGroup.get('new_date').setValue(this.data.date);

  }


  ngAfterViewInit() {
    this.formManageService.getFormStatus(this.formGroup)
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe((errors) => {
      this.formStatus = errors;
      this.cdRef.detectChanges();
    });

    this.loading = false;
    this.cdRef.detectChanges();

  }



  onSubmit($event: any) {
    $event.preventDefault();

    this.formManageService
      .submitForm(this.formGroup, this.httpParams)
      .subscribe((r) => {
        this.dialogRef.close(r)},
        (err) => {
          this.notificationService.sendErrorNotification({}, err)
        }
      )
  }
}


