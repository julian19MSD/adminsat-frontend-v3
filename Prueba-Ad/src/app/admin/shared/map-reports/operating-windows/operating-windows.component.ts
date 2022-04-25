import { AfterViewInit, ChangeDetectorRef, Component, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { FormFieldsOperatingWindows } from './operating-windows.forms';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import * as cloneDeep from 'lodash/cloneDeep';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter, ErrorStateMatcher } from '@angular/material/core';
import { CommonForm } from '@shared/commons/form.common';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { IHttpParameters } from '@shared/models/form.model';
import { API_URL } from '@shared/consts/api.consts';
import { IName } from '@shared/models/general.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IControlZoneOperatingWindow } from '@shared/models/installations-control.models';
import { endOfToday, startOfToday } from 'date-fns';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { ControlZonesWindowsHttpService } from '../services/http.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'adms-operating-windows-create',
  templateUrl: './operating-windows.component.html',
  styleUrls: ['./operating-windows.component.scss']
})
export class OperatingWindowsCreateComponent extends CommonForm implements AfterViewInit {


  //se agrrregan unas fechas ficticias para usar los inputs datePicker
  startOfToday = startOfToday();
  endOfToday = endOfToday();
  SinSeleccionarDias = false;
  @ViewChildren(MatButtonToggle) query: QueryList<MatButtonToggle>;



  formGroup = new FormGroup(cloneDeep(FormFieldsOperatingWindows));
  successMessages = 'CREATED_SUCCESSFUL';
  title = 'NEW_OPERATING_WINDOW';
  instance: IControlZoneOperatingWindow;
  documentsTypes: IName[] = [];
  actionName = 'create';
  formFieldErrorsMap = {
    matchInclude: 'MAIL_VALIDATION_ERROR'
  }
  updateHeaderData = false;
  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.controlZone.operativeWindow.general,
    },
    update: {
      method: 'patch',
      url: API_URL.controlZone.operativeWindow.instance
    }
  };


  constructor(
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<OperatingWindowsCreateComponent>,
    public adapter: DateAdapter<any>,
    public httpWindows: ControlZonesWindowsHttpService,
    public route: ActivatedRoute,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(
      headerMessengerService,
      notificationService,
      translateService,
      httpClient,
      formManageService,
      cdRef,
      route,
      router
    );
  }



  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    this.formGroup.get('cliente').setValue(this.data.clientId);
    this.formGroup.get('zona_control').setValue(this.data.zoneId);


    if (this.data.windowId) {
      this.instanceId = this.data.windowId;
      this.httpParams.update.params = { idZone: this.data.zoneId, id: this.data.windowId };
      this.successMessages = 'UPDATE_SUCCESSFUL';
      this.title = 'EDIT_OPERATING_WINDOW';
      this.actionName = 'update';

    } else {
      this.httpParams.create.params = { idZone: this.data.zoneId }
    }

    this.cdRef.detectChanges();
    this.getInstance();
  }


  convertTimeUTCTimeZone(time) {

    let hh = time.substring(0, 2);
    let mm = time.substring(3, 5)

    let dateUTC = new Date();
    dateUTC.setUTCHours(hh, mm)
    let date = startOfToday();
    date.setHours(dateUTC.getHours(), dateUTC.getMinutes())
    return date;

  }





  getInstance(): void {
    if (this.instanceId) {
      this.httpWindows.retrieve(this.data.zoneId, this.instanceId)
        .subscribe(
          (instance) => {

            this.formGroup.patchValue(instance);

            let timeStart = this.convertTimeUTCTimeZone(instance.start_time);
            let endStart = this.convertTimeUTCTimeZone(instance.end_time);

            let difDias = timeStart.getDay() - timeStart.getUTCDay();

            this.formGroup.get('start_time_local').setValue(timeStart);
            this.formGroup.get('end_time_local').setValue(endStart);

            this.instance = instance;


            let toggles = this.query.toArray();

            for (var i = 0; i <= 6; i++) {
        
              if (instance['day_' + i]) {
        
                if (i + difDias > 6) {
                  let day = i - difDias - 5;
                  toggles[day].checked = true;
                  this.formGroup.get('day_' + day + '_local').setValue(true)
        
                }
                else if (i + difDias < 0) {
                  let day = 7 + i + difDias;
                  toggles[day].checked = true;
                  this.formGroup.get('day_' + day + '_local').setValue(true)
        
                } else {
                  toggles[i + difDias].checked = true;
                  this.formGroup.get('day_' + (i + difDias) + '_local').setValue(true);
        
                }
              }
        
            }
            this.endLoad();

          },
          () => this.endLoad()
        )
    } else {

      this.endLoad();
      this.cdRef.detectChanges();
    }
  }



  onSuccessSubmit(instance) {
    this.dialogRef.close(true);
    return super.onSuccessSubmit(instance);
  }


  private endLoad() {
    setTimeout(() => {
      this.loader = false
      this.cdRef.detectChanges();
    }, 0)

  }

  checkedItem(e, day) {
    this.formGroup.get(day).setValue(e.source.checked);
    this.cdRef.detectChanges();

  }

  getTimeUTC(time: Date) {

    let hh = time.getUTCHours() < 10 ? '0' + time.getUTCHours() : time.getUTCHours();
    let mm = time.getUTCMinutes() < 10 ? '0' + time.getUTCMinutes() : time.getUTCMinutes();
    return hh + ':' + mm;
  }


  onSubmit(event) {
    event.preventDefault();
    this.formGroup.markAllAsTouched();
    let difDias
    let parseStartTime
    let parseEndTime
    if (this.formGroup.get('start_time_local').value) {
      difDias = this.formGroup.get('start_time_local').value.getUTCDay() - this.formGroup.get('start_time_local').value.getDay();

      parseStartTime = this.getTimeUTC((this.formGroup.get('start_time_local').value));
      this.formGroup.get('start_time').setValue(parseStartTime);

    }

    if (this.formGroup.get('end_time_local').value) {
      parseEndTime = this.getTimeUTC((this.formGroup.get('end_time_local').value));
      this.formGroup.get('end_time').setValue(parseEndTime);
    }



    if (!this.formGroup.get('day_0_local').value && !this.formGroup.get('day_1_local').value && !this.formGroup.get('day_2_local').value && !this.formGroup.get('day_3_local').value && !this.formGroup.get('day_4_local').value && !this.formGroup.get('day_5_local').value && !this.formGroup.get('day_6_local').value) {
      this.SinSeleccionarDias = true;
      this.cdRef.detectChanges();

    } else {


      for (var i = 0; i <= 6; i++) {

        if (this.formGroup.get('day_' + [i] + "_local").value) {

          if (i + difDias > 6) {
            let day = i - difDias - 5;
            this.formGroup.get('day_' + day).setValue(true);

          }
          else if (i + difDias < 0) {
            let day = 7 + i + difDias;
            this.formGroup.get('day_' + day).setValue(true);

          } else {
            this.formGroup.get('day_' + [i + difDias]).setValue(true);
          }
        }

      }


      this.SinSeleccionarDias = false;
      this.cdRef.detectChanges();
      super.onSubmit(event);
    }
  }

}


