import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {NotificationService} from '@core/services/notification/notification.service';
import {formFields} from './change-password.const';
import {IFormHeaderState} from '@shared/models/header.model';
import {API_URL} from '@shared/consts/api.consts';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {CommonForm} from '@shared/commons/form.common';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'adms-change-password',
  templateUrl: './change-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent extends CommonForm implements AfterViewInit {
  formGroup = new FormGroup(cloneDeep(formFields));
  hidePass = true;
  formHeaderData: IFormHeaderState = {
    title: 'CHANGE_PASSWORD'
  };
  httpParams = {
    update: {
      url: API_URL.profile.change_password,
      method: 'patch'
    }
  };
  formFieldErrorsMap = {
    confirm_new_password: {matchOther: 'PASSWORD_MATCH_ERROR'}
  };

  constructor(
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(
      headerMessengerService,
      notificationService,
      translateService, httpClient,
      formManageService,
      cdRef,
      route,
      router
    );
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.formGroup.get('new_password').valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        takeUntil(this.ngDestroyed$))
      .subscribe(() => {
        this.formGroup.get('confirm_new_password').updateValueAndValidity();
        this.cdRef.detectChanges();
      });
  }
}
