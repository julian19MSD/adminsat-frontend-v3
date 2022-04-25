import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

import {formFields} from './login.const';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {AuthService} from '@core/services/auth/auth.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {IUserSession} from '@shared/models/session.model';
import {IGeneralObject} from '@shared/models/general.model';

@Component({
  selector: 'adms-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends CommonDestroy {

  formGroup = new FormGroup(cloneDeep(formFields));
  hidePass = true;
  formStatus: IGeneralObject;

  constructor(
    private formManageService: FormManageService,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    super();
    this.formManageService.getFormStatus(this.formGroup)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(formStatus => {
        this.formStatus = formStatus;
        this.cdRef.detectChanges();
      });
  }

  /**
   * Envia el formulario para iniciar sesion.
   */
  onSubmit(): void {
    this.authService.login(this.formGroup)
      .subscribe(
        (user: IUserSession) => {
          this.router.navigate([user.homepage || '/']).catch(() => {
            this.router.navigate(['/']);
          });
        },
        (err) => this.notificationService.sendErrorNotification({}, err, true)
      );
  }
}
