import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import * as cloneDeep from 'lodash/cloneDeep';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Store} from '@ngrx/store';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';

import {RootAction} from '@store/root.action';
import {NotificationService} from '@core/services/notification/notification.service';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {formFields} from './reset-password.const';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {IHttpParameters} from '@shared/models/form.model';
import {IGeneralObject} from '@shared/models/general.model';
import {API_URL} from '@shared/consts/api.consts';
import {hideLoader} from '@shared/utils/general.utils';
import {ResetPasswordHttpService} from '@public/reset-password/shared/http.service';

@Component({
  selector: 'adms-reset-password',
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent extends CommonDestroy implements AfterViewInit {

  formGroup = new FormGroup(cloneDeep(formFields));
  hidePass = true;
  validLink = true;
  detail: string;
  formStatus: IGeneralObject;
  private httpParams: IHttpParameters = {
    url: API_URL.password.change,
    method: 'post'
  };
  private formFieldErrorsMap = {
    confirm_new_password: {
      matchOther: 'PASSWORD_MATCH_ERROR'
    }
  };

  constructor(public store: Store<RootAction>,
              public translateService: TranslateService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private notificationService: NotificationService,
              private formManageService: FormManageService,
              private cdRef: ChangeDetectorRef,
              private httpClient: ResetPasswordHttpService) {
    super();
    hideLoader(false);
    this.formManageService.getFormStatus(this.formGroup, this.formFieldErrorsMap)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(formStatus => {
          this.formStatus = formStatus;
          this.cdRef.detectChanges();
        }
      );

    this.formGroup.get('new_password').valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        takeUntil(this.ngDestroyed$)
      ).subscribe(() => {
      this.formGroup.get('confirm_new_password').updateValueAndValidity();
    });
  }

  ngAfterViewInit(): void {
    const uuid = this.route.snapshot.queryParams.uidb64;
    const token = this.route.snapshot.queryParams.token;
    this.location.replaceState(this.location.path().split('?')[0], '');
    if (!token || !uuid) {
      this.router.navigate(['/public/login']);
    } else {
      this.httpClient.validate(uuid, token, this.translateService.currentLang)
        .subscribe(
          () => {
            this.httpParams.params = {uuid, token};
            hideLoader(true);
            this.cdRef.detectChanges();
          },
          (err) => {
            this.detail = err.error.detail;
            this.validLink = false;
            hideLoader(true);
            this.cdRef.detectChanges();
          });
    }
  }

  /**
   * Envia el formulario para recuperar contraseña.
   */
  onSubmit(): void {
    this.formManageService.submitForm(this.formGroup, this.httpParams)
      .subscribe(
        (res: { detail: string }) => {
          this.notificationService.sendSuccessNotification({}, res.detail)
            .subscribe(() => {
              this.router.navigate(['/public/login'])
            });
        },
        (err) => {
          if (404 === err.status) {
            this.validLink = false;
            this.cdRef.detectChanges();
          } else {
            this.notificationService.sendErrorNotification({}, err);
          }
        }
      );
  }
}
