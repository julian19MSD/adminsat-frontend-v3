import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {FormGroup} from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {formFields} from './change.const';
import {RootAction} from '@store/root.action';
import {AlarmsHttpService} from '@admin/alarms/services/http.service';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {IAlarmItem} from '@shared/models/alarm.model';
import {IGeneralObject} from '@shared/models/general.model';
import {hideLoader, strFormat} from '@shared/utils/general.utils';
import {NotificationService} from '@core/services/notification/notification.service';
import {API_URL} from '@shared/consts/api.consts';
import {IHttpParameters} from '@shared/models/form.model';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'adms-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
})
export class ChangeAlarmsComponent extends CommonDestroy implements OnInit {

  instance: IAlarmItem;
  loading: boolean;
  loadMap: boolean;
  form: FormGroup = new FormGroup(cloneDeep(formFields));
  formStatus$: Observable<IGeneralObject>;
  currentTab: number;
  private httpParams: { attend: IHttpParameters, update: IHttpParameters } = {
    attend: {
      url: API_URL.alarm.attend,
      method: 'post'
    },
    update: {
      url: API_URL.alarm.instance,
      method: 'put'
    }
  };


  constructor(
    public store: Store<RootAction>,
    public translate: TranslateService,
    private dialogRef: MatDialogRef<ChangeAlarmsComponent>,
    private alarmsHttp: AlarmsHttpService,
    private formManageService: FormManageService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { tab: number; ids: number[]; canAttend: boolean; }
  ) {
    super();
    this.formStatus$ = this.formManageService.getFormStatus(this.form);
  }

  ngOnInit() {

    this.form.get('alarmas').patchValue(this.data.ids);

    this.onTabChange(this.data.tab);

    if (this.data.ids.length === 1) {
      this.loading = true;
      this.alarmsHttp.retrieve(this.data.ids[0])
        .pipe(
          takeUntil(this.ngDestroyed$)
        )
        .subscribe(
          res => {
            this.instance = res;
            this.loading = false;
          },
          () => {
            this.loading = false;
            this.cdRef.detectChanges();
          },
          () => this.cdRef.detectChanges());
    }
  }

  onSubmit(type: string): void {
    hideLoader(false);
    const httpParams = cloneDeep(this.httpParams[type]);
    if (type === 'update') {
      httpParams.url = strFormat(httpParams.url, {id: this.instance.id});
    }
    this.formManageService.submitForm(this.form, httpParams)
      .subscribe(() => {
          this.notificationService.sendSuccessNotification({})
          this.dialogRef.close(true)
        },
        (err) => this.notificationService.sendErrorNotification({}, err)
      );
  }

  onTabChange(event: number): void {
    this.currentTab = event;
    if (!this.loadMap && event === 1) {
      this.loadMap = true;
    }
  }
}
